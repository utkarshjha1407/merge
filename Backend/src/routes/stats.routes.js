const express = require('express');
const statsController = require('../controllers/stats.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All stats routes require authentication
router.use(authenticateJWT);

// GET /api/stats/activity - Get comprehensive activity statistics
router.get('/activity', statsController.getActivityStats);

// GET /api/stats/repositories - Get repository-wise statistics
router.get('/repositories', statsController.getRepositoryStats);

// GET /api/stats/heatmap - Get activity heatmap data
router.get('/heatmap', statsController.getActivityHeatmap);

// GET /api/stats/weekly - Get weekly summary
router.get('/weekly', statsController.getWeeklySummary);

module.exports = router;
