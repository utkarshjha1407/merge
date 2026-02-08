# Feature 2: Streak Calculation Logic

## Overview
Calculates user's current and longest commit streaks based on daily activity.

## Architecture Flow
```
Controller → Service → Repository → Database
```

## Endpoints

### 1. Get Streak Details
```
GET /api/streak
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "username": "johndoe",
      "avatarUrl": "https://..."
    },
    "streak": {
      "current": 5,
      "longest": 15,
      "isActive": true,
      "lastActivityDate": "2024-02-08T00:00:00.000Z"
    },
    "recentActivity": [
      {
        "date": "2024-02-08T00:00:00.000Z",
        "commits": 10,
        "hasActivity": true
      }
    ]
  }
}
```

### 2. Recalculate Streak
```
POST /api/streak/calculate
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Streak calculated and updated",
  "data": {
    "currentStreak": 5,
    "longestStreak": 15,
    "lastActivityDate": "2024-02-08T00:00:00.000Z",
    "isStreakActive": true
  }
}
```

## Streak Logic

### Current Streak
- Counts consecutive days with at least 1 commit
- Must include today OR yesterday to be active
- Resets to 0 if no activity for 2+ days

### Longest Streak
- Tracks the maximum consecutive days ever achieved
- Never decreases (historical record)
- Updates when current streak exceeds it

### Algorithm
1. Fetch all daily stats with commits > 0
2. Sort by date ascending
3. Iterate through dates:
   - If consecutive (diff = 1 day): increment streak
   - If gap (diff > 1 day): reset streak, save longest
4. Check if last activity was today/yesterday
   - Yes: current streak is active
   - No: current streak = 0

## Database Updates

### User Table
- `currentStreak`: Active streak count
- `longestStreak`: Historical maximum

### DailyStat Table
- Used to determine activity days
- Only days with `totalCommits > 0` count

## Use Cases

1. **After GitHub Sync**
   ```bash
   # Sync activity
   POST /api/github/sync
   
   # Recalculate streak
   POST /api/streak/calculate
   ```

2. **Dashboard Display**
   ```bash
   # Get streak with recent activity
   GET /api/streak
   ```

3. **Automated Updates**
   - Run streak calculation after each GitHub sync
   - Schedule daily recalculation via cron

## Testing

```bash
TOKEN="your-jwt-token"

# Get current streak
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/streak

# Recalculate streak
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/streak/calculate
```

## Next Feature
Feature 3: Follow/Unfollow Functionality
