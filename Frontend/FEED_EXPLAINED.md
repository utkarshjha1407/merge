# Feed Feature - Complete Explanation

## 1️⃣ How the Feed Works (Concept)

### What is the Feed?

The feed is like **Twitter/Instagram for coding activity**. It shows you what the people you follow are coding.

### Two Types of Feeds:

#### **Activity Feed** (Detailed)
Shows individual repository activities from people you follow.

**Example**:
```
┌─────────────────────────────────────────┐
│ [Avatar] John Doe                       │
│ john/awesome-project                    │
│ 5 commits • 2 hours ago                 │
│ +150 additions, -30 deletions           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [Avatar] Jane Smith                     │
│ jane/cool-app                           │
│ 3 commits • 5 hours ago                 │
│ +200 additions, -50 deletions           │
└─────────────────────────────────────────┘
```

**What you see**:
- Who committed (user avatar + name)
- Which repository
- How many commits
- How much code changed (additions/deletions)
- When it happened

---

#### **Daily Summary Feed** (Aggregated)
Shows daily totals for each person you follow.

**Example**:
```
┌─────────────────────────────────────────┐
│ [Avatar] John Doe                       │
│ February 8, 2024                        │
│ 🔥 Streak: 5 days                      │
│ 15 commits • +500 additions • -100 del  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [Avatar] Jane Smith                     │
│ February 8, 2024                        │
│ 🔥 Streak: 10 days                     │
│ 8 commits • +300 additions • -50 del    │
└─────────────────────────────────────────┘
```

**What you see**:
- Who was active
- What date
- Their current streak
- Total commits for that day
- Total code changes

---

### How It Populates:

```
Step 1: You follow users
   ↓
Step 2: Those users sync their GitHub activity
   ↓
Step 3: Their activities appear in your feed
   ↓
Step 4: You see what they're working on!
```

### Real-World Example:

**Scenario**: You follow 3 friends who are developers

1. **Friend A** pushes 5 commits to their React project
2. **Friend B** pushes 3 commits to their Python API
3. **Friend C** pushes 10 commits to their mobile app

**Your Feed Shows**:
```
Activity Feed:
- Friend C: mobile-app (10 commits) - 1 hour ago
- Friend A: react-project (5 commits) - 3 hours ago
- Friend B: python-api (3 commits) - 5 hours ago

Daily Summary:
- Friend C: 10 commits today (streak: 15 days)
- Friend A: 5 commits today (streak: 3 days)
- Friend B: 3 commits today (streak: 7 days)
```

---

## 2️⃣ Feed API Endpoints (Backend)

### Endpoint 1: Activity Feed

```http
GET /api/feed?limit=50
Authorization: Bearer <token>
```

**What it does**:
1. Gets list of users you follow
2. Fetches their recent activities (commits)
3. Sorts by date (newest first)
4. Returns up to 50 activities

**Backend Logic**:
```javascript
// Simplified version
async getSocialFeed(userId, limit) {
  // 1. Get who you follow
  const following = await getFollowing(userId);
  const followingIds = following.map(f => f.id);
  
  // 2. Get their activities
  const activities = await Activity.findMany({
    where: { userId: { in: followingIds } },
    orderBy: { activityDate: 'desc' },
    limit: limit,
    include: { user: true } // Include user info
  });
  
  // 3. Return formatted data
  return activities;
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "abc123",
        "user": {
          "id": "user1",
          "username": "johndoe",
          "avatarUrl": "https://..."
        },
        "repoName": "johndoe/awesome-project",
        "date": "2024-02-08T10:30:00Z",
        "commits": 5,
        "additions": 150,
        "deletions": 30
      },
      {
        "id": "def456",
        "user": {
          "id": "user2",
          "username": "janesmith",
          "avatarUrl": "https://..."
        },
        "repoName": "janesmith/cool-app",
        "date": "2024-02-08T08:15:00Z",
        "commits": 3,
        "additions": 200,
        "deletions": 50
      }
    ]
  }
}
```

---

### Endpoint 2: Daily Summary Feed

```http
GET /api/feed/daily?days=7
Authorization: Bearer <token>
```

**What it does**:
1. Gets list of users you follow
2. Fetches their daily stats (aggregated)
3. Returns last 7 days of summaries
4. Sorted by date (newest first)

**Backend Logic**:
```javascript
// Simplified version
async getDailySummaryFeed(userId, days) {
  // 1. Get who you follow
  const following = await getFollowing(userId);
  const followingIds = following.map(f => f.id);
  
  // 2. Calculate date range
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // 3. Get daily stats
  const dailyStats = await DailyStat.findMany({
    where: {
      userId: { in: followingIds },
      statDate: { gte: startDate }
    },
    orderBy: { statDate: 'desc' },
    include: { user: true }
  });
  
  // 4. Return formatted data
  return dailyStats;
}
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "summaries": [
      {
        "user": {
          "id": "user1",
          "username": "johndoe",
          "avatarUrl": "https://...",
          "currentStreak": 5
        },
        "date": "2024-02-08T00:00:00Z",
        "commits": 15,
        "additions": 500,
        "deletions": 100
      },
      {
        "user": {
          "id": "user2",
          "username": "janesmith",
          "avatarUrl": "https://...",
          "currentStreak": 10
        },
        "date": "2024-02-08T00:00:00Z",
        "commits": 8,
        "additions": 300,
        "deletions": 50
      }
    ]
  }
}
```

---

### Endpoint 3: Trending Users

```http
GET /api/feed/trending?limit=20
Authorization: Bearer <token>
```

**What it does**:
1. Finds most active users in last 7 days
2. Ranks by total commits
3. Returns top 20

**Response Example**:
```json
{
  "success": true,
  "data": {
    "trending": [
      {
        "rank": 1,
        "id": "user1",
        "username": "superdev",
        "avatarUrl": "https://...",
        "currentStreak": 30,
        "recentCommits": 150
      }
    ]
  }
}
```

---

## 3️⃣ Feed UI/UX (Frontend)

### Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                      Navbar                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Activity Feed] [Daily Summary] [Trending]     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Avatar] John Doe                              │   │
│  │  johndoe/awesome-project                        │   │
│  │  5 commits • 2 hours ago                        │   │
│  │  +150 additions, -30 deletions                  │   │
│  │  [View on GitHub →]                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Avatar] Jane Smith                            │   │
│  │  janesmith/cool-app                             │   │
│  │  3 commits • 5 hours ago                        │   │
│  │  +200 additions, -50 deletions                  │   │
│  │  [View on GitHub →]                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Load More...]                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Component Breakdown

#### 1. **Feed Tabs Component**

```tsx
<Tabs defaultValue="activity">
  <TabsList>
    <TabsTrigger value="activity">
      Activity Feed
    </TabsTrigger>
    <TabsTrigger value="daily">
      Daily Summary
    </TabsTrigger>
    <TabsTrigger value="trending">
      Trending
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="activity">
    <ActivityFeed />
  </TabsContent>
  
  <TabsContent value="daily">
    <DailySummaryFeed />
  </TabsContent>
  
  <TabsContent value="trending">
    <TrendingUsers />
  </TabsContent>
</Tabs>
```

---

#### 2. **Activity Feed Card**

```tsx
<Card className="hover:shadow-lg transition">
  {/* User Info */}
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarImage src={user.avatarUrl} />
      <AvatarFallback>{user.username[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{user.username}</p>
      <p className="text-sm text-gray-500">{timeAgo}</p>
    </div>
  </div>
  
  {/* Repository */}
  <div className="mt-3">
    <a href={githubUrl} className="text-blue-500 hover:underline">
      {repoName}
    </a>
  </div>
  
  {/* Stats */}
  <div className="flex gap-4 mt-2 text-sm">
    <span>📝 {commits} commits</span>
    <span className="text-green-600">+{additions}</span>
    <span className="text-red-600">-{deletions}</span>
  </div>
</Card>
```

**Visual Example**:
```
┌─────────────────────────────────────────┐
│ [👤] John Doe          2 hours ago      │
│                                         │
│ johndoe/awesome-project                 │
│                                         │
│ 📝 5 commits  +150  -30                │
└─────────────────────────────────────────┘
```

---

#### 3. **Daily Summary Card**

```tsx
<Card>
  {/* User Info */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Avatar src={user.avatarUrl} />
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <Badge>🔥 {streak} day streak</Badge>
  </div>
  
  {/* Daily Stats */}
  <div className="grid grid-cols-3 gap-4 mt-4">
    <StatBox label="Commits" value={commits} />
    <StatBox label="Added" value={additions} color="green" />
    <StatBox label="Deleted" value={deletions} color="red" />
  </div>
</Card>
```

**Visual Example**:
```
┌─────────────────────────────────────────┐
│ [👤] John Doe          🔥 5 day streak  │
│      February 8, 2024                   │
│                                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │Commits  │ │ Added   │ │Deleted  │   │
│ │   15    │ │  +500   │ │  -100   │   │
│ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

---

### User Interactions

#### **Empty State** (No Following)
```
┌─────────────────────────────────────────┐
│                                         │
│         👥                              │
│                                         │
│    Your feed is empty!                  │
│                                         │
│    Follow users to see their activity   │
│                                         │
│    [Discover Users]                     │
│                                         │
└─────────────────────────────────────────┘
```

#### **Loading State**
```
┌─────────────────────────────────────────┐
│ [Skeleton Avatar] [Skeleton Text]      │
│ [Skeleton Line]                         │
│ [Skeleton Stats]                        │
└─────────────────────────────────────────┘
```

#### **Infinite Scroll**
- Load 20 items initially
- When user scrolls to bottom
- Load 20 more items
- Show loading spinner
- Continue until no more data

---

### Data Flow (Frontend)

```typescript
// 1. Component mounts
useEffect(() => {
  fetchFeed();
}, []);

// 2. Fetch data with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['feed', 'activity'],
  queryFn: () => api.getFeed({ limit: 20 }),
  staleTime: 2 * 60 * 1000, // 2 minutes
});

// 3. Display data
if (isLoading) return <LoadingSkeleton />;
if (error) return <ErrorMessage />;
if (data.activities.length === 0) return <EmptyState />;

return (
  <div>
    {data.activities.map(activity => (
      <ActivityCard key={activity.id} activity={activity} />
    ))}
  </div>
);
```

---

## 🔄 Complete Flow Example

### Scenario: You follow 2 friends

**Step 1: Follow Users**
```
You → Click "Follow" on John's profile
You → Click "Follow" on Jane's profile
```

**Step 2: They Code**
```
John → Pushes 5 commits to awesome-project
Jane → Pushes 3 commits to cool-app
```

**Step 3: They Sync**
```
John → Clicks "Sync GitHub Activity"
Jane → Clicks "Sync GitHub Activity"
```

**Step 4: Data Stored**
```
Database:
- Activity: John, awesome-project, 5 commits, +150/-30
- Activity: Jane, cool-app, 3 commits, +200/-50
- DailyStat: John, Feb 8, 5 commits total
- DailyStat: Jane, Feb 8, 3 commits total
```

**Step 5: You View Feed**
```
You → Navigate to /feed
Frontend → Calls GET /api/feed
Backend → Finds you follow John & Jane
Backend → Gets their activities
Backend → Returns data
Frontend → Displays cards
```

**Step 6: You See**
```
Activity Feed:
┌─────────────────────────────────────────┐
│ [👤] John Doe          2 hours ago      │
│ awesome-project                         │
│ 📝 5 commits  +150  -30                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [👤] Jane Smith        5 hours ago      │
│ cool-app                                │
│ 📝 3 commits  +200  -50                │
└─────────────────────────────────────────┘
```

---

## 🎯 Key Points

### Backend:
- ✅ Feed shows activities from users you follow
- ✅ Two types: detailed activities & daily summaries
- ✅ Data comes from Activity and DailyStat tables
- ✅ Sorted by date (newest first)
- ✅ Includes user info with each activity

### Frontend:
- ✅ Tabs to switch between feed types
- ✅ Cards for each activity/summary
- ✅ Infinite scroll for more data
- ✅ Empty state when not following anyone
- ✅ Loading skeletons while fetching

### User Experience:
- ✅ Like Twitter/Instagram but for code
- ✅ See what friends are working on
- ✅ Get inspired by their activity
- ✅ Discover new projects
- ✅ Stay motivated to code

---

## 💡 Think of it like this:

**Twitter**: You follow people → See their tweets  
**Instagram**: You follow people → See their photos  
**Strava for Coders**: You follow developers → See their commits  

It's a **social network for coding activity**! 🚀

---

Does this clarify everything about the feed? Any other questions? 😊
