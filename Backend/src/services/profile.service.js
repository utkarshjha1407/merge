const userRepository = require('../repositories/user.repository');
const activityRepository = require('../repositories/activity.repository');
const followRepository = require('../repositories/follow.repository');

const profileService = {
  /**
   * Get public profile by user ID
   */
  getPublicProfile: async (userId, viewerId = null) => {
    const user = await userRepository.findByIdWithStats(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Get total stats
    const totalStats = await activityRepository.getTotalStats(userId);

    // Check if viewer is following this user
    let isFollowing = false;
    if (viewerId && viewerId !== userId) {
      isFollowing = await followRepository.isFollowing(viewerId, userId);
    }

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
      isFollowing, // Whether the viewer follows this user
    };
  },

  /**
   * Get public profile by username
   */
  getPublicProfileByUsername: async (username, viewerId = null) => {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    return await profileService.getPublicProfile(user.id, viewerId);
  },

  /**
   * Search users by username
   */
  searchUsers: async (query, limit = 20) => {
    const users = await userRepository.searchByUsername(query, limit);

    return users.map(user => ({
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    }));
  },

  /**
   * Get leaderboard
   */
  getLeaderboard: async (type = 'streak', limit = 50) => {
    let users;

    if (type === 'streak') {
      users = await userRepository.getTopByStreak(limit);
    } else if (type === 'commits') {
      users = await userRepository.getTopByCommits(limit);
    } else {
      throw new Error('Invalid leaderboard type. Use "streak" or "commits"');
    }

    return users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCommits: user.totalCommits || 0,
    }));
  },
};

module.exports = profileService;
