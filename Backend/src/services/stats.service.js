const activityRepository = require('../repositories/activity.repository');
const dailyStatRepository = require('../repositories/dailyStat.repository');
const userRepository = require('../repositories/user.repository');

const statsService = {
  /**
   * Get comprehensive activity statistics
   */
  getActivityStats: async (userId, days = 30) => {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Get daily stats for period
    const dailyStats = await dailyStatRepository.getRecentStats(userId, days);

    // Get total stats
    const totalStats = await activityRepository.getTotalStats(userId);

    // Calculate period stats
    const periodStats = dailyStats.reduce(
      (acc, stat) => ({
        commits: acc.commits + stat.totalCommits,
        additions: acc.additions + stat.totalAdditions,
        deletions: acc.deletions + stat.totalDeletions,
      }),
      { commits: 0, additions: 0, deletions: 0 }
    );

    // Calculate active days
    const activeDays = dailyStats.filter(stat => stat.totalCommits > 0).length;

    // Calculate averages
    const avgCommitsPerDay = activeDays > 0 
      ? Math.round(periodStats.commits / activeDays) 
      : 0;
    const avgAdditionsPerDay = activeDays > 0 
      ? Math.round(periodStats.additions / activeDays) 
      : 0;
    const avgDeletionsPerDay = activeDays > 0 
      ? Math.round(periodStats.deletions / activeDays) 
      : 0;

    return {
      period: {
        days,
        activeDays,
        inactiveDays: days - activeDays,
      },
      periodStats,
      totalStats,
      averages: {
        commitsPerDay: avgCommitsPerDay,
        additionsPerDay: avgAdditionsPerDay,
        deletionsPerDay: avgDeletionsPerDay,
      },
      streak: {
        current: user.currentStreak,
        longest: user.longestStreak,
      },
    };
  },

  /**
   * Get repository-wise statistics
   */
  getRepositoryStats: async (userId, days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activities = await activityRepository.findByUserAndDateRange(
      userId,
      startDate,
      new Date()
    );

    // Group by repository
    const repoStats = {};

    for (const activity of activities) {
      if (!repoStats[activity.repoName]) {
        repoStats[activity.repoName] = {
          repoName: activity.repoName,
          commits: 0,
          additions: 0,
          deletions: 0,
          lastActivity: activity.activityDate,
        };
      }

      repoStats[activity.repoName].commits += activity.commitCount;
      repoStats[activity.repoName].additions += activity.additions;
      repoStats[activity.repoName].deletions += activity.deletions;

      // Update last activity if more recent
      if (activity.activityDate > repoStats[activity.repoName].lastActivity) {
        repoStats[activity.repoName].lastActivity = activity.activityDate;
      }
    }

    // Convert to array and sort by commits
    const repositories = Object.values(repoStats).sort(
      (a, b) => b.commits - a.commits
    );

    return {
      totalRepositories: repositories.length,
      repositories,
    };
  },

  /**
   * Get activity heatmap data
   */
  getActivityHeatmap: async (userId, days = 365) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dailyStats = await dailyStatRepository.findByUserAndDateRange(
      userId,
      startDate,
      new Date()
    );

    // Create heatmap data
    const heatmap = dailyStats.map(stat => ({
      date: stat.statDate.toISOString().split('T')[0],
      count: stat.totalCommits,
      level: statsService.getActivityLevel(stat.totalCommits),
    }));

    return {
      days,
      data: heatmap,
    };
  },

  /**
   * Get activity level for heatmap (0-4)
   */
  getActivityLevel: (commits) => {
    if (commits === 0) return 0;
    if (commits <= 3) return 1;
    if (commits <= 6) return 2;
    if (commits <= 10) return 3;
    return 4;
  },

  /**
   * Get weekly summary
   */
  getWeeklySummary: async (userId) => {
    const weeks = 4;
    const summaries = [];

    for (let i = 0; i < weeks; i++) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - (i * 7));
      
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);

      const dailyStats = await dailyStatRepository.findByUserAndDateRange(
        userId,
        startDate,
        endDate
      );

      const weekStats = dailyStats.reduce(
        (acc, stat) => ({
          commits: acc.commits + stat.totalCommits,
          additions: acc.additions + stat.totalAdditions,
          deletions: acc.deletions + stat.totalDeletions,
        }),
        { commits: 0, additions: 0, deletions: 0 }
      );

      const activeDays = dailyStats.filter(stat => stat.totalCommits > 0).length;

      summaries.push({
        weekNumber: i + 1,
        startDate,
        endDate,
        activeDays,
        ...weekStats,
      });
    }

    return summaries;
  },
};

module.exports = statsService;
