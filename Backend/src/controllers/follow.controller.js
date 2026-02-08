const followService = require('../services/follow.service');

const followController = {
  /**
   * POST /api/follow/:userId - Follow a user
   */
  followUser: async (req, res, next) => {
    try {
      const followerId = req.user.id;
      const followingId = req.params.userId;

      const result = await followService.followUser(followerId, followingId);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error.message.includes('Cannot follow') || 
          error.message.includes('Already following') ||
          error.message.includes('not found')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      next(error);
    }
  },

  /**
   * DELETE /api/follow/:userId - Unfollow a user
   */
  unfollowUser: async (req, res, next) => {
    try {
      const followerId = req.user.id;
      const followingId = req.params.userId;

      const result = await followService.unfollowUser(followerId, followingId);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error.message.includes('Not following')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      next(error);
    }
  },

  /**
   * GET /api/follow/followers - Get user's followers
   */
  getFollowers: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;

      const followers = await followService.getFollowers(userId, limit);

      res.json({
        success: true,
        data: {
          count: followers.length,
          followers,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/follow/following - Get users that user is following
   */
  getFollowing: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;

      const following = await followService.getFollowing(userId, limit);

      res.json({
        success: true,
        data: {
          count: following.length,
          following,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/follow/status/:userId - Check if following a user
   */
  checkFollowStatus: async (req, res, next) => {
    try {
      const followerId = req.user.id;
      const followingId = req.params.userId;

      const status = await followService.checkFollowStatus(
        followerId,
        followingId
      );

      res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = followController;
