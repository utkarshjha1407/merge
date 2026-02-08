const express = require('express');
const feedController = require('../controllers/feed.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All feed routes require authentication
router.use(authenticateJWT);

// GET /api/feed - Social feed (activities from followed users)
router.get('/', feedController.getSocialFeed);

// GET /api/feed/daily - Daily summary feed
router.get('/daily', feedController.getDailySummaryFeed);

// GET /api/feed/trending - Trending users
router.get('/trending', feedController.getTrendingUsers);

module.exports = router;
