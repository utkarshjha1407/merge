# GitHub OAuth Setup Guide

## Configuration Complete ✅

Your backend is now configured for GitHub OAuth authentication on **port 8080**.

## Current Settings

- **Server Port**: 8080
- **OAuth Start URL**: http://localhost:8080/auth/github
- **Callback URL**: http://localhost:8080/auth/github/callback
- **GitHub Client ID**: Ov23liNOSaC7V2wR02wK

## GitHub OAuth App Configuration

Make sure your GitHub OAuth App (https://github.com/settings/developers) has these settings:

1. **Homepage URL**: `http://localhost:8080`
2. **Authorization callback URL**: `http://localhost:8080/auth/github/callback`

## Testing the OAuth Flow

1. Start the server (already running):
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080/auth/github
   ```

3. You'll be redirected to GitHub to authorize the app

4. After authorization, you'll be redirected back to the callback URL

5. The server will return a JSON response with a JWT token:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

## Using the JWT Token

Include the token in your API requests:

```
Authorization: Bearer <your-token-here>
```

## Protected Routes

Use the JWT middleware to protect routes:

```javascript
const authenticateJWT = require('./middleware/jwt.middleware');

router.get('/protected', authenticateJWT, (req, res) => {
  // req.user contains the decoded JWT payload
  res.json({ user: req.user });
});
```

## Troubleshooting

- **"Authentication failed"**: Check that your GitHub OAuth App callback URL matches exactly
- **"Invalid token"**: Make sure you're using the correct JWT_SECRET in .env
- **Database errors**: Ensure PostgreSQL is running and DATABASE_URL is correct
