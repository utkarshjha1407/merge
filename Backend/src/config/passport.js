const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { prisma } = require('../utils/prisma');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:8080/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const githubId = BigInt(profile.id);
        
        // Check if user exists
        let user = await prisma.user.findUnique({
          where: { githubId },
        });

        if (user) {
          // Update access token for existing user
          user = await prisma.user.update({
            where: { githubId },
            data: { 
              accessToken,
            },
          });
        } else {
          // Create new user with GitHub username as default
          user = await prisma.user.create({
            data: {
              githubId,
              username: profile.username,
              avatarUrl: profile.photos?.[0]?.value || null,
              accessToken,
              hasCompletedProfile: false, // Will complete after first sync
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
