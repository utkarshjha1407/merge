const express = require('express');
const streakController = require('../controllers/streak.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All streak routes require authentication
router.use(authenticateJWT);

// GET /api/streak - Get streak details with recent activity
router.get('/', streakController.getStreak);

// POST /api/streak/calculate - Recalculate streak
router.post('/calculate', streakController.calculateStreak);

module.exports = router;
