const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');

const router = express.Router();

// Initiate GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth/failure' }),
  (req, res) => {
    try {
      // Generate JWT
      const token = jwt.sign(
        { id: req.user.id, username: req.user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      // Redirect to frontend with token or return JSON
      // For development, return JSON
      res.json({ 
        success: true,
        token,
        user: {
          id: req.user.id,
          username: req.user.username,
          avatarUrl: req.user.avatarUrl,
        }
      });
    } catch (error) {
      console.error('Token generation error:', error);
      res.status(500).json({ success: false, error: 'Failed to generate token' });
    }
  }
);

// Failure route
router.get('/failure', (req, res) => {
  res.status(401).json({ 
    success: false, 
    error: 'Authentication failed',
    message: 'Please check your GitHub OAuth app settings and try again'
  });
});

module.exports = router;
