const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const githubRoutes = require('./routes/github.routes');
const streakRoutes = require('./routes/streak.routes');
const followRoutes = require('./routes/follow.routes');
const statsRoutes = require('./routes/stats.routes');
const profileRoutes = require('./routes/profile.routes');
const feedRoutes = require('./routes/feed.routes');

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/streak', streakRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/feed', feedRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Strava for Coders API',
    version: '1.0.0',
    endpoints: {
      auth: {
        github: '/auth/github',
        callback: '/auth/github/callback',
      },
      user: {
        profile: '/api/user/me',
        dashboard: '/api/user/dashboard?days=30',
        activities: '/api/user/activities?limit=20',
      },
    },
    documentation: 'See API_DOCUMENTATION.md',
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

module.exports = app;
