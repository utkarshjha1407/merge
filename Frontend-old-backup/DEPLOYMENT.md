# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Backend deployed and running
- GitHub OAuth app configured for production URLs

## Environment Variables

Create `.env.local` for production:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Build for Production

```bash
cd Frontend
npm run build
```

This creates an optimized production build in `.next/` folder.

## Test Production Build Locally

```bash
npm run start
```

Visit http://localhost:3000 to test the production build.

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts to link project
4. Set environment variables in Vercel dashboard
5. Deploy to production:
```bash
vercel --prod
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 3: Docker

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. Build image:
```bash
docker build -t codestreak-frontend .
```

3. Run container:
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-backend-url.com codestreak-frontend
```

### Option 4: Static Export (if no server-side features needed)

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. Build:
```bash
npm run build
```

3. Deploy the `out/` folder to any static hosting (Netlify, Vercel, S3, etc.)

## Post-Deployment Checklist

- [ ] Update GitHub OAuth callback URL to production URL
- [ ] Set NEXT_PUBLIC_API_URL to production backend
- [ ] Test OAuth flow in production
- [ ] Test all API endpoints work
- [ ] Verify CORS is configured on backend
- [ ] Test on mobile devices
- [ ] Check performance with Lighthouse
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up analytics (if needed)
- [ ] Configure custom domain (if needed)
- [ ] Set up SSL certificate
- [ ] Test all features in production

## Backend Configuration

Make sure your backend has:

1. CORS configured for your frontend URL:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.com',
  credentials: true
}));
```

2. GitHub OAuth callback URL updated:
```
https://your-backend-url.com/auth/github/callback
```

3. Environment variables set:
```env
FRONTEND_URL=https://your-frontend-url.com
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret
```

## Monitoring

After deployment, monitor:
- API response times
- Error rates
- User authentication success rate
- Page load times
- Core Web Vitals

## Rollback Plan

If issues occur:
1. Revert to previous deployment in hosting platform
2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

## Performance Optimization

- Enable compression (gzip/brotli)
- Use CDN for static assets
- Enable caching headers
- Optimize images
- Lazy load components
- Code splitting (Next.js does this automatically)

## Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys not exposed in client code
- [ ] Rate limiting on backend
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
