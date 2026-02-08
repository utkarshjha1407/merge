# API Documentation

Base URL: `http://localhost:8080`

## Authentication

All API endpoints (except auth routes) require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Auth Endpoints

### 1. Initiate GitHub OAuth
```
GET /auth/github
```

Redirects to GitHub for OAuth authorization.

**Scopes**: `user`, `repo`

---

### 2. GitHub OAuth Callback
```
GET /auth/github/callback
```

Handles GitHub OAuth callback and returns JWT token.

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## User Endpoints

### 3. Get Current User Profile
```
GET /api/user/me
```

Returns the authenticated user's profile with stats.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "avatarUrl": "https://avatars.githubusercontent.com/...",
    "currentStreak": 5,
    "longestStreak": 15,
    "followersCount": 10,
    "followingCount": 8,
    "totalActivities": 150,
    "totalCommits": 450,
    "totalAdditions": 12500,
    "totalDeletions": 3200,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Get Dashboard Stats
```
GET /api/user/dashboard?days=30
```

Returns dashboard statistics with daily breakdown.

**Headers**:
- `Authorization: Bearer <token>`

**Query Parameters**:
- `days` (optional): Number of days to include (1-365, default: 30)

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "username": "johndoe",
      "avatarUrl": "https://avatars.githubusercontent.com/...",
      "currentStreak": 5,
      "longestStreak": 15
    },
    "period": {
      "days": 30,
      "activeDays": 22
    },
    "totals": {
      "totalCommits": 150,
      "totalAdditions": 5000,
      "totalDeletions": 1200
    },
    "averages": {
      "commitsPerDay": 7
    },
    "dailyStats": [
      {
        "date": "2024-02-08T00:00:00.000Z",
        "commits": 10,
        "additions": 250,
        "deletions": 50
      }
    ]
  }
}
```

---

### 5. Get Recent Activities
```
GET /api/user/activities?limit=20
```

Returns recent activities for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Query Parameters**:
- `limit` (optional): Number of activities to return (1-100, default: 20)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "repoName": "user/repo-name",
      "date": "2024-02-08T00:00:00.000Z",
      "commits": 5,
      "additions": 150,
      "deletions": 30
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common Status Codes**:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing with cURL

### Get User Profile
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/user/me
```

### Get Dashboard (last 7 days)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/user/dashboard?days=7
```

### Get Recent Activities
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/user/activities?limit=10
```
