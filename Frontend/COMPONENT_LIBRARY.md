# Component Library Specification

## 🎨 Design System Components

### Base Components (shadcn/ui)

These will be installed from shadcn/ui:

- Button
- Card
- Input
- Label
- Select
- Dropdown Menu
- Dialog (Modal)
- Toast
- Avatar
- Badge
- Tabs
- Separator
- Skeleton (Loading)
- Progress
- Tooltip
- Popover

---

## 🧩 Custom Components

### 1. Layout Components

#### `<AppLayout />`
**Purpose**: Main application wrapper

**Props**:
```typescript
{
  children: ReactNode;
  showSidebar?: boolean;
}
```

**Features**:
- Navbar
- Optional sidebar
- Footer
- Responsive layout

---

#### `<Navbar />`
**Purpose**: Top navigation bar

**Props**:
```typescript
{
  user?: User | null;
  onLogout?: () => void;
}
```

**Features**:
- Logo (links to dashboard/home)
- Navigation links
- Search bar
- User menu dropdown
- Mobile hamburger menu

**States**:
- Logged in vs logged out
- Active route highlighting
- Mobile menu open/closed

---

#### `<Sidebar />`
**Purpose**: Side navigation (dashboard)

**Props**:
```typescript
{
  activeRoute: string;
}
```

**Features**:
- Navigation links with icons
- Active state
- Collapsible on mobile
- Quick stats summary

---

### 2. User Display Components

#### `<UserCard />`
**Purpose**: Display user info in a card

**Props**:
```typescript
{
  user: {
    id: string;
    username: string;
    avatarUrl: string;
    currentStreak: number;
    longestStreak: number;
  };
  showFollowButton?: boolean;
  onFollow?: () => void;
  isFollowing?: boolean;
}
```

**Variants**:
- Compact (small card)
- Full (detailed card)
- List item

---

#### `<UserAvatar />`
**Purpose**: User avatar with fallback

**Props**:
```typescript
{
  src?: string;
  username: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnlineStatus?: boolean;
}
```

**Features**:
- Image with fallback to initials
- Multiple sizes
- Optional online indicator
- Hover effect

---

#### `<StreakBadge />`
**Purpose**: Display streak with flame icon

**Props**:
```typescript
{
  streak: number;
  type?: 'current' | 'longest';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}
```

**Features**:
- Flame emoji 🔥
- Number display
- Animation on milestone
- Color based on streak length

---

### 3. Activity Components

#### `<ActivityCard />`
**Purpose**: Single activity display

**Props**:
```typescript
{
  activity: {
    id: string;
    user: User;
    repoName: string;
    date: Date;
    commits: number;
    additions: number;
    deletions: number;
  };
  showUser?: boolean;
}
```

**Features**:
- User avatar (optional)
- Repo name with link
- Commit count
- Additions/deletions
- Time ago
- Hover effects

---

#### `<ActivityHeatmap />`
**Purpose**: GitHub-style contribution graph

**Props**:
```typescript
{
  data: Array<{
    date: string;
    count: number;
  }>;
  days?: number; // 90, 180, 365
  onDayClick?: (date: string) => void;
}
```

**Features**:
- Color intensity by activity
- Hover tooltip with count
- Click to see details
- Responsive grid
- Legend

---

#### `<ActivityChart />`
**Purpose**: Line/bar chart for activity

**Props**:
```typescript
{
  data: Array<{
    date: string;
    commits: number;
  }>;
  type?: 'line' | 'bar';
  height?: number;
}
```

**Features**:
- Recharts integration
- Responsive
- Tooltips
- Smooth animations

---

#### `<ActivityList />`
**Purpose**: List of activities

**Props**:
```typescript
{
  activities: Activity[];
  loading?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
}
```

**Features**:
- Virtualized list (for performance)
- Loading skeleton
- Empty state
- Infinite scroll

---

### 4. Stats Components

#### `<StatCard />`
**Purpose**: Display single statistic

**Props**:
```typescript
{
  label: string;
  value: number | string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: string;
}
```

**Features**:
- Large number display
- Icon
- Trend indicator
- Color coding
- Animation on mount

---

#### `<StatsGrid />`
**Purpose**: Grid of stat cards

**Props**:
```typescript
{
  stats: Array<{
    label: string;
    value: number;
    icon?: ReactNode;
  }>;
  columns?: 2 | 3 | 4;
}
```

**Features**:
- Responsive grid
- Consistent spacing
- Loading states

---

#### `<ProgressBar />`
**Purpose**: Progress indicator

**Props**:
```typescript
{
  value: number; // 0-100
  max?: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}
```

**Features**:
- Animated fill
- Color variants
- Label
- Percentage display

---

### 5. Social Components

#### `<FollowButton />`
**Purpose**: Follow/unfollow action

**Props**:
```typescript
{
  userId: string;
  isFollowing: boolean;
  onToggle: () => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
}
```

**States**:
- Not following (primary button)
- Following (secondary button)
- Loading (disabled with spinner)
- Error (show error message)

**Features**:
- Optimistic update
- Loading state
- Error handling
- Hover effects

---

#### `<FollowerCount />`
**Purpose**: Display follower/following count

**Props**:
```typescript
{
  followers: number;
  following: number;
  onClick?: (type: 'followers' | 'following') => void;
}
```

**Features**:
- Clickable counts
- Formatted numbers (1.2k, 5.3M)
- Hover effects

---

#### `<SocialProof />`
**Purpose**: "X people follow this user"

**Props**:
```typescript
{
  followers: User[];
  totalCount: number;
}
```

**Features**:
- Avatar stack (first 3)
- "+X more" text
- Hover to see names

---

### 6. Feed Components

#### `<FeedCard />`
**Purpose**: Activity card in feed

**Props**:
```typescript
{
  activity: FeedActivity;
  onUserClick?: (userId: string) => void;
}
```

**Features**:
- User info
- Activity details
- Time ago
- Link to repo
- Hover effects

---

#### `<DailySummaryCard />`
**Purpose**: Daily summary in feed

**Props**:
```typescript
{
  summary: {
    user: User;
    date: Date;
    commits: number;
    additions: number;
    deletions: number;
  };
}
```

**Features**:
- User avatar
- Date
- Stats summary
- Visual indicators

---

### 7. Search Components

#### `<SearchBar />`
**Purpose**: Search input with results

**Props**:
```typescript
{
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}
```

**Features**:
- Debounced input
- Clear button
- Loading indicator
- Keyboard shortcuts (Cmd+K)

---

#### `<SearchResults />`
**Purpose**: Display search results

**Props**:
```typescript
{
  results: User[];
  loading: boolean;
  query: string;
  onUserClick: (userId: string) => void;
}
```

**Features**:
- User cards
- Loading skeleton
- Empty state
- Highlight query match

---

### 8. Leaderboard Components

#### `<LeaderboardTable />`
**Purpose**: Ranked list of users

**Props**:
```typescript
{
  users: Array<{
    rank: number;
    user: User;
    value: number; // streak or commits
  }>;
  type: 'streak' | 'commits';
  currentUserId?: string;
}
```

**Features**:
- Rank badges (1st, 2nd, 3rd)
- User info
- Value display
- Highlight current user
- Hover effects

---

#### `<RankBadge />`
**Purpose**: Display rank with styling

**Props**:
```typescript
{
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}
```

**Features**:
- Special styling for top 3
- Medal icons (🥇🥈🥉)
- Number display

---

### 9. Form Components

#### `<SyncButton />`
**Purpose**: Sync GitHub activity

**Props**:
```typescript
{
  onSync: () => Promise<void>;
  lastSyncTime?: Date;
}
```

**States**:
- Idle (ready to sync)
- Syncing (loading spinner)
- Success (checkmark animation)
- Error (error message)

**Features**:
- Loading state
- Success animation
- Error handling
- Last sync time display

---

#### `<DateRangePicker />`
**Purpose**: Select date range

**Props**:
```typescript
{
  value: { start: Date; end: Date };
  onChange: (range: { start: Date; end: Date }) => void;
  presets?: Array<{
    label: string;
    days: number;
  }>;
}
```

**Features**:
- Calendar popup
- Preset buttons (7d, 30d, 90d)
- Custom range
- Validation

---

### 10. Feedback Components

#### `<LoadingSpinner />`
**Purpose**: Loading indicator

**Props**:
```typescript
{
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}
```

**Variants**:
- Spinner only
- Spinner with text
- Full page overlay

---

#### `<EmptyState />`
**Purpose**: No data state

**Props**:
```typescript
{
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Features**:
- Icon/illustration
- Title and description
- Optional CTA button

---

#### `<ErrorMessage />`
**Purpose**: Error display

**Props**:
```typescript
{
  error: Error | string;
  onRetry?: () => void;
  dismissible?: boolean;
}
```

**Features**:
- Error icon
- Message
- Retry button
- Dismiss button

---

#### `<Toast />`
**Purpose**: Notification toast

**Props**:
```typescript
{
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Features**:
- Auto-dismiss
- Manual dismiss
- Action button
- Stacking multiple toasts

---

### 11. Profile Components

#### `<ProfileHeader />`
**Purpose**: Profile page header

**Props**:
```typescript
{
  user: User;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onEdit?: () => void;
}
```

**Features**:
- Large avatar
- Username
- Bio (if added)
- Streak badges
- Follow/Edit button
- Follower counts

---

#### `<RepositoryStats />`
**Purpose**: Repository breakdown

**Props**:
```typescript
{
  repositories: Array<{
    name: string;
    commits: number;
    additions: number;
    deletions: number;
  }>;
}
```

**Features**:
- Sorted by commits
- Bar chart
- Clickable repo names
- Expandable list

---

### 12. Utility Components

#### `<InfiniteScroll />`
**Purpose**: Infinite scroll wrapper

**Props**:
```typescript
{
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}
```

**Features**:
- Intersection Observer
- Loading indicator
- End of list message

---

#### `<Skeleton />`
**Purpose**: Loading placeholder

**Props**:
```typescript
{
  variant: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}
```

**Features**:
- Animated shimmer
- Multiple variants
- Responsive

---

## 🎨 Component Patterns

### Composition Pattern

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

### Render Props Pattern

```tsx
<DataFetcher
  url="/api/user"
  render={({ data, loading, error }) => (
    loading ? <Spinner /> :
    error ? <Error error={error} /> :
    <UserProfile user={data} />
  )}
/>
```

### Compound Components

```tsx
<Tabs defaultValue="activity">
  <TabsList>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="summary">Summary</TabsTrigger>
  </TabsList>
  <TabsContent value="activity">
    <ActivityFeed />
  </TabsContent>
  <TabsContent value="summary">
    <DailySummary />
  </TabsContent>
</Tabs>
```

---

## 📦 Component Organization

```
components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── layout/                # Layout components
│   ├── AppLayout.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── user/                  # User-related components
│   ├── UserCard.tsx
│   ├── UserAvatar.tsx
│   ├── StreakBadge.tsx
│   └── ProfileHeader.tsx
├── activity/              # Activity components
│   ├── ActivityCard.tsx
│   ├── ActivityHeatmap.tsx
│   ├── ActivityChart.tsx
│   └── ActivityList.tsx
├── stats/                 # Stats components
│   ├── StatCard.tsx
│   ├── StatsGrid.tsx
│   └── ProgressBar.tsx
├── social/                # Social components
│   ├── FollowButton.tsx
│   ├── FollowerCount.tsx
│   └── SocialProof.tsx
├── feed/                  # Feed components
│   ├── FeedCard.tsx
│   └── DailySummaryCard.tsx
├── search/                # Search components
│   ├── SearchBar.tsx
│   └── SearchResults.tsx
├── leaderboard/           # Leaderboard components
│   ├── LeaderboardTable.tsx
│   └── RankBadge.tsx
└── shared/                # Shared utilities
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    ├── ErrorMessage.tsx
    └── InfiniteScroll.tsx
```

---

This component library provides everything needed for the frontend! 🎨
