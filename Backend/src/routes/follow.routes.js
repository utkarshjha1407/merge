const express = require('express');
const followController = require('../controllers/follow.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All follow routes require authentication
router.use(authenticateJWT);

// GET /api/follow/followers - Get user's followers
router.get('/followers', followController.getFollowers);

// GET /api/follow/following - Get users that user is following
router.get('/following', followController.getFollowing);

// GET /api/follow/status/:userId - Check if following a user
router.get('/status/:userId', followController.checkFollowStatus);

// POST /api/follow/:userId - Follow a user
router.post('/:userId', followController.followUser);

// DELETE /api/follow/:userId - Unfollow a user
router.delete('/:userId', followController.unfollowUser);

module.exports = router;
