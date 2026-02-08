# Strava for Coders - Backend API

A GitHub activity tracking platform with social features, built with Node.js, Express, Prisma, and PostgreSQL.

## 🚀 Features

✅ **GitHub OAuth Authentication** - Secure login with GitHub  
✅ **Activity Tracking** - Fetch and store commit history  
✅ **Streak Calculation** - Track current and longest streaks  
✅ **Social Features** - Follow/unfollow users  
✅ **Comprehensive Stats** - Activity analytics and insights  
✅ **Dashboard** - Daily stats and visualizations  

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- GitHub OAuth App credentials

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev
```

Server runs on: `http://localhost:8080`

## 🔑 Environment Variables

```env
PORT=8080
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/strava_for_coders"
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback
```

## 📚 API Documentation

See [COMPLETE_API_REFERENCE.md](./COMPLETE_API_REFERENCE.md) for full API documentation.

### Quick Start

1. **Login**
   ```
   GET /auth/github
   ```

2. **Sync Activity**
   ```bash
   curl -X POST \
     -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8080/api/github/sync
   ```

3. **View Dashboard**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8080/api/user/dashboard
   ```

## 🏗️ Architecture

```
src/
├── config/          # Configuration (Passport, etc.)
├── controllers/     # Request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utilities (Prisma client, etc.)
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## 📊 Database Schema

- **User** - User profiles with streak data
- **Activity** - Repository activities per day
- **DailyStat** - Aggregated daily statistics
- **Follow** - User follow relationships

## 🔐 Authentication

Uses JWT tokens with GitHub OAuth:
1. User logs in via GitHub
2. Server generates JWT token
3. Client includes token in Authorization header
4. Server validates token on protected routes

## 📖 Feature Documentation

- [Feature 1: GitHub Activity Fetching](./FEATURE_1_GITHUB_ACTIVITY.md)
- [Feature 2: Streak Calculation](./FEATURE_2_STREAK_CALCULATION.md)
- [Feature 3: Follow/Unfollow](./FEATURE_3_FOLLOW_UNFOLLOW.md)
- [Feature 4: Activity Stats](./FEATURE_4_ACTIVITY_STATS.md)

## 🧪 Testing

```bash
# Test OAuth setup
See OAUTH_SETUP.md

# Test endpoints
See TEST_ENDPOINTS.md

# API reference
See COMPLETE_API_REFERENCE.md
```

## 📦 Dependencies

- **express** - Web framework
- **prisma** - ORM
- **passport** - Authentication
- **jsonwebtoken** - JWT tokens
- **@octokit/rest** - GitHub API client
- **pg** - PostgreSQL client

## 🚀 Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start server: `npm start`

## 📝 Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

ISC

## 👥 Authors

Built with ❤️ for developers who code every day

---

**Need help?** Check the documentation files or open an issue.
