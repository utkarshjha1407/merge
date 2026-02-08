# Manual Testing Guide - Single User Flow

## Prerequisites
- Server running on http://localhost:8080
- Browser for OAuth
- PowerShell or cURL for API testing

---

## Step 1: Login with GitHub OAuth

### Browser Method:
1. Open: `http://localhost:8080/auth/github`
2. Click "Authorize" on GitHub
3. You'll be redirected to callback with JSON response
4. **Copy the `token` value** - you'll need it for all other requests

**Example Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "abc-123",
    "username": "your-github-username",
    "avatarUrl": "https://avatars.githubusercontent.com/..."
  }
}
```

---

## Step 2: Test User Profile

### PowerShell:
```powershell
$TOKEN = "your-token-here"
$headers = @{ "Authorization" = "Bearer $TOKEN" }

Invoke-RestMethod -Uri "http://localhost:8080/api/user/me" -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/user/me
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc-123",
    "username": "your-username",
    "avatarUrl": "https://...",
    "currentStreak": 0,
    "longestStreak": 0,
    "followersCount": 0,
    "followingCount": 0,
    "totalActivities": 0,
    "totalCommits": 0,
    "totalAdditions": 0,
    "totalDeletions": 0
  }
}
```

---

## Step 3: Sync GitHub Activity

This fetches your last 30 days of commits from GitHub.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/github/sync" `
  -Headers $headers -Method Post
```

### cURL:
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/github/sync
```

**Expected Response:**
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

**Note:** This may take 10-30 seconds depending on your activity.

---

## Step 4: Calculate Streak

After syncing, calculate your commit streak.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/streak/calculate" `
  -Headers $headers -Method Post
```

### cURL:
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/streak/calculate
```

**Expected Response:**
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

---

## Step 5: View Dashboard

Get your activity dashboard for the last 7 days.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/user/dashboard?days=7" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8080/api/user/dashboard?days=7"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "username": "your-username",
      "avatarUrl": "https://...",
      "currentStreak": 5,
      "longestStreak": 15
    },
    "period": {
      "days": 7,
      "activeDays": 5
    },
    "totals": {
      "totalCommits": 35,
      "totalAdditions": 1200,
      "totalDeletions": 300
    },
    "averages": {
      "commitsPerDay": 7
    },
    "dailyStats": [...]
  }
}
```

---

## Step 6: View Activity Statistics

Get comprehensive stats for the last 30 days.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/stats/activity?days=30" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8080/api/stats/activity?days=30"
```

---

## Step 7: View Repository Statistics

See which repositories you're most active in.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/stats/repositories?days=30" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8080/api/stats/repositories?days=30"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalRepositories": 3,
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

---

## Step 8: View Recent Activities

Get your last 10 activities.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/user/activities?limit=10" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8080/api/user/activities?limit=10"
```

---

## Step 9: Get Weekly Summary

View last 4 weeks breakdown.

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/stats/weekly" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/stats/weekly
```

---

## Step 10: Get Activity Heatmap

Get year-long heatmap data (like GitHub's contribution graph).

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/stats/heatmap?days=365" `
  -Headers $headers
```

### cURL:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8080/api/stats/heatmap?days=365"
```

---

## Automated Testing

Run the PowerShell test script:

```powershell
cd Backend
.\test-user-flow.ps1
```

This will test all endpoints automatically and show results.

---

## Troubleshooting

### "No token provided" or 401 errors
- Make sure you copied the full token
- Token format: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Token expires after 24 hours (default)

### "GitHub activity synced successfully" but 0 activities
- You might not have any commits in the last 30 days
- Try: `POST /api/github/fetch` with `{"days": 90}`

### Streak is 0 after calculation
- You need at least 1 commit today or yesterday for active streak
- Longest streak will show your historical best

### Rate limit errors
- GitHub API: 5000 requests/hour
- Wait a few minutes and try again
- Sync once per day to avoid limits

---

## Next Steps

After testing:
1. ✅ All endpoints working
2. ✅ Data is being stored
3. ✅ Streaks are calculating
4. 🚀 Ready to build frontend!

See [COMPLETE_API_REFERENCE.md](./COMPLETE_API_REFERENCE.md) for full API documentation.
