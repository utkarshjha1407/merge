# Quick Start Guide

## Prerequisites

1. **Backend API** must be running on `http://localhost:8080`
2. **Node.js 18+** installed
3. **GitHub OAuth App** configured (same as backend)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
```

> **Note**: Use the same GitHub Client ID as your backend

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Testing the Application

### 1. Visit Landing Page
- Open http://localhost:3000
- You should see the CodeStreak landing page

### 2. Test Authentication
- Click "Sign In" or "Get Started with GitHub"
- You'll be redirected to GitHub OAuth
- After authorization, you'll be redirected back to the dashboard

### 3. Explore Features

**Dashboard** (`/dashboard`)
- View your streak stats
- See total commits and active days
- Sync GitHub activity

**Explore** (`/explore`)
- Search for developers
- View trending users

**Leaderboard** (`/leaderboard`)
- See top developers by streak
- See top developers by commits

**Feed** (`/feed`)
- View activity from followed users
- See recent commits and repositories

**Profile** (`/profile/[username]`)
- View any user's public profile
- Follow/unfollow users
- See their stats and activity

**Settings** (`/settings`)
- Update your bio, location, website
- Manage profile information

## Common Issues

### Issue: "Cannot connect to API"
**Solution**: Make sure the backend is running on port 8080
```bash
cd ../Backend
npm start
```

### Issue: "GitHub OAuth not working"
**Solution**: 
1. Check that `NEXT_PUBLIC_GITHUB_CLIENT_ID` matches your backend
2. Verify GitHub OAuth callback URL is set to `http://localhost:8080/auth/github/callback`
3. Make sure backend `.env` has correct GitHub credentials

### Issue: "No data showing"
**Solution**: 
1. Sync your GitHub activity from the dashboard
2. Make sure you have commits in the last 540 days
3. Check browser console for API errors

## Development Tips

### Hot Reload
- Changes to files automatically reload the page
- No need to restart the server

### TypeScript Errors
- Run `npm run build` to check for type errors
- Fix any TypeScript issues before committing

### Styling
- Use Tailwind CSS classes
- Use shadcn/ui components from `@/components/ui`
- Follow existing patterns for consistency

### API Calls
- Use custom hooks from `hooks/` directory
- Don't call `apiClient` directly in components
- React Query handles caching automatically

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
Frontend/
├── app/              # Pages (Next.js App Router)
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and config
└── public/           # Static assets
```

## Next Steps

1. **Customize Styling**: Edit `app/globals.css` for theme changes
2. **Add Features**: Create new pages in `app/` directory
3. **Add Components**: Create reusable components in `components/`
4. **Add Hooks**: Create data fetching hooks in `hooks/`

## Support

For issues or questions:
1. Check the main README.md
2. Review the backend API documentation
3. Check browser console for errors
4. Verify backend is running and accessible
