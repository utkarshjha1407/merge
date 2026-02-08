const feedService = require('../services/feed.service');

const feedController = {
  /**
   * GET /api/feed - Get social feed
   */
  getSocialFeed: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;

      if (limit < 1 || limit > 100) {
        return res.status(400).json({
          success: false,
          error: 'Limit must be between 1 and 100',
        });
      }

      const feed = await feedService.getSocialFeed(userId, limit);

      res.json({
        success: true,
        data: feed,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/feed/daily - Get daily summary feed
   */
  getDailySummaryFeed: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days) || 7;

      if (days < 1 || days > 30) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 30',
        });
      }

      const feed = await feedService.getDailySummaryFeed(userId, days);

      res.json({
        success: true,
        data: feed,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/feed/trending - Get trending users
   */
  getTrendingUsers: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 20;

      if (limit < 1 || limit > 50) {
        return res.status(400).json({
          success: false,
          error: 'Limit must be between 1 and 50',
        });
      }

      const trending = await feedService.getTrendingUsers(limit);

      res.json({
        success: true,
        data: {
          trending,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = feedController;
