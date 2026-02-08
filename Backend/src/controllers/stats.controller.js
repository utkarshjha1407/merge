const statsService = require('../services/stats.service');

const statsController = {
  /**
   * GET /api/stats/activity - Get activity statistics
   */
  getActivityStats: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days) || 30;

      if (days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 365',
        });
      }

      const stats = await statsService.getActivityStats(userId, days);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/stats/repositories - Get repository-wise statistics
   */
  getRepositoryStats: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days) || 30;

      if (days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 365',
        });
      }

      const stats = await statsService.getRepositoryStats(userId, days);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/stats/heatmap - Get activity heatmap data
   */
  getActivityHeatmap: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days) || 365;

      if (days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 365',
        });
      }

      const heatmap = await statsService.getActivityHeatmap(userId, days);

      res.json({
        success: true,
        data: heatmap,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/stats/weekly - Get weekly summary
   */
  getWeeklySummary: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const summary = await statsService.getWeeklySummary(userId);

      res.json({
        success: true,
        data: {
          weeks: summary,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = statsController;
