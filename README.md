# CodeStreak - Train Your Coding Like an Athlete

> **Compete. Commit. Ship.**

A competitive coding activity tracker that gamifies GitHub contributions. Track your coding streaks, compete on leaderboards, and follow other developers. Think "Strava for developers."

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)

## 🚀 Features

### For Developers
- 📊 **Track Your Streak** - Never break the chain
- 🏆 **Compete on Leaderboards** - See how you rank
- 👥 **Follow Other Developers** - Stay motivated together
- 📈 **Activity Heatmap** - Visualize 365 days of code
- 🔥 **Real-time Stats** - Commits, additions, deletions
- 🎯 **Public Profiles** - Share your coding journey

### Technical Features
- 🔐 GitHub OAuth authentication
- 📡 Automatic activity syncing (540 days history)
- 🎨 Beautiful, competitive UI design
- ⚡ Fast, responsive, smooth animations
- 📱 Mobile-friendly
- 🔄 Real-time data updates

## 📸 Screenshots

### Dashboard
Massive streak display with activity stats and 365-day heatmap.

### Leaderboard
Compete with other developers on longest streaks and most commits.

### Profile
Public profiles with stats, streaks, and activity visualization.

### Feed
See what developers you follow are working on.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Passport.js + JWT
- **OAuth:** GitHub OAuth

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- GitHub OAuth App ([Create one](https://github.com/settings/developers))

### 1. Clone Repository
```bash
git clone https://github.com/utkarshjha1407/merge.git
cd merge
```

### 2. Setup Backend
```bash
cd Backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma generate
npx prisma migrate dev

# Start server
npm run dev
# Runs on http://localhost:8080
```

### 3. Setup Frontend
```bash
cd Frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

# Start development server
npm run dev
# Runs on http://localhost:3000
```

### 4. Visit Application
Open http://localhost:3000 and sign in with GitHub!

## 📁 Project Structure

```
merge/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database access
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & validation
│   │   ├── config/          # Configuration
│   │   └── utils/           # Utilities
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── .env                 # Environment config
│
└── Frontend/
    ├── app/                 # Next.js pages
    │   ├── page.tsx         # Landing
    │   ├── login/           # Login
    │   ├── dashboard/       # Dashboard
    │   ├── leaderboard/     # Rankings
    │   ├── profile/         # Profiles
    │   ├── feed/            # Activity feed
    │   ├── search/          # Discover
    │   └── settings/        # Settings
    ├── components/          # Reusable components
    └── lib/                 # Utilities & hooks
```

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/codestreak"
JWT_SECRET="your-secret-key"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:8080/auth/github/callback"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

## 📡 API Endpoints

### Authentication
- `GET /auth/github` - Initiate OAuth
- `GET /auth/github/callback` - OAuth callback

### User & Activity
- `GET /user/me` - Current user
- `POST /github/sync` - Sync GitHub activity
- `GET /github/activity` - Get activity

### Streaks & Stats
- `GET /streak/current` - Current streak
- `GET /stats/activity` - Activity statistics
- `GET /stats/activity/:username` - User statistics

### Social Features
- `POST /follow/:username` - Follow user
- `DELETE /follow/:username` - Unfollow user
- `GET /follow/:username/status` - Follow status
- `GET /feed/activity` - Activity feed
- `GET /feed/trending` - Trending users

### Profiles & Leaderboard
- `GET /profile/:username` - Public profile
- `GET /profile/leaderboard` - Rankings
- `GET /profile/search` - Search users

See [COMPLETE_API_REFERENCE.md](Backend/COMPLETE_API_REFERENCE.md) for full documentation.

## 🎨 Design Philosophy

**Competitive. Focused. Elegant.**

- Deep midnight background (#0a0e1a)
- Neon green accents (#00ff88)
- Large, bold typography
- Heavy whitespace
- Smooth animations
- Minimal decoration

Not playful. Not corporate. Not cute. Built for developers who want to compete.

## 🧪 Testing

```bash
# Backend tests
cd Backend
npm test

# Frontend build test
cd Frontend
npm run build

# Type checking
npm run type-check
```

See [TESTING_CHECKLIST.md](Frontend/TESTING_CHECKLIST.md) for comprehensive testing guide.

## 🚢 Deployment

### Recommended Stack
- **Frontend:** Vercel
- **Backend:** Railway / Render
- **Database:** Railway / Supabase

See [DEPLOYMENT.md](Frontend/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

#### Frontend (Vercel)
```bash
npm i -g vercel
cd Frontend
vercel --prod
```

#### Backend (Railway)
```bash
# Connect GitHub repo to Railway
# Set environment variables
# Deploy automatically on push
```

## 📚 Documentation

- [Complete API Reference](Backend/COMPLETE_API_REFERENCE.md)
- [Testing Checklist](Frontend/TESTING_CHECKLIST.md)
- [Deployment Guide](Frontend/DEPLOYMENT.md)
- [Quick Reference](QUICK_REFERENCE.md)
- [Features Complete](Frontend/FEATURES_COMPLETE.md)
- [What's Left](Frontend/WHATS_LEFT.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Strava's approach to fitness tracking
- GitHub for the amazing API
- The developer community for motivation

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/utkarshjha1407/merge/issues)
- **Discussions:** [GitHub Discussions](https://github.com/utkarshjha1407/merge/discussions)

## 🎯 Roadmap

- [x] Core features (auth, streaks, stats)
- [x] Social features (follow, feed)
- [x] Leaderboards
- [x] Activity heatmap
- [ ] Weekly challenges
- [ ] Team competitions
- [ ] Achievements & badges
- [ ] Mobile app
- [ ] Browser extension

## 💪 Built With Discipline

**Compete. Commit. Ship.** 🚀

---

Made with ❤️ by developers, for developers.

[Live Demo](#) | [Documentation](Backend/COMPLETE_API_REFERENCE.md) | [Report Bug](https://github.com/utkarshjha1407/merge/issues)
