# How to Start the Application

## Quick Start (Every Time You Work on the Project)

### 1. Start Database (Required First!)
```bash
cd Backend
docker-compose up -d
```
Wait 3-5 seconds for database to be ready.

### 2. Start Backend
```bash
cd Backend
npm start
```
Should show:
```
✅ Database connected successfully
🚀 Server is running on port 8080
```

### 3. Start Frontend
```bash
cd Frontend
npm run dev
```
Should show:
```
VITE ready at http://localhost:3000
```

### 4. Open Browser
Go to: http://localhost:3000

## One-Command Startup (PowerShell)

Create a file `start-all.ps1` in the root directory:

```powershell
# Start database
Write-Host "Starting database..." -ForegroundColor Green
cd Backend
docker-compose up -d
Start-Sleep -Seconds 3

# Start backend in new window
Write-Host "Starting backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

# Start frontend in new window
Write-Host "Starting frontend..." -ForegroundColor Green
cd ../Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host "`nAll services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8080" -ForegroundColor Cyan
```

Then run:
```bash
./start-all.ps1
```

## Stopping Everything

### Stop Backend & Frontend
Just press `Ctrl+C` in each terminal window.

### Stop Database
```bash
cd Backend
docker-compose down
```

## Checking Status

### Is database running?
```bash
docker ps
```
Should show `strava_postgres` container.

### Is backend running?
```bash
curl http://localhost:8080/auth/github
```
Should redirect (302).

### Is frontend running?
Open http://localhost:3000 in browser.

## Common Issues

### "Can't reach database server"
**Problem:** Database not running
**Solution:**
```bash
cd Backend
docker-compose up -d
```

### "Port 8080 already in use"
**Problem:** Backend already running or another app using port
**Solution:**
```bash
# Find what's using the port
netstat -ano | findstr :8080
# Kill the process or change port in Backend/.env
```

### "Port 3000 already in use"
**Problem:** Frontend already running
**Solution:**
```bash
# Kill the process or change port in Frontend/vite.config.ts
```

### Backend shows database errors
**Problem:** Database not ready yet
**Solution:** Wait 5 seconds after starting database, then start backend

## Development Workflow

### Daily Workflow
1. Start database: `cd Backend && docker-compose up -d`
2. Start backend: `cd Backend && npm start`
3. Start frontend: `cd Frontend && npm run dev`
4. Code and test
5. Stop backend/frontend: `Ctrl+C`
6. (Optional) Stop database: `cd Backend && docker-compose down`

### After Pulling New Code
```bash
# Update dependencies
cd Backend && npm install
cd ../Frontend && npm install

# Update database
cd Backend
npx prisma generate
npx prisma migrate deploy

# Restart servers
```

### After Changing Database Schema
```bash
cd Backend
npx prisma migrate dev --name your_migration_name
npx prisma generate
# Restart backend
```

## Environment Setup (First Time Only)

### Backend Setup
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your values
docker-compose up -d
npx prisma generate
npx prisma migrate deploy
```

### Frontend Setup
```bash
cd Frontend
npm install
# Create .env file
echo "VITE_API_URL=http://localhost:8080" > .env
```

## Useful Commands

### View Database
```bash
cd Backend
npx prisma studio
```
Opens at http://localhost:5555

### Reset Database
```bash
cd Backend
npx prisma migrate reset
```

### Check Database Logs
```bash
docker logs strava_postgres
```

### Restart Database
```bash
cd Backend
docker-compose restart
```

## Production Deployment

For production, you'll need:
1. PostgreSQL database (not Docker)
2. Update environment variables
3. Build frontend: `cd Frontend && npm run build`
4. Serve frontend build files
5. Run backend with PM2 or similar

## Quick Reference

| Service | Command | URL |
|---------|---------|-----|
| Database | `cd Backend && docker-compose up -d` | localhost:5432 |
| Backend | `cd Backend && npm start` | http://localhost:8080 |
| Frontend | `cd Frontend && npm run dev` | http://localhost:3000 |
| DB Studio | `cd Backend && npx prisma studio` | http://localhost:5555 |

## Checklist Before Starting Work

- [ ] Docker Desktop is running
- [ ] Database started: `docker ps` shows strava_postgres
- [ ] Backend started: Terminal shows "Server is running on port 8080"
- [ ] Frontend started: Terminal shows "VITE ready"
- [ ] Browser open at http://localhost:3000

## Need Help?

If something isn't working:
1. Check all three services are running (database, backend, frontend)
2. Check terminal logs for errors
3. Check browser console for errors
4. Refer to DATABASE_FIX.md or OAUTH_TROUBLESHOOTING.md
