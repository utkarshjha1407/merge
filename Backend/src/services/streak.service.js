const dailyStatRepository = require('../repositories/dailyStat.repository');
const userRepository = require('../repositories/user.repository');

const streakService = {
  /**
   * Calculate user's current and longest streak
   */
  calculateStreak: async (userId) => {
    // Get all daily stats ordered by date descending
    const allStats = await dailyStatRepository.findByUserAndDateRange(
      userId,
      new Date('2020-01-01'), // Far past date to get all stats
      new Date()
    );

    if (allStats.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
      };
    }

    // Sort by date ascending for streak calculation
    const stats = allStats
      .sort((a, b) => a.statDate - b.statDate)
      .filter((stat) => stat.totalCommits > 0); // Only count days with commits

    if (stats.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
      };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user has activity today or yesterday (current streak is active)
    const lastActivityDate = new Date(stats[stats.length - 1].statDate);
    lastActivityDate.setHours(0, 0, 0, 0);

    const isStreakActive =
      lastActivityDate.getTime() === today.getTime() ||
      lastActivityDate.getTime() === yesterday.getTime();

    // Calculate streaks
    for (let i = 1; i < stats.length; i++) {
      const prevDate = new Date(stats[i - 1].statDate);
      const currDate = new Date(stats[i].statDate);

      prevDate.setHours(0, 0, 0, 0);
      currDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currDate - prevDate) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        // Consecutive day
        tempStreak++;
      } else {
        // Streak broken
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    // Check final streak
    longestStreak = Math.max(longestStreak, tempStreak);

    // Current streak is the last consecutive streak if still active
    if (isStreakActive) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }

    return {
      currentStreak,
      longestStreak,
      lastActivityDate: stats[stats.length - 1].statDate,
      isStreakActive,
    };
  },

  /**
   * Update user's streak in database
   */
  updateUserStreak: async (userId) => {
    const streakData = await streakService.calculateStreak(userId);

    await userRepository.updateStreak(
      userId,
      streakData.currentStreak,
      streakData.longestStreak
    );

    return streakData;
  },

  /**
   * Get streak details with breakdown
   */
  getStreakDetails: async (userId) => {
    const user = await userRepository.findById(userId);
    const streakData = await streakService.calculateStreak(userId);

    // Get recent activity for streak visualization
    const recentStats = await dailyStatRepository.getRecentStats(userId, 30);
    
    const activityMap = recentStats
      .filter((stat) => stat.totalCommits > 0)
      .map((stat) => ({
        date: stat.statDate,
        commits: stat.totalCommits,
        hasActivity: true,
      }));

    return {
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      streak: {
        current: streakData.currentStreak,
        longest: streakData.longestStreak,
        isActive: streakData.isStreakActive,
        lastActivityDate: streakData.lastActivityDate,
      },
      recentActivity: activityMap,
    };
  },
};

module.exports = streakService;
