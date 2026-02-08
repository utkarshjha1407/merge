# Complete API Reference - Strava for Coders

Base URL: `http://localhost:8080`

## Table of Contents
1. [Authentication](#authentication)
2. [User Endpoints](#user-endpoints)
3. [GitHub Sync](#github-sync)
4. [Streak](#streak)
5. [Follow/Unfollow](#followunfollow)
6. [Statistics](#statistics)

---

## Authentication

### GitHub OAuth Login
```
GET /auth/github
```
Redirects to GitHub for OAuth authorization.

### OAuth Callback
```
GET /auth/github/callback
```
Returns JWT token after successful authentication.

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "avatarUrl": "https://..."
  }
}
```

---

## User Endpoints

All endpoints require: `Authorization: Bearer <token>`

### Get Current User Profile
```
GET /api/user/me
```

### Get Dashboard
```
GET /api/user/dashboard?days=30
```

### Get Recent Activities
```
GET /api/user/activities?limit=20
```

---

## GitHub Sync

### Sync Activity (Last 30 Days)
```
POST /api/github/sync
```

### Fetch Custom Date Range
```
POST /api/github/fetch
Content-Type: application/json

{
  "days": 7
}
```

---

## Streak

### Get Streak Details
```
GET /api/streak
```

### Recalculate Streak
```
POST /api/streak/calculate
```

---

## Follow/Unfollow

### Follow User
```
POST /api/follow/:userId
```

### Unfollow User
```
DELETE /api/follow/:userId
```

### Get Followers
```
GET /api/follow/followers?limit=50
```

### Get Following
```
GET /api/follow/following?limit=50
```

### Check Follow Status
```
GET /api/follow/status/:userId
```

---

## Statistics

### Activity Statistics
```
GET /api/stats/activity?days=30
```

### Repository Statistics
```
GET /api/stats/repositories?days=30
```

### Activity Heatmap
```
GET /api/stats/heatmap?days=365
```

### Weekly Summary
```
GET /api/stats/weekly
```

---

## Complete Workflow Example

```bash
# 1. Login via GitHub OAuth (browser)
open http://localhost:8080/auth/github

# 2. Copy the token from response
TOKEN="your-jwt-token-here"

# 3. Sync GitHub activity
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/github/sync

# 4. Calculate streak
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/streak/calculate

# 5. View dashboard
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/user/dashboard?days=30

# 6. View statistics
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/stats/activity?days=30

# 7. Follow a user
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/USER_ID

# 8. View followers
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/followers
```

---

## Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Routes    │ (Express Router)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controllers │ (Request/Response)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Services   │ (Business Logic)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Repositories │ (Data Access)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │ (PostgreSQL + Prisma)
└─────────────┘
```

---

## Error Handling

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Status Codes:**
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

---

## Rate Limiting

- GitHub API: 5000 requests/hour (authenticated)
- Recommended: Sync once per day
- Use cron jobs for automated syncing

---

## Next Steps

1. Set up automated GitHub syncing (cron job)
2. Build frontend application
3. Add real-time notifications
4. Implement leaderboards
5. Add more social features
