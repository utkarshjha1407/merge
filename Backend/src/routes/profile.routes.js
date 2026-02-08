const express = require('express');
const profileController = require('../controllers/profile.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// Public routes (no authentication required)
router.get('/search', profileController.searchUsers);
router.get('/leaderboard', profileController.getLeaderboard);
router.get('/username/:username', profileController.getProfileByUsername);
router.get('/:userId', profileController.getProfileById);

module.exports = router;
