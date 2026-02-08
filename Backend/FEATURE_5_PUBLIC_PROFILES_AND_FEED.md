# Feature 5: Public Profiles & Social Feed

## Overview
Public user profiles, user search, leaderboards, and social activity feeds.

## New Endpoints

### Public Profile Endpoints

#### 1. Get Profile by ID
```
GET /api/profile/:userId
```

**Public endpoint** - No authentication required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "avatarUrl": "https://...",
    "currentStreak": 5,
    "longestStreak": 15,
    "followersCount": 10,
    "followingCount": 8,
    "totalActivities": 150,
    "totalCommits": 450,
    "totalAdditions": 12500,
    "totalDeletions": 3200,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "isFollowing": false
  }
}
```

#### 2. Get Profile by Username
```
GET /api/profile/username/:username
```

**Public endpoint** - No authentication required

**Response:** Same as above

#### 3. Search Users
```
GET /api/profile/search?q=john&limit=20
```

**Public endpoint** - No authentication required

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "john",
    "count": 5,
    "users": [
      {
        "id": "uuid",
        "username": "johndoe",
        "avatarUrl": "https://...",
        "currentStreak": 5,
        "longestStreak": 15
      }
    ]
  }
}
```

#### 4. Get Leaderboard
```
GET /api/profile/leaderboard?type=streak&limit=50
```

**Public endpoint** - No authentication required

**Query Parameters:**
- `type`: `streak` or `commits` (default: `streak`)
- `limit`: 1-100 (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "streak",
    "leaderboard": [
      {
        "rank": 1,
        "id": "uuid",
        "username": "topuser",
        "avatarUrl": "https://...",
        "currentStreak": 100,
        "longestStreak": 150,
        "totalCommits": 5000
      }
    ]
  }
}
```

---

### Social Feed Endpoints

#### 1. Get Social Feed
```
GET /api/feed?limit=50
Authorization: Bearer <token>
```

Shows activities from users you follow.

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "username": "johndoe",
          "avatarUrl": "https://..."
        },
        "repoName": "user/repo",
        "date": "2024-02-08T00:00:00.000Z",
        "commits": 5,
        "additions": 150,
        "deletions": 30
      }
    ]
  }
}
```

#### 2. Get Daily Summary Feed
```
GET /api/feed/daily?days=7
Authorization: Bearer <token>
```

Shows daily summaries from users you follow.

**Response:**
```json
{
  "success": true,
  "data": {
    "summaries": [
      {
        "user": {
          "id": "uuid",
          "username": "johndoe",
          "avatarUrl": "https://...",
          "currentStreak": 5
        },
        "date": "2024-02-08T00:00:00.000Z",
        "commits": 10,
        "additions": 250,
        "deletions": 50
      }
    ]
  }
}
```

#### 3. Get Trending Users
```
GET /api/feed/trending?limit=20
Authorization: Bearer <token>
```

Shows most active users in the last 7 days.

**Response:**
```json
{
  "success": true,
  "data": {
    "trending": [
      {
        "rank": 1,
        "id": "uuid",
        "username": "activeuser",
        "avatarUrl": "https://...",
        "currentStreak": 10,
        "recentCommits": 150
      }
    ]
  }
}
```

---

## Use Cases

### 1. View Someone's Profile
```bash
# By username
curl http://localhost:8080/api/profile/username/johndoe

# By ID
curl http://localhost:8080/api/profile/USER_ID
```

### 2. Search for Users
```bash
curl "http://localhost:8080/api/profile/search?q=john&limit=10"
```

### 3. View Leaderboard
```bash
# Top by streak
curl "http://localhost:8080/api/profile/leaderboard?type=streak&limit=50"

# Top by commits
curl "http://localhost:8080/api/profile/leaderboard?type=commits&limit=50"
```

### 4. View Social Feed
```bash
TOKEN="your-token"

# Activity feed
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/feed

# Daily summaries
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/feed/daily?days=7"

# Trending users
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/feed/trending
```

---

## Features

### Public Profiles
- ✅ View any user's profile without authentication
- ✅ See if you're following them (when authenticated)
- ✅ View their stats, streaks, and activity counts
- ✅ Access by username or user ID

### User Discovery
- ✅ Search users by username
- ✅ Case-insensitive search
- ✅ Results sorted by current streak
- ✅ Leaderboards by streak or total commits

### Social Feed
- ✅ See activities from users you follow
- ✅ Daily summaries of followed users
- ✅ Trending users (most active recently)
- ✅ Chronological ordering

---

## Privacy & Security

### Public Data
- Usernames, avatars, streaks, and commit counts are public
- Anyone can view profiles and leaderboards
- No authentication required for public endpoints

### Private Data
- Access tokens are never exposed
- Email addresses (if added) are private
- Social feed requires authentication
- Can only see activities from public repos

---

## Testing

```bash
# Test public profile
curl http://localhost:8080/api/profile/username/utkarshjha1407

# Test search
curl "http://localhost:8080/api/profile/search?q=utkarsh"

# Test leaderboard
curl http://localhost:8080/api/profile/leaderboard

# Test feed (requires token)
TOKEN="your-token"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/feed
```

---

## Complete Feature Set

Now we have:
1. ✅ GitHub Activity Fetching
2. ✅ Streak Calculation
3. ✅ Follow/Unfollow
4. ✅ Activity Stats
5. ✅ **Public Profiles & Social Feed** (NEW!)

All social features are now complete! 🎉
