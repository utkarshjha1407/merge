# Quick Start Guide 🚀

## Prerequisites
- Node.js installed
- PostgreSQL running on localhost:5432
- GitHub OAuth App configured

## 1. Start Backend

```bash
cd Backend
npm install  # if not already done
npm start
```

Backend will run on: **http://localhost:8080**

## 2. Start Frontend

```bash
cd Frontend
npm install  # if not already done
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 3. Test the Application

1. Open browser: **http://localhost:3000**
2. Click "Login with GitHub" button
3. Authorize the application
4. You'll be redirected back to the dashboard
5. Click "Sync GitHub" to fetch your activity data

## Features Available

### ✅ Implemented
- GitHub OAuth authentication
- Dashboard with real-time stats
- Activity heatmap (365 days)
- Recent activity feed
- Streak tracking (current & longest)
- Leaderboard (top 5 users)
- Social feed
- Sync GitHub activity button
- Responsive design
- Loading states
- Error handling

### 🔄 Using Mock Data (To Be Implemented)
- Commit chart (weekly/monthly)
- Activity page
- Profile page
- Search functionality

## API Endpoints Connected

✅ `GET /auth/github` - OAuth login
✅ `GET /auth/github/callback` - OAuth callback
✅ `GET /api/user/me` - Current user
✅ `GET /api/user/dashboard` - Dashboard data
✅ `GET /api/user/activities` - Recent activities
✅ `GET /api/streak` - Streak information
✅ `GET /api/stats/leaderboard` - Leaderboard
✅ `GET /api/feed` - Social feed
✅ `POST /api/github/sync` - Sync GitHub activity

## Troubleshooting

### Backend not starting?
- Check PostgreSQL is running
- Check `.env` file exists with correct DATABASE_URL
- Run `npx prisma generate` and `npx prisma migrate dev`

### Frontend not connecting?
- Check backend is running on port 8080
- Check `.env` file has `VITE_API_URL=http://localhost:8080`
- Clear browser localStorage and try again

### OAuth not working?
- Check GitHub OAuth app callback URL: `http://localhost:8080/auth/github/callback`
- Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in backend `.env`
- Check `FRONTEND_URL=http://localhost:3000` in backend `.env`

### No data showing?
- Click "Sync GitHub" button to fetch your activity
- Check browser console for errors
- Check Network tab for failed API calls

## Next Steps

1. Complete Activity page integration
2. Complete Profile page integration
3. Add user profile editing
4. Add follow/unfollow functionality
5. Add search users feature
6. Add commit chart with real data
7. Add infinite scroll for feeds
8. Add notifications
9. Deploy to production

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- React Router (routing)
- React Query (data fetching & caching)
- Axios (HTTP client)
- Framer Motion (animations)
- shadcn/ui (UI components)
- Tailwind CSS (styling)

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- Passport.js (OAuth)
- JWT (authentication)
- GitHub API integration

## File Structure

```
Frontend/
├── src/
│   ├── lib/
│   │   ├── api.ts              # Axios client
│   │   ├── types.ts            # TypeScript types
│   │   ├── api-service.ts      # API service functions
│   │   └── hooks/              # React Query hooks
│   │       ├── useAuth.ts
│   │       ├── useDashboard.ts
│   │       ├── useStreak.ts
│   │       ├── useLeaderboard.ts
│   │       ├── useFeed.ts
│   │       └── useGithubSync.ts
│   ├── pages/
│   │   ├── Index.tsx           # Dashboard (✅ integrated)
│   │   ├── AuthCallback.tsx    # OAuth callback (✅ integrated)
│   │   ├── Activity.tsx        # Activity page (mock data)
│   │   ├── Profile.tsx         # Profile page (mock data)
│   │   ├── LeaderboardPage.tsx
│   │   └── Feed.tsx
│   └── components/
│       ├── StreakDisplay.tsx   # (✅ integrated)
│       ├── ActivityHeatmap.tsx # (✅ integrated)
│       ├── ActivityFeed.tsx    # (✅ integrated)
│       ├── Leaderboard.tsx     # (✅ integrated)
│       ├── SocialFeed.tsx      # (✅ integrated)
│       └── ...
└── .env                        # VITE_API_URL

Backend/
├── src/
│   ├── routes/                 # API routes
│   ├── controllers/            # Request handlers
│   ├── services/               # Business logic
│   ├── repositories/           # Database queries
│   └── middleware/             # Auth, validation
├── prisma/
│   └── schema.prisma           # Database schema
└── .env                        # Configuration
```

## Support

If you encounter any issues:
1. Check the console for errors
2. Check the Network tab for failed requests
3. Verify environment variables
4. Restart both backend and frontend
5. Clear browser cache and localStorage
