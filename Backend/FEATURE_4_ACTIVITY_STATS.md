# Feature 4: Activity Stats Endpoints

## Overview
Comprehensive statistics and analytics for user activity, repositories, and trends.

## Architecture Flow
```
Controller → Service → Repository → Database
```

## Endpoints

### 1. Get Activity Statistics
```
GET /api/stats/activity?days=30
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "period": {
      "days": 30,
      "activeDays": 22,
      "inactiveDays": 8
    },
    "periodStats": {
      "commits": 150,
      "additions": 5000,
      "deletions": 1200
    },
    "totalStats": {
      "totalCommits": 450,
      "totalAdditions": 15000,
      "totalDeletions": 3500
    },
    "averages": {
      "commitsPerDay": 7,
      "additionsPerDay": 227,
      "deletionsPerDay": 54
    },
    "streak": {
      "current": 5,
      "longest": 15
    }
  }
}
```

### 2. Get Repository Statistics
```
GET /api/stats/repositories?days=30
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRepositories": 5,
    "repositories": [
      {
        "repoName": "user/project-a",
        "commits": 50,
        "additions": 2000,
        "deletions": 500,
        "lastActivity": "2024-02-08T00:00:00.000Z"
      }
    ]
  }
}
```

### 3. Get Activity Heatmap
```
GET /api/stats/heatmap?days=365
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "days": 365,
    "data": [
      {
        "date": "2024-02-08",
        "count": 10,
        "level": 3
      }
    ]
  }
}
```

**Activity Levels:**
- 0: No activity
- 1: 1-3 commits
- 2: 4-6 commits
- 3: 7-10 commits
- 4: 11+ commits

### 4. Get Weekly Summary
```
GET /api/stats/weekly
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "weeks": [
      {
        "weekNumber": 1,
        "startDate": "2024-02-02T00:00:00.000Z",
        "endDate": "2024-02-08T00:00:00.000Z",
        "activeDays": 5,
        "commits": 35,
        "additions": 1200,
        "deletions": 300
      }
    ]
  }
}
```

## Use Cases

### Dashboard Overview
```bash
# Get comprehensive stats for last 30 days
GET /api/stats/activity?days=30
```

### Repository Insights
```bash
# See which repos you're most active in
GET /api/stats/repositories?days=90
```

### Contribution Graph
```bash
# Get year-long heatmap data
GET /api/stats/heatmap?days=365
```

### Weekly Progress
```bash
# Track last 4 weeks
GET /api/stats/weekly
```

## Testing

```bash
TOKEN="your-jwt-token"

# Activity stats
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/stats/activity?days=30"

# Repository stats
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/stats/repositories?days=30"

# Heatmap data
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/stats/heatmap?days=365"

# Weekly summary
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/stats/weekly
```

## All Features Complete! 🎉

1. ✅ GitHub Activity Fetching
2. ✅ Streak Calculation Logic
3. ✅ Follow/Unfollow Functionality
4. ✅ Activity Stats Endpoints
