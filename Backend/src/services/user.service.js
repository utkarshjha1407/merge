const userRepository = require('../repositories/user.repository');
const activityRepository = require('../repositories/activity.repository');
const dailyStatRepository = require('../repositories/dailyStat.repository');

const userService = {
  getUserProfile: async (userId) => {
    const user = await userRepository.findByIdWithStats(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Get total activity stats
    const totalStats = await activityRepository.getTotalStats(userId);

    return {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      followersCount: user._count.followers,
      followingCount: user._count.following,
      totalActivities: user._count.activities,
      ...totalStats,
      createdAt: user.createdAt,
    };
  },

  getDashboardStats: async (userId, days = 30) => {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Get daily stats for the specified period
    const dailyStats = await dailyStatRepository.getRecentStats(userId, days);

    // Calculate totals
    const totals = dailyStats.reduce(
      (acc, stat) => ({
        totalCommits: acc.totalCommits + stat.totalCommits,
        totalAdditions: acc.totalAdditions + stat.totalAdditions,
        totalDeletions: acc.totalDeletions + stat.totalDeletions,
      }),
      { totalCommits: 0, totalAdditions: 0, totalDeletions: 0 }
    );

    // Calculate average per day
    const activeDays = dailyStats.filter(stat => stat.totalCommits > 0).length;
    const avgCommitsPerDay = activeDays > 0 ? Math.round(totals.totalCommits / activeDays) : 0;

    return {
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
      },
      period: {
        days,
        activeDays,
      },
      totals,
      averages: {
        commitsPerDay: avgCommitsPerDay,
      },
      dailyStats: dailyStats.map(stat => ({
        date: stat.statDate,
        commits: stat.totalCommits,
        additions: stat.totalAdditions,
        deletions: stat.totalDeletions,
      })),
    };
  },

  getRecentActivities: async (userId, limit = 20) => {
    const activities = await activityRepository.findByUser(userId, limit);
    
    return activities.map(activity => ({
      id: activity.id,
      repoName: activity.repoName,
      date: activity.activityDate,
      commits: activity.commitCount,
      additions: activity.additions,
      deletions: activity.deletions,
    }));
  },
};

module.exports = userService;
