# Simple test script - paste your token below
# Get token from: http://localhost:8080/auth/github

# PASTE YOUR TOKEN HERE (between the quotes):
$TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViZDAwNTBmLTlkMTktNDhhNi1iODUwLWFmZWExNTRkNTRjNyIsInVzZXJuYW1lIjoidXRrYXJzaGpoYTE0MDciLCJpYXQiOjE3NzA1MzczODgsImV4cCI6MTc3MDYyMzc4OH0.HzI9zbyBce-q3EJfQavM-6cP0p94fVOu5IsNV5IXmBc"

if ([string]::IsNullOrWhiteSpace($TOKEN)) {
    Write-Host "❌ No token found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Open: http://localhost:8080/auth/github" -ForegroundColor White
    Write-Host "2. Login with GitHub" -ForegroundColor White
    Write-Host "3. Copy the token from the response" -ForegroundColor White
    Write-Host "4. Edit this file and paste token on line 5" -ForegroundColor White
    Write-Host "5. Run this script again" -ForegroundColor White
    exit
}

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "=== Testing API with your token ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Profile
Write-Host "1. Getting profile..." -ForegroundColor Cyan
try {
    $profile = Invoke-RestMethod -Uri "http://localhost:8080/api/user/me" -Headers $headers
    Write-Host "   ✅ User: $($profile.data.username)" -ForegroundColor Green
    Write-Host "   Streak: $($profile.data.currentStreak) | Commits: $($profile.data.totalCommits)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Test 2: Sync
Write-Host ""
Write-Host "2. Syncing GitHub activity (this may take 30 seconds)..." -ForegroundColor Cyan
try {
    $sync = Invoke-RestMethod -Uri "http://localhost:8080/api/github/sync" -Headers $headers -Method Post
    Write-Host "   ✅ Synced $($sync.data.saved) activities" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test 3: Calculate Streak
Write-Host ""
Write-Host "3. Calculating streak..." -ForegroundColor Cyan
try {
    $streak = Invoke-RestMethod -Uri "http://localhost:8080/api/streak/calculate" -Headers $headers -Method Post
    Write-Host "   ✅ Current: $($streak.data.currentStreak) | Longest: $($streak.data.longestStreak)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Dashboard
Write-Host ""
Write-Host "4. Getting dashboard..." -ForegroundColor Cyan
try {
    $dashboard = Invoke-RestMethod -Uri "http://localhost:8080/api/user/dashboard?days=7" -Headers $headers
    Write-Host "   ✅ Active: $($dashboard.data.period.activeDays)/7 days" -ForegroundColor Green
    Write-Host "   Commits: $($dashboard.data.totals.totalCommits)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Stats
Write-Host ""
Write-Host "5. Getting stats..." -ForegroundColor Cyan
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/activity?days=30" -Headers $headers
    Write-Host "   ✅ $($stats.data.period.activeDays) active days" -ForegroundColor Green
    Write-Host "   Commits: $($stats.data.periodStats.commits)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Green
