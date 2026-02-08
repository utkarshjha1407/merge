# Testing the API

## 1. Check if server is running

Open in browser: `http://localhost:8080/`

You should see:
```json
{
  "message": "Strava for Coders API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

## 2. Check health endpoint

Open in browser: `http://localhost:8080/health`

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-02-08T..."
}
```

## 3. Test GitHub OAuth

### Step 1: Start OAuth Flow
Open in browser: `http://localhost:8080/auth/github`

This will redirect you to GitHub to authorize the app.

### Step 2: After Authorization
GitHub will redirect back to: `http://localhost:8080/auth/github/callback?code=...`

You should receive:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "your-github-username",
    "avatarUrl": "https://..."
  }
}
```

**Copy the token value!**

## 4. Test Protected Endpoints

### Using Browser (won't work - needs Authorization header)
If you try: `http://localhost:8080/api/user/me`

You'll get:
```json
{
  "error": "No token provided"
}
```

### Using cURL (works!)

Replace `YOUR_TOKEN_HERE` with the token from step 3:

```bash
# Get user profile
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:8080/api/user/me

# Get dashboard
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:8080/api/user/dashboard?days=7

# Get activities
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:8080/api/user/activities?limit=10
```

## 5. Common Issues

### "Cannot GET /"
- Server might not be running
- Check: `npm run dev` in Backend folder

### "Authentication failed" during OAuth
- Check GitHub OAuth App settings at: https://github.com/settings/developers
- Homepage URL should be: `http://localhost:8080`
- Callback URL should be: `http://localhost:8080/auth/github/callback`

### "No token provided" or 401 errors
- You need to include the JWT token in the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`
- Can't test protected endpoints directly in browser without extensions

## 6. Recommended Tools

- **Postman** or **Insomnia** - GUI for testing APIs
- **Thunder Client** (VS Code extension) - Test APIs in VS Code
- **cURL** - Command line tool (already installed on Windows)

## 7. Quick Test Script

Save this as `test-api.sh` (Git Bash on Windows):

```bash
#!/bin/bash

# Step 1: Get token (you need to do OAuth manually first)
TOKEN="paste-your-token-here"

# Step 2: Test endpoints
echo "Testing /api/user/me"
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/me

echo -e "\n\nTesting /api/user/dashboard"
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/dashboard?days=7

echo -e "\n\nTesting /api/user/activities"
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/activities?limit=5
```
