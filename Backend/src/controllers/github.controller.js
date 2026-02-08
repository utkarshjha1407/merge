const githubService = require('../services/github.service');

const githubController = {
  /**
   * POST /api/github/sync - Manually sync GitHub activity
   */
  syncActivity: async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      const result = await githubService.syncActivity(userId);

      res.json({
        success: true,
        message: 'GitHub activity synced successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/github/fetch - Fetch activity for specific date range
   */
  fetchActivity: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { days = 7 } = req.body;

      if (days < 1 || days > 540) {
        return res.status(400).json({
          success: false,
          error: 'Days must be between 1 and 540',
        });
      }

      // Get user's access token
      const userRepository = require('../repositories/user.repository');
      const user = await userRepository.findById(userId);

      if (!user || !user.accessToken) {
        return res.status(400).json({
          success: false,
          error: 'GitHub access token not found',
        });
      }

      const result = await githubService.fetchUserActivity(
        userId,
        user.accessToken,
        days
      );

      res.json({
        success: true,
        message: `Fetched activity for last ${days} days`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = githubController;
