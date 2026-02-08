# Feature 3: Follow/Unfollow Functionality

## Overview
Social features allowing users to follow/unfollow each other and view their networks.

## Architecture Flow
```
Controller → Service → Repository → Database
```

## Endpoints

### 1. Follow a User
```
POST /api/follow/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Now following johndoe",
    "following": {
      "id": "uuid",
      "username": "johndoe",
      "avatarUrl": "https://..."
    }
  }
}
```

### 2. Unfollow a User
```
DELETE /api/follow/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Unfollowed johndoe"
  }
}
```

### 3. Get Followers
```
GET /api/follow/followers?limit=50
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 10,
    "followers": [
      {
        "id": "uuid",
        "username": "johndoe",
        "avatarUrl": "https://...",
        "currentStreak": 5,
        "longestStreak": 15,
        "followedAt": "2024-02-01T00:00:00.000Z"
      }
    ]
  }
}
```

### 4. Get Following
```
GET /api/follow/following?limit=50
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 8,
    "following": [
      {
        "id": "uuid",
        "username": "janedoe",
        "avatarUrl": "https://...",
        "currentStreak": 10,
        "longestStreak": 20,
        "followedAt": "2024-01-15T00:00:00.000Z"
      }
    ]
  }
}
```

### 5. Check Follow Status
```
GET /api/follow/status/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isFollowing": true
  }
}
```

## Business Rules

1. **Cannot follow yourself**
2. **Cannot follow same user twice**
3. **Must unfollow before following again**
4. **Both users must exist**

## Database Schema

### Follow Table
- Composite Primary Key: `[followerId, followingId]`
- Relations:
  - `follower` → User (who is following)
  - `following` → User (who is being followed)
- Cascade delete when user is deleted

## Testing

```bash
TOKEN="your-jwt-token"
USER_ID="target-user-id"

# Follow a user
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/$USER_ID

# Check if following
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/status/$USER_ID

# Get your followers
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/followers

# Get who you're following
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/following

# Unfollow a user
curl -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/follow/$USER_ID
```

## Next Feature
Feature 4: Activity Stats Endpoints
