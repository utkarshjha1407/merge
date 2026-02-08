const { prisma } = require('../utils/prisma');

const dailyStatRepository = {
  findByUserAndDateRange: async (userId, startDate, endDate) => {
    return await prisma.dailyStat.findMany({
      where: {
        userId,
        statDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        statDate: 'desc',
      },
    });
  },

  findByUserAndDate: async (userId, statDate) => {
    return await prisma.dailyStat.findUnique({
      where: {
        userId_statDate: {
          userId,
          statDate,
        },
      },
    });
  },

  upsertDailyStat: async (userId, statDate, data) => {
    return await prisma.dailyStat.upsert({
      where: {
        userId_statDate: {
          userId,
          statDate,
        },
      },
      update: data,
      create: {
        userId,
        statDate,
        ...data,
      },
    });
  },

  getRecentStats: async (userId, days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.dailyStat.findMany({
      where: {
        userId,
        statDate: {
          gte: startDate,
        },
      },
      orderBy: {
        statDate: 'desc',
      },
    });
  },

  findByUserIds: async (userIds, startDate, endDate) => {
    return await prisma.dailyStat.findMany({
      where: {
        userId: {
          in: userIds,
        },
        statDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            currentStreak: true,
          },
        },
      },
      orderBy: {
        statDate: 'desc',
      },
    });
  },

  getTrendingUsers: async (days = 7, limit = 20) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get users with most commits in the period
    const stats = await prisma.dailyStat.groupBy({
      by: ['userId'],
      where: {
        statDate: {
          gte: startDate,
        },
      },
      _sum: {
        totalCommits: true,
      },
      orderBy: {
        _sum: {
          totalCommits: 'desc',
        },
      },
      take: limit,
    });

    // Get user details
    const userIds = stats.map(s => s.userId);
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    // Combine data
    return stats.map(stat => {
      const user = users.find(u => u.id === stat.userId);
      return {
        ...user,
        recentCommits: stat._sum.totalCommits || 0,
      };
    });
  },
};

module.exports = dailyStatRepository;
