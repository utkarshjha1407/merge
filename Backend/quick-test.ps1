# Quick Test - Assumes you're already logged in
# If you don't have a token, visit: http://localhost:8080/auth/github

Write-Host "=== Quick API Test ===" -ForegroundColor Cyan
Write-Host ""

# Get token from user
$TOKEN = Read-Host "Paste your JWT token (or press Enter to login first)"

if ([string]::IsNullOrWhiteSpace($TOKEN)) {
    Write-Host ""
    Write-Host "Opening browser for GitHub OAuth..." -ForegroundColor Yellow
    Start-Process "http://localhost:8080/auth/github"
    Write-Host ""
    Write-Host "After logging in:" -ForegroundColor Green
    Write-Host "  1. Copy the 'token' value from the JSON response" -ForegroundColor White
    Write-Host "  2. Run this script again and paste the token" -ForegroundColor White
    Write-Host ""
    exit
}

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "Testing with token: $($TOKEN.Substring(0, 20))..." -ForegroundColor Gray
Write-Host ""

# Test 1: Get Profile
Write-Host "1️⃣  Getting profile..." -ForegroundColor Cyan
try {
    $profile = Invoke-RestMethod -Uri "http://localhost:8080/api/user/me" -Headers $headers
    Write-Host "   ✅ Username: $($profile.data.username)" -ForegroundColor Green
    Write-Host "   📊 Streak: $($profile.data.currentStreak) (Longest: $($profile.data.longestStreak))" -ForegroundColor White
    Write-Host "   💻 Total Commits: $($profile.data.totalCommits)" -ForegroundColor White
    $username = $profile.data.username
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Token might be invalid or expired. Please login again." -ForegroundColor Yellow
    exit
}
Write-Host ""

# Test 2: Sync GitHub Activity
Write-Host "2️⃣  Syncing GitHub activity..." -ForegroundColor Cyan
Write-Host "   ⏳ This may take 10-30 seconds..." -ForegroundColor Gray
try {
    $sync = Invoke-RestMethod -Uri "http://localhost:8080/api/github/sync" -Headers $headers -Method Post
    Write-Host "   ✅ Synced: $($sync.data.saved) activities" -ForegroundColor Green
    Write-Host "   📥 Fetched: $($sync.data.fetched) events from GitHub" -ForegroundColor White
} catch {
    Write-Host "   ⚠️  Sync issue: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   This is normal if you have no recent commits" -ForegroundColor Gray
}
Write-Host ""

# Test 3: Calculate Streak
Write-Host "3️⃣  Calculating streak..." -ForegroundColor Cyan
try {
    $streak = Invoke-RestMethod -Uri "http://localhost:8080/api/streak/calculate" -Headers $headers -Method Post
    Write-Host "   ✅ Current Streak: $($streak.data.currentStreak) days" -ForegroundColor Green
    Write-Host "   🏆 Longest Streak: $($streak.data.longestStreak) days" -ForegroundColor White
    Write-Host "   🔥 Active: $($streak.data.isStreakActive)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Get Dashboard
Write-Host "4️⃣  Loading dashboard (7 days)..." -ForegroundColor Cyan
try {
    $dashboard = Invoke-RestMethod -Uri "http://localhost:8080/api/user/dashboard?days=7" -Headers $headers
    Write-Host "   ✅ Active Days: $($dashboard.data.period.activeDays)/$($dashboard.data.period.days)" -ForegroundColor Green
    Write-Host "   💻 Commits: $($dashboard.data.totals.totalCommits)" -ForegroundColor White
    Write-Host "   ➕ Additions: $($dashboard.data.totals.totalAdditions)" -ForegroundColor White
    Write-Host "   ➖ Deletions: $($dashboard.data.totals.totalDeletions)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Get Stats
Write-Host "5️⃣  Getting activity stats (30 days)..." -ForegroundColor Cyan
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/activity?days=30" -Headers $headers
    Write-Host "   ✅ Period: $($stats.data.period.days) days" -ForegroundColor Green
    Write-Host "   📊 Active: $($stats.data.period.activeDays) days" -ForegroundColor White
    Write-Host "   💻 Commits: $($stats.data.periodStats.commits)" -ForegroundColor White
    Write-Host "   📈 Avg/Day: $($stats.data.averages.commitsPerDay)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Get Repository Stats
Write-Host "6️⃣  Getting repository stats..." -ForegroundColor Cyan
try {
    $repos = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/repositories?days=30" -Headers $headers
    Write-Host "   ✅ Total Repos: $($repos.data.totalRepositories)" -ForegroundColor Green
    if ($repos.data.repositories.Count -gt 0) {
        Write-Host "   📦 Top Repo: $($repos.data.repositories[0].repoName)" -ForegroundColor White
        Write-Host "      Commits: $($repos.data.repositories[0].commits)" -ForegroundColor Gray
    } else {
        Write-Host "   📦 No repositories with activity yet" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Test Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ User: $username" -ForegroundColor Green
Write-Host "✅ All core features tested" -ForegroundColor Green
Write-Host ""
Write-Host "📚 See MANUAL_TEST_GUIDE.md for more endpoints" -ForegroundColor Yellow
Write-Host "📖 See COMPLETE_API_REFERENCE.md for full API docs" -ForegroundColor Yellow
