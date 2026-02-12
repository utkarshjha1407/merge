const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateJWT = require('../middleware/jwt.middleware');

const router = express.Router();

// All user routes require authentication
router.use(authenticateJWT);

// GET /api/user/me - Get current user profile
router.get('/me', userController.getProfile);

// PUT /api/user/profile - Update user profile
router.put('/profile', userController.updateProfile);

// GET /api/user/dashboard - Get dashboard stats with daily breakdown
router.get('/dashboard', userController.getDashboard);

// GET /api/user/activities - Get recent activities
router.get('/activities', userController.getActivities);

module.exports = router;
