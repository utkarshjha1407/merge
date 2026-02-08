# Feature 1: GitHub Activity Fetching

## Overview
Fetches user's commit activity from GitHub API and stores it in the database.

## Architecture Flow
```
Controller → Service → GitHub API → Repository → Database
```

## Endpoints

### 1. Sync Activity (Last 30 Days)
```
POST /api/github/sync
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "GitHub activity synced successfully",
  "data": {
    "fetched": 15,
    "saved": 15,
    "activities": [...]
  }
}
```

### 2. Fetch Custom Date Range
```
POST /api/github/fetch
Authorization: Bearer <token>
Content-Type: application/json

{
  "days": 7
}
```

**Response:**
```json
{
  "success": true,
  "message": "Fetched activity for last 7 days",
  "data": {
    "fetched": 8,
    "saved": 8,
    "activities": [...]
  }
}
```

## What It Does

1. **Fetches GitHub Events**
   - Uses user's GitHub access token
   - Retrieves PushEvents from GitHub API
   - Filters events within specified date range

2. **Processes Commits**
   - Extracts commit details (SHA, message)
   - Fetches additions/deletions for each commit
   - Groups by repository and date

3. **Stores in Database**
   - Creates/updates Activity records
   - Handles duplicate activities (upserts)
   - Maintains unique constraint: [userId, repoName, activityDate]

4. **Updates Daily Stats**
   - Aggregates activities by date
   - Updates DailyStat records
   - Calculates totals: commits, additions, deletions

## Database Updates

### Activity Table
- Stores individual repository activities per day
- Fields: repoName, activityDate, commitCount, additions, deletions

### DailyStat Table
- Aggregated stats per day across all repos
- Fields: statDate, totalCommits, totalAdditions, totalDeletions

## Rate Limiting
- GitHub API: 5000 requests/hour (authenticated)
- Limits commit detail fetching to 5 commits per push event
- Recommended: Sync once per day via cron job

## Testing

```bash
# Get your JWT token first from OAuth
TOKEN="your-jwt-token"

# Sync last 30 days
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/github/sync

# Fetch last 7 days
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"days": 7}' \
  http://localhost:8080/api/github/fetch
```

## Next Steps
After syncing activity, you can:
- View dashboard stats: `GET /api/user/dashboard`
- View activities: `GET /api/user/activities`
- Calculate streaks (Feature 2)
