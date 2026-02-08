const { prisma } = require('../utils/prisma');

const userRepository = {
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
  },

  findByUsername: async (username) => {
    return await prisma.user.findFirst({
      where: { username },
    });
  },

  searchByUsername: async (query, limit = 20) => {
    return await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: limit,
      orderBy: {
        currentStreak: 'desc',
      },
    });
  },

  getTopByStreak: async (limit = 50) => {
    return await prisma.user.findMany({
      take: limit,
      orderBy: {
        currentStreak: 'desc',
      },
    });
  },

  getTopByCommits: async (limit = 50) => {
    // Get users with their total commits
    const users = await prisma.user.findMany({
      include: {
        activities: {
          select: {
            commitCount: true,
          },
        },
      },
    });

    // Calculate total commits for each user
    const usersWithCommits = users.map(user => ({
      ...user,
      totalCommits: user.activities.reduce(
        (sum, activity) => sum + activity.commitCount,
        0
      ),
    }));

    // Sort by total commits and limit
    return usersWithCommits
      .sort((a, b) => b.totalCommits - a.totalCommits)
      .slice(0, limit);
  },

  findByIdWithStats: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            activities: true,
          },
        },
      },
    });
  },

  updateUser: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  updateStreak: async (id, currentStreak, longestStreak) => {
    return await prisma.user.update({
      where: { id },
      data: {
        currentStreak,
        longestStreak,
      },
    });
  },
};

module.exports = userRepository;
