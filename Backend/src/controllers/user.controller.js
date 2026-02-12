const userService = require('../services/user.service');

const userController = {
  // GET /api/user/me - Get current user profile
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const profile = await userService.getUserProfile(userId);
      
      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/user/profile - Update user profile
  updateProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { username } = req.body;

      if (!username || username.trim().length < 3) {
        return res.status(400).json({
          success: false,
          error: 'Username must be at least 3 characters',
        });
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return res.status(400).json({
          success: false,
          error: 'Username can only contain letters, numbers, hyphens, and underscores',
        });
      }

      const updatedUser = await userService.updateUserProfile(userId, { username });
      
      res.json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/user/dashboard - Get dashboard stats
  getDashboard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days) || 30;

      if (days < 1 || days > 365) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 365',
        });
      }

      const dashboard = await userService.getDashboardStats(userId, days);
      
      res.json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/user/activities - Get recent activities
  getActivities: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 20;

      if (limit < 1 || limit > 100) {
        return res.status(400).json({
          success: false,
          error: 'Limit must be between 1 and 100',
        });
      }

      const activities = await userService.getRecentActivities(userId, limit);
      
      res.json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
