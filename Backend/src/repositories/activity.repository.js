const { prisma } = require('../utils/prisma');

const activityRepository = {
  findByUser: async (userId, limit = 50) => {
    return await prisma.activity.findMany({
      where: { userId },
      orderBy: {
        activityDate: 'desc',
      },
      take: limit,
    });
  },

  findByUserIds: async (userIds, limit = 50) => {
    return await prisma.activity.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        activityDate: 'desc',
      },
      take: limit,
    });
  },

  findByUserAndDateRange: async (userId, startDate, endDate) => {
    return await prisma.activity.findMany({
      where: {
        userId,
        activityDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        activityDate: 'desc',
      },
    });
  },

  findByUserRepoAndDate: async (userId, repoName, activityDate) => {
    return await prisma.activity.findUnique({
      where: {
        userId_repoName_activityDate: {
          userId,
          repoName,
          activityDate,
        },
      },
    });
  },

  createActivity: async (data) => {
    return await prisma.activity.create({
      data,
    });
  },

  updateActivity: async (id, data) => {
    return await prisma.activity.update({
      where: { id },
      data,
    });
  },

  getTotalStats: async (userId) => {
    const result = await prisma.activity.aggregate({
      where: { userId },
      _sum: {
        commitCount: true,
        additions: true,
        deletions: true,
      },
    });

    return {
      totalCommits: result._sum.commitCount || 0,
      totalAdditions: result._sum.additions || 0,
      totalDeletions: result._sum.deletions || 0,
    };
  },
};

module.exports = activityRepository;
