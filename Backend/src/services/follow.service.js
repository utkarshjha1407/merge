const followRepository = require('../repositories/follow.repository');
const userRepository = require('../repositories/user.repository');

const followService = {
  /**
   * Follow a user
   */
  followUser: async (followerId, followingId) => {
    // Validate users exist
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const follower = await userRepository.findById(followerId);
    const following = await userRepository.findById(followingId);

    if (!follower || !following) {
      throw new Error('User not found');
    }

    // Check if already following
    const isAlreadyFollowing = await followRepository.isFollowing(
      followerId,
      followingId
    );

    if (isAlreadyFollowing) {
      throw new Error('Already following this user');
    }

    // Create follow relationship
    await followRepository.createFollow(followerId, followingId);

    return {
      message: `Now following ${following.username}`,
      following: {
        id: following.id,
        username: following.username,
        avatarUrl: following.avatarUrl,
      },
    };
  },

  /**
   * Unfollow a user
   */
  unfollowUser: async (followerId, followingId) => {
    // Check if following
    const isFollowing = await followRepository.isFollowing(
      followerId,
      followingId
    );

    if (!isFollowing) {
      throw new Error('Not following this user');
    }

    // Delete follow relationship
    await followRepository.deleteFollow(followerId, followingId);

    const following = await userRepository.findById(followingId);

    return {
      message: `Unfollowed ${following?.username || 'user'}`,
    };
  },

  /**
   * Get user's followers
   */
  getFollowers: async (userId, limit = 50) => {
    const follows = await followRepository.getFollowers(userId, limit);

    return follows.map((follow) => ({
      id: follow.follower.id,
      username: follow.follower.username,
      avatarUrl: follow.follower.avatarUrl,
      currentStreak: follow.follower.currentStreak,
      longestStreak: follow.follower.longestStreak,
      followedAt: follow.createdAt,
    }));
  },

  /**
   * Get users that a user is following
   */
  getFollowing: async (userId, limit = 50) => {
    const follows = await followRepository.getFollowing(userId, limit);

    return follows.map((follow) => ({
      id: follow.following.id,
      username: follow.following.username,
      avatarUrl: follow.following.avatarUrl,
      currentStreak: follow.following.currentStreak,
      longestStreak: follow.following.longestStreak,
      followedAt: follow.createdAt,
    }));
  },

  /**
   * Check if user is following another user
   */
  checkFollowStatus: async (followerId, followingId) => {
    const isFollowing = await followRepository.isFollowing(
      followerId,
      followingId
    );

    return {
      isFollowing,
    };
  },
};

module.exports = followService;
