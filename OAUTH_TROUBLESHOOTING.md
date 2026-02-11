# GitHub OAuth Troubleshooting Guide

## Quick Fixes Applied

### 1. ✅ CORS Configuration Fixed
Updated `Backend/src/app.js` to properly use CORS_ORIGIN from .env:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

### 2. ✅ Backend Restarted
Backend is now running on port 8080 with proper CORS settings.

### 3. ✅ Debug Page Added
Created `/test-auth` page to help diagnose OAuth issues.

### 4. ✅ Better Error Handling
Updated AuthCallback page to show detailed error messages.

## How to Test OAuth

### Method 1: Use the Debug Page
1. Go to: http://localhost:3000/test-auth
2. Click "Check Environment Variables" - verify VITE_API_URL is set
3. Click "Check Backend Connection" - verify backend is reachable
4. Click "Test Direct Auth" - this will start the OAuth flow

### Method 2: Normal Login Flow
1. Go to: http://localhost:3000
2. Click "Login with GitHub"
3. Authorize the app on GitHub
4. You should be redirected back to the dashboard

## Common Issues & Solutions

### Issue 1: "Redirect URI mismatch" on GitHub
**Symptom:** GitHub shows an error about redirect URI not matching

**Solution:** 
1. Go to your GitHub OAuth App settings: https://github.com/settings/developers
2. Find your app (Client ID: Ov23liNOSaC7V2wR02wK)
3. Set "Authorization callback URL" to: `http://localhost:8080/auth/github/callback`
4. Save changes

### Issue 2: Backend not responding
**Symptom:** Login button does nothing or shows network error

**Solution:**
```bash
# Check if backend is running
curl http://localhost:8080/auth/github

# If not running, start it:
cd Backend
npm start
```

### Issue 3: CORS errors in browser console
**Symptom:** Browser console shows "CORS policy" errors

**Solution:** Already fixed! Backend now properly configured with CORS.

### Issue 4: "No token received" error
**Symptom:** After GitHub auth, you see "No token received from authentication"

**Possible causes:**
1. Backend failed to generate JWT
2. GitHub OAuth app credentials are invalid
3. Database connection failed

**Solution:**
1. Check backend logs for errors
2. Verify GitHub credentials in `Backend/.env`
3. Test database connection: `cd Backend && npx prisma studio`

### Issue 5: Token received but still not logged in
**Symptom:** Redirected to callback page but then back to login

**Solution:**
1. Open browser DevTools → Application → Local Storage
2. Check if `auth_token` is stored
3. If not, check browser console for errors
4. Try clearing localStorage and login again

## Verify Your Setup

### Backend (.env)
```env
GITHUB_CLIENT_ID=Ov23liNOSaC7V2wR02wK
GITHUB_CLIENT_SECRET=1e1833284bed7d75774d93de97bb1dde994a2bd1
GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
```

### GitHub OAuth App Settings
- **Application name:** Your app name
- **Homepage URL:** http://localhost:3000
- **Authorization callback URL:** http://localhost:8080/auth/github/callback
- **Client ID:** Ov23liNOSaC7V2wR02wK
- **Client Secret:** (should match Backend/.env)

## OAuth Flow Diagram

```
1. User clicks "Login with GitHub"
   ↓
2. Frontend redirects to: http://localhost:8080/auth/github
   ↓
3. Backend redirects to: https://github.com/login/oauth/authorize?client_id=...
   ↓
4. User authorizes on GitHub
   ↓
5. GitHub redirects to: http://localhost:8080/auth/github/callback?code=...
   ↓
6. Backend exchanges code for access token
   ↓
7. Backend creates/updates user in database
   ↓
8. Backend generates JWT token
   ↓
9. Backend redirects to: http://localhost:3000/auth/callback?token=JWT_TOKEN
   ↓
10. Frontend saves token to localStorage
   ↓
11. Frontend redirects to dashboard
   ↓
12. Dashboard fetches user data using token
```

## Testing Commands

### Test Backend Health
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:8080/auth/github" -Method GET -MaximumRedirection 0

# Should return 302 (redirect to GitHub)
```

### Check Backend Logs
```bash
# In Backend directory
npm start

# Watch for errors during OAuth flow
```

### Check Frontend Environment
```javascript
// In browser console on http://localhost:3000
console.log(import.meta.env.VITE_API_URL);
// Should output: http://localhost:8080
```

### Check Token Storage
```javascript
// In browser console after login
console.log(localStorage.getItem('auth_token'));
// Should show JWT token if logged in
```

## Still Having Issues?

1. **Clear everything and start fresh:**
   ```bash
   # Stop both servers
   # Clear browser localStorage
   # Restart backend
   cd Backend && npm start
   # Restart frontend
   cd Frontend && npm run dev
   ```

2. **Check browser console** for any JavaScript errors

3. **Check backend terminal** for any server errors

4. **Use the debug page** at http://localhost:3000/test-auth

5. **Verify GitHub OAuth app** settings match exactly

## Success Indicators

✅ Backend shows: "🚀 Server is running on port 8080"
✅ Frontend shows: "VITE ready at http://localhost:3000"
✅ Clicking login redirects to GitHub
✅ After GitHub auth, redirected back to dashboard
✅ Dashboard shows your GitHub username and avatar
✅ localStorage has 'auth_token' stored
✅ No CORS errors in browser console

## Need More Help?

If OAuth still isn't working:
1. Go to http://localhost:3000/test-auth
2. Run all the tests
3. Copy the debug logs
4. Check what specific error message you're seeing
5. Look for that error in this guide
