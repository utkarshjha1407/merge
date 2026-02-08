const profileService = require('../services/profile.service');

const profileController = {
  /**
   * GET /api/profile/:userId - Get public profile by ID
   */
  getProfileById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const viewerId = req.user?.id; // Optional - if authenticated

      const profile = await profileService.getPublicProfile(userId, viewerId);

      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      next(error);
    }
  },

  /**
   * GET /api/profile/username/:username - Get public profile by username
   */
  getProfileByUsername: async (req, res, next) => {
    try {
      const { username } = req.params;
      const viewerId = req.user?.id;

      const profile = await profileService.getPublicProfileByUsername(
        username,
        viewerId
      );

      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      next(error);
    }
  },

  /**
   * GET /api/profile/search - Search users
   */
  searchUsers: async (req, res, next) => {
    try {
      const { q, limit = 20 } = req.query;

      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
      }

      const users = await profileService.searchUsers(q, parseInt(limit));

      res.json({
        success: true,
        data: {
          query: q,
          count: users.length,
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/profile/leaderboard - Get leaderboard
   */
  getLeaderboard: async (req, res, next) => {
    try {
      const { type = 'streak', limit = 50 } = req.query;

      const leaderboard = await profileService.getLeaderboard(
        type,
        parseInt(limit)
      );

      res.json({
        success: true,
        data: {
          type,
          leaderboard,
        },
      });
    } catch (error) {
      if (error.message.includes('Invalid leaderboard type')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      next(error);
    }
  },
};

module.exports = profileController;
