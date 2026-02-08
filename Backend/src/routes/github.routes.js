const express = require('express');
const githubController = require('../controllers/github.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All GitHub routes require authentication
router.use(authenticateJWT);

// POST /api/github/sync - Sync GitHub activity (last 30 days)
router.post('/sync', githubController.syncActivity);

// POST /api/github/fetch - Fetch activity for custom date range
router.post('/fetch', githubController.fetchActivity);

module.exports = router;
