# Frontend Planning - Strava for Coders

## 🎯 Project Overview

A modern, responsive web application for tracking GitHub activity with social features, built with React/Next.js.

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** (App Router)
  - Server-side rendering
  - API routes for backend proxy
  - File-based routing
  - Built-in optimization

### UI & Styling
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Modern icon library
- **Framer Motion** - Smooth animations

### State Management
- **React Context** - Global state (auth, user)
- **TanStack Query (React Query)** - Server state management
  - Caching
  - Auto-refetching
  - Optimistic updates

### Data Fetching
- **Axios** - HTTP client
- **SWR** (alternative) - Data fetching hooks

### Charts & Visualizations
- **Recharts** - Activity graphs
- **React Calendar Heatmap** - GitHub-style contribution graph

### Authentication
- **JWT tokens** - Stored in httpOnly cookies
- **Protected routes** - Middleware-based

---

## 📱 Pages & Routes

### Public Pages (No Auth Required)

#### 1. Landing Page `/`
**Purpose**: Marketing page, explain features, CTA to login

**Sections**:
- Hero section with tagline
- Features showcase
- How it works
- Leaderboard preview
- Call to action

**Components**:
- `<Hero />`
- `<Features />`
- `<HowItWorks />`
- `<LeaderboardPreview />`
- `<Footer />`

---

#### 2. Login Page `/login`
**Purpose**: GitHub OAuth login

**Features**:
- "Login with GitHub" button
- Redirect to backend OAuth
- Handle callback with token
- Store token securely

**Components**:
- `<LoginButton />`
- `<OAuthCallback />`

---

#### 3. Public Profile `/profile/[username]`
**Purpose**: View any user's public profile

**Sections**:
- User header (avatar, username, stats)
- Streak display
- Activity heatmap (last 365 days)
- Recent activities
- Follow button (if authenticated)

**Components**:
- `<ProfileHeader />`
- `<StreakCard />`
- `<ActivityHeatmap />`
- `<ActivityList />`
- `<FollowButton />`

---

#### 4. Leaderboard `/leaderboard`
**Purpose**: Top users by streak or commits

**Features**:
- Toggle between streak/commits
- Top 50 users
- Search/filter
- Pagination

**Components**:
- `<LeaderboardTabs />`
- `<LeaderboardTable />`
- `<UserRankCard />`

---

#### 5. Search `/search`
**Purpose**: Find users

**Features**:
- Search input
- Real-time results
- User cards with stats
- Link to profiles

**Components**:
- `<SearchBar />`
- `<UserSearchResults />`
- `<UserCard />`

---

### Protected Pages (Auth Required)

#### 6. Dashboard `/dashboard`
**Purpose**: User's main page after login

**Sections**:
- Welcome header
- Current streak display
- Quick stats (commits, additions, deletions)
- Activity chart (last 30 days)
- Recent activities
- Sync button

**Components**:
- `<DashboardHeader />`
- `<StreakDisplay />`
- `<QuickStats />`
- `<ActivityChart />`
- `<RecentActivities />`
- `<SyncButton />`

---

#### 7. Profile (Own) `/profile`
**Purpose**: User's own profile with edit options

**Sections**:
- Profile header (editable)
- Detailed stats
- Activity heatmap
- Repository breakdown
- Weekly summary
- Settings link

**Components**:
- `<EditableProfile />`
- `<DetailedStats />`
- `<RepositoryStats />`
- `<WeeklySummary />`

---

#### 8. Social Feed `/feed`
**Purpose**: Activity feed from followed users

**Sections**:
- Feed tabs (Activity / Daily Summary)
- Activity cards
- User avatars
- Commit details
- Infinite scroll

**Components**:
- `<FeedTabs />`
- `<ActivityFeedCard />`
- `<DailySummaryCard />`
- `<InfiniteScroll />`

---

#### 9. Following/Followers `/social`
**Purpose**: Manage social connections

**Tabs**:
- Following
- Followers
- Suggestions (trending users)

**Components**:
- `<SocialTabs />`
- `<UserList />`
- `<FollowButton />`
- `<TrendingUsers />`

---

#### 10. Statistics `/stats`
**Purpose**: Detailed analytics

**Sections**:
- Time range selector
- Activity overview
- Repository breakdown
- Contribution trends
- Streak history

**Components**:
- `<DateRangePicker />`
- `<StatsOverview />`
- `<RepositoryChart />`
- `<TrendChart />`
- `<StreakHistory />`

---

#### 11. Settings `/settings`
**Purpose**: User preferences

**Sections**:
- Profile settings
- Notification preferences
- Privacy settings
- Sync settings
- Danger zone (delete account)

**Components**:
- `<SettingsForm />`
- `<NotificationSettings />`
- `<PrivacySettings />`
- `<DangerZone />`

---

## 🧩 Component Architecture

### Layout Components

```
<RootLayout>
  ├── <Navbar>
  │   ├── <Logo>
  │   ├── <NavLinks>
  │   ├── <SearchBar>
  │   └── <UserMenu>
  ├── <Sidebar> (optional, for dashboard)
  ├── <main>
  │   └── {children}
  └── <Footer>
```

### Shared Components

#### Navigation
- `<Navbar />` - Top navigation
- `<Sidebar />` - Side navigation (dashboard)
- `<MobileMenu />` - Mobile navigation
- `<UserMenu />` - User dropdown

#### User Display
- `<UserCard />` - User info card
- `<UserAvatar />` - Avatar with fallback
- `<UserBadge />` - Small user display
- `<StreakBadge />` - Streak indicator

#### Activity Display
- `<ActivityCard />` - Single activity
- `<ActivityList />` - List of activities
- `<ActivityHeatmap />` - GitHub-style heatmap
- `<ActivityChart />` - Line/bar charts

#### Stats Display
- `<StatCard />` - Single stat display
- `<StatsGrid />` - Grid of stats
- `<ProgressBar />` - Progress indicator
- `<TrendIndicator />` - Up/down trend

#### Social
- `<FollowButton />` - Follow/unfollow
- `<FollowerCount />` - Follower display
- `<SocialProof />` - "X people follow"

#### Forms & Inputs
- `<SearchInput />` - Search bar
- `<DatePicker />` - Date range selector
- `<SyncButton />` - Sync GitHub activity
- `<FilterDropdown />` - Filter options

#### Feedback
- `<LoadingSpinner />` - Loading state
- `<EmptyState />` - No data state
- `<ErrorMessage />` - Error display
- `<Toast />` - Notifications

---

## 🎨 Design System

### Color Palette

```css
/* Primary - GitHub inspired */
--primary: #2da44e (green)
--primary-dark: #1a7f37
--primary-light: #3fb950

/* Neutral */
--background: #0d1117 (dark)
--surface: #161b22
--border: #30363d
--text: #c9d1d9
--text-secondary: #8b949e

/* Accent */
--accent-blue: #58a6ff
--accent-purple: #bc8cff
--accent-orange: #ffa657

/* Status */
--success: #3fb950
--warning: #d29922
--error: #f85149
--info: #58a6ff
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

/* Font Sizes */
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
```

### Spacing

```css
/* Consistent spacing scale */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
```

### Border Radius

```css
--radius-sm: 0.25rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-full: 9999px
```

---

## 📊 Data Flow

### Authentication Flow

```
1. User clicks "Login with GitHub"
2. Redirect to backend: /auth/github
3. GitHub OAuth flow
4. Callback to backend: /auth/github/callback
5. Backend returns JWT token
6. Frontend stores token in httpOnly cookie
7. Redirect to /dashboard
```

### Data Fetching Pattern

```javascript
// Using React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['user', 'profile'],
  queryFn: () => api.getProfile(),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### State Management

```
Global State (Context):
- User authentication
- User profile
- Theme preference

Server State (React Query):
- Activity data
- Stats
- Social connections
- Feed data

Local State (useState):
- Form inputs
- UI toggles
- Modal states
```

---

## 🔄 Key Features & Interactions

### 1. GitHub Sync
- Manual sync button
- Shows last sync time
- Loading state during sync
- Success/error notifications
- Auto-refresh data after sync

### 2. Streak Display
- Animated flame icon
- Current streak number
- Longest streak badge
- Streak calendar view
- "Keep it going!" motivation

### 3. Activity Heatmap
- GitHub-style contribution graph
- Hover shows commit count
- Click to see day details
- Color intensity by activity
- Last 365 days

### 4. Social Feed
- Real-time updates
- Infinite scroll
- Activity cards with:
  - User avatar
  - Repo name
  - Commit count
  - Time ago
  - Link to GitHub

### 5. Leaderboard
- Rank display
- User cards
- Toggle streak/commits
- Search functionality
- Your rank highlight

### 6. Follow System
- Follow/unfollow button
- Follower count
- Following list
- Mutual followers indicator
- Follow suggestions

---

## 🚀 Performance Optimizations

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports

### Caching Strategy
- React Query caching
- Service worker (PWA)
- Image optimization
- Static generation where possible

### Optimistic Updates
- Instant UI feedback
- Rollback on error
- Follow/unfollow
- Like/comment actions

---

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile-First Approach
- Stack layouts on mobile
- Hamburger menu
- Touch-friendly buttons
- Swipe gestures
- Bottom navigation

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- Hooks logic

### Integration Tests
- User flows
- API integration
- Form submissions

### E2E Tests
- Critical user journeys
- Authentication flow
- Data sync

---

## 📦 Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── callback/
│   ├── (public)/
│   │   ├── page.tsx (landing)
│   │   ├── leaderboard/
│   │   ├── search/
│   │   └── profile/[username]/
│   ├── (protected)/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── feed/
│   │   ├── social/
│   │   ├── stats/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── layout/
│   ├── features/
│   └── shared/
├── lib/
│   ├── api.ts (API client)
│   ├── auth.ts (Auth helpers)
│   ├── utils.ts (Utilities)
│   └── constants.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   └── useActivity.ts
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   └── icons/
└── package.json
```

---

## 🎯 MVP Features (Phase 1)

### Must Have
1. ✅ GitHub OAuth login
2. ✅ Dashboard with stats
3. ✅ Activity heatmap
4. ✅ Streak display
5. ✅ Public profiles
6. ✅ Leaderboard
7. ✅ Follow/unfollow
8. ✅ Social feed

### Nice to Have (Phase 2)
- Notifications
- Comments on activities
- Achievements/badges
- Team features
- Dark/light theme toggle
- Export data
- Mobile app

---

## 🔐 Security Considerations

- Store JWT in httpOnly cookies
- CSRF protection
- XSS prevention
- Input sanitization
- Rate limiting on client
- Secure API calls

---

## 📈 Analytics & Monitoring

- User engagement tracking
- Error tracking (Sentry)
- Performance monitoring
- A/B testing capability

---

## 🚀 Deployment

### Hosting Options
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**

### CI/CD
- GitHub Actions
- Automated tests
- Preview deployments
- Production deployment

---

## 📝 Next Steps

1. **Setup Project**
   - Initialize Next.js
   - Install dependencies
   - Configure Tailwind
   - Setup shadcn/ui

2. **Core Features**
   - Authentication
   - Dashboard
   - Profile pages

3. **Social Features**
   - Follow system
   - Feed
   - Leaderboard

4. **Polish**
   - Animations
   - Loading states
   - Error handling
   - Responsive design

---

## 🎨 Design Inspiration

- GitHub's contribution graph
- Strava's activity feed
- Duolingo's streak system
- Twitter's social features
- Linear's clean UI

---

This is a comprehensive plan. Ready to start building? 🚀
