const streakService = require('../services/streak.service');

const streakController = {
  /**
   * GET /api/streak - Get streak details
   */
  getStreak: async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      const streakDetails = await streakService.getStreakDetails(userId);

      res.json({
        success: true,
        data: streakDetails,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/streak/calculate - Recalculate and update streak
   */
  calculateStreak: async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      const streakData = await streakService.updateUserStreak(userId);

      res.json({
        success: true,
        message: 'Streak calculated and updated',
        data: streakData,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = streakController;
