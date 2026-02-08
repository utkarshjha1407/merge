const { prisma } = require('../utils/prisma');

const followRepository = {
  /**
   * Check if user is following another user
   */
  isFollowing: async (followerId, followingId) => {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return !!follow;
  },

  /**
   * Create a follow relationship
   */
  createFollow: async (followerId, followingId) => {
    return await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  },

  /**
   * Delete a follow relationship
   */
  deleteFollow: async (followerId, followingId) => {
    return await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  },

  /**
   * Get user's followers
   */
  getFollowers: async (userId, limit = 50) => {
    return await prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            currentStreak: true,
            longestStreak: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  /**
   * Get users that a user is following
   */
  getFollowing: async (userId, limit = 50) => {
    return await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            currentStreak: true,
            longestStreak: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  /**
   * Get follower count
   */
  getFollowerCount: async (userId) => {
    return await prisma.follow.count({
      where: { followingId: userId },
    });
  },

  /**
   * Get following count
   */
  getFollowingCount: async (userId) => {
    return await prisma.follow.count({
      where: { followerId: userId },
    });
  },
};

module.exports = followRepository;
