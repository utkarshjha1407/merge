const { Octokit } = require('@octokit/rest');
const activityRepository = require('../repositories/activity.repository');
const dailyStatRepository = require('../repositories/dailyStat.repository');
const userRepository = require('../repositories/user.repository');

const githubService = {
  /**
   * Fetch user's recent commits from GitHub
   */
  fetchUserActivity: async (userId, accessToken, days = 7) => {
    const octokit = new Octokit({ auth: accessToken });

    try {
      // Get authenticated user info
      const { data: githubUser } = await octokit.users.getAuthenticated();

      // Calculate date range
      const since = new Date();
      since.setDate(since.getDate() - days);

      // Fetch user's events (commits, pushes, etc.)
      const { data: events } = await octokit.activity.listEventsForAuthenticatedUser({
        username: githubUser.login,
        per_page: 100,
      });

      // Filter push events within date range
      const pushEvents = events.filter(
        (event) =>
          event.type === 'PushEvent' &&
          new Date(event.created_at) >= since
      );

      const activities = [];

      // Process each push event
      for (const event of pushEvents) {
        const repoName = event.repo.name;
        const activityDate = new Date(event.created_at);
        activityDate.setHours(0, 0, 0, 0); // Normalize to start of day

        const commits = event.payload.commits || [];
        
        // Fetch detailed commit info to get additions/deletions
        let additions = 0;
        let deletions = 0;

        for (const commit of commits.slice(0, 5)) { // Limit to 5 commits per push to avoid rate limits
          try {
            const [owner, repo] = repoName.split('/');
            const { data: commitData } = await octokit.repos.getCommit({
              owner,
              repo,
              ref: commit.sha,
            });

            additions += commitData.stats?.additions || 0;
            deletions += commitData.stats?.deletions || 0;
          } catch (error) {
            console.error(`Error fetching commit ${commit.sha}:`, error.message);
          }
        }

        activities.push({
          userId,
          repoName,
          activityDate,
          commitCount: commits.length,
          additions,
          deletions,
        });
      }

      // Store activities in database
      const savedActivities = [];
      for (const activity of activities) {
        try {
          // Check if activity already exists
          const existing = await activityRepository.findByUserRepoAndDate(
            activity.userId,
            activity.repoName,
            activity.activityDate
          );

          if (existing) {
            // Update existing activity
            const updated = await activityRepository.updateActivity(existing.id, {
              commitCount: existing.commitCount + activity.commitCount,
              additions: existing.additions + activity.additions,
              deletions: existing.deletions + activity.deletions,
            });
            savedActivities.push(updated);
          } else {
            // Create new activity
            const created = await activityRepository.createActivity(activity);
            savedActivities.push(created);
          }
        } catch (error) {
          console.error('Error saving activity:', error.message);
        }
      }

      // Update daily stats
      await githubService.updateDailyStats(userId, savedActivities);

      return {
        fetched: activities.length,
        saved: savedActivities.length,
        activities: savedActivities,
      };
    } catch (error) {
      console.error('GitHub API Error:', error.message);
      throw new Error(`Failed to fetch GitHub activity: ${error.message}`);
    }
  },

  /**
   * Update daily stats based on activities
   */
  updateDailyStats: async (userId, activities) => {
    // Group activities by date
    const statsByDate = {};

    for (const activity of activities) {
      const dateKey = activity.activityDate.toISOString().split('T')[0];
      
      if (!statsByDate[dateKey]) {
        statsByDate[dateKey] = {
          totalCommits: 0,
          totalAdditions: 0,
          totalDeletions: 0,
        };
      }

      statsByDate[dateKey].totalCommits += activity.commitCount;
      statsByDate[dateKey].totalAdditions += activity.additions;
      statsByDate[dateKey].totalDeletions += activity.deletions;
    }

    // Upsert daily stats
    for (const [dateKey, stats] of Object.entries(statsByDate)) {
      const statDate = new Date(dateKey);
      await dailyStatRepository.upsertDailyStat(userId, statDate, stats);
    }
  },

  /**
   * Sync user's GitHub activity (manual trigger)
   */
  syncActivity: async (userId) => {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.accessToken) {
      throw new Error('GitHub access token not found');
    }

    // Fetch last 30 days of activity
    const result = await githubService.fetchUserActivity(
      userId,
      user.accessToken,
      30
    );

    return result;
  },
};

module.exports = githubService;
