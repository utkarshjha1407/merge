# Strava for Coders - Startup Script
# This script starts all required services

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "  Strava for Coders - Startup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start database
Write-Host "`n[1/3] Starting PostgreSQL database..." -ForegroundColor Green
Set-Location "$scriptPath\Backend"
docker-compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database started successfully" -ForegroundColor Green
    Write-Host "   Waiting for database to be ready..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
} else {
    Write-Host "✗ Failed to start database" -ForegroundColor Red
    Write-Host "  Make sure Docker Desktop is running" -ForegroundColor Yellow
    exit 1
}

# Start backend in new window
Write-Host "`n[2/3] Starting backend server..." -ForegroundColor Green
$backendPath = "$scriptPath\Backend"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$backendPath'; Write-Host 'Starting backend...' -ForegroundColor Cyan; npm start"
)
Write-Host "✓ Backend starting in new window" -ForegroundColor Green
Start-Sleep -Seconds 2

# Start frontend in new window
Write-Host "`n[3/3] Starting frontend..." -ForegroundColor Green
$frontendPath = "$scriptPath\Frontend"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$frontendPath'; Write-Host 'Starting frontend...' -ForegroundColor Cyan; npm run dev"
)
Write-Host "✓ Frontend starting in new window" -ForegroundColor Green

# Summary
Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "  All Services Started!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "`nServices:" -ForegroundColor White
Write-Host "  • Database:  " -NoNewline -ForegroundColor White
Write-Host "localhost:5432" -ForegroundColor Cyan
Write-Host "  • Backend:   " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080" -ForegroundColor Cyan
Write-Host "  • Frontend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan

Write-Host "`nNext Steps:" -ForegroundColor White
Write-Host "  1. Wait 10-15 seconds for all services to start" -ForegroundColor Yellow
Write-Host "  2. Open your browser to: " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host "  3. Click 'Login with GitHub' to test OAuth" -ForegroundColor Yellow

Write-Host "`nTo stop all services:" -ForegroundColor White
Write-Host "  • Close the backend and frontend terminal windows" -ForegroundColor Gray
Write-Host "  • Run: " -NoNewline -ForegroundColor Gray
Write-Host "cd Backend && docker-compose down" -ForegroundColor Cyan

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host ""
