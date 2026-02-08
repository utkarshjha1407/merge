const followRepository = require('../repositories/follow.repository');
const activityRepository = require('../repositories/activity.repository');
const dailyStatRepository = require('../repositories/dailyStat.repository');

const feedService = {
  /**
   * Get social feed - activities from users you follow
   */
  getSocialFeed: async (userId, limit = 50) => {
    // Get users that the current user follows
    const following = await followRepository.getFollowing(userId, 1000);
    const followingIds = following.map(f => f.following.id);

    if (followingIds.length === 0) {
      return {
        activities: [],
        message: 'Follow users to see their activity in your feed',
      };
    }

    // Get recent activities from followed users
    const activities = await activityRepository.findByUserIds(
      followingIds,
      limit
    );

    return {
      activities: activities.map(activity => ({
        id: activity.id,
        user: {
          id: activity.user.id,
          username: activity.user.username,
          avatarUrl: activity.user.avatarUrl,
        },
        repoName: activity.repoName,
        date: activity.activityDate,
        commits: activity.commitCount,
        additions: activity.additions,
        deletions: activity.deletions,
      })),
    };
  },

  /**
   * Get daily summary feed - daily stats from followed users
   */
  getDailySummaryFeed: async (userId, days = 7) => {
    // Get users that the current user follows
    const following = await followRepository.getFollowing(userId, 1000);
    const followingIds = following.map(f => f.following.id);

    if (followingIds.length === 0) {
      return {
        summaries: [],
        message: 'Follow users to see their daily summaries',
      };
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily stats for followed users
    const dailyStats = await dailyStatRepository.findByUserIds(
      followingIds,
      startDate,
      new Date()
    );

    // Group by user and date
    const summaries = dailyStats.map(stat => ({
      user: {
        id: stat.user.id,
        username: stat.user.username,
        avatarUrl: stat.user.avatarUrl,
        currentStreak: stat.user.currentStreak,
      },
      date: stat.statDate,
      commits: stat.totalCommits,
      additions: stat.totalAdditions,
      deletions: stat.totalDeletions,
    }));

    // Sort by date descending
    summaries.sort((a, b) => b.date - a.date);

    return { summaries };
  },

  /**
   * Get trending users - most active in last 7 days
   */
  getTrendingUsers: async (limit = 20) => {
    const users = await dailyStatRepository.getTrendingUsers(7, limit);

    return users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
      recentCommits: user.recentCommits || 0,
    }));
  },
};

module.exports = feedService;
