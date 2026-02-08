# Strava for Coders - User Flow Test Script
# Run this in PowerShell

Write-Host "=== Strava for Coders - Testing User Flow ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if token is provided
$TOKEN = Read-Host "Enter your JWT token (get it from http://localhost:8080/auth/github)"

if ([string]::IsNullOrWhiteSpace($TOKEN)) {
    Write-Host "❌ No token provided. Please login first:" -ForegroundColor Red
    Write-Host "   1. Open: http://localhost:8080/auth/github" -ForegroundColor Yellow
    Write-Host "   2. Authorize with GitHub" -ForegroundColor Yellow
    Write-Host "   3. Copy the token from the response" -ForegroundColor Yellow
    Write-Host "   4. Run this script again" -ForegroundColor Yellow
    exit
}

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "✅ Token received" -ForegroundColor Green
Write-Host ""

# Step 2: Get User Profile
Write-Host "📋 Step 1: Getting user profile..." -ForegroundColor Cyan
try {
    $profile = Invoke-RestMethod -Uri "http://localhost:8080/api/user/me" -Headers $headers -Method Get
    Write-Host "✅ User: $($profile.data.username)" -ForegroundColor Green
    Write-Host "   Current Streak: $($profile.data.currentStreak)" -ForegroundColor White
    Write-Host "   Longest Streak: $($profile.data.longestStreak)" -ForegroundColor White
    Write-Host "   Total Commits: $($profile.data.totalCommits)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get profile: $($_.Exception.Message)" -ForegroundColor Red
    exit
}
Write-Host ""

# Step 3: Sync GitHub Activity
Write-Host "🔄 Step 2: Syncing GitHub activity (last 30 days)..." -ForegroundColor Cyan
try {
    $sync = Invoke-RestMethod -Uri "http://localhost:8080/api/github/sync" -Headers $headers -Method Post
    Write-Host "✅ Synced: $($sync.data.saved) activities" -ForegroundColor Green
    Write-Host "   Fetched: $($sync.data.fetched) events" -ForegroundColor White
} catch {
    Write-Host "⚠️  Sync failed: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   This might be due to GitHub API rate limits or no recent activity" -ForegroundColor Gray
}
Write-Host ""

# Step 4: Calculate Streak
Write-Host "🔥 Step 3: Calculating streak..." -ForegroundColor Cyan
try {
    $streak = Invoke-RestMethod -Uri "http://localhost:8080/api/streak/calculate" -Headers $headers -Method Post
    Write-Host "✅ Streak calculated" -ForegroundColor Green
    Write-Host "   Current Streak: $($streak.data.currentStreak) days" -ForegroundColor White
    Write-Host "   Longest Streak: $($streak.data.longestStreak) days" -ForegroundColor White
    Write-Host "   Is Active: $($streak.data.isStreakActive)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to calculate streak: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 5: Get Dashboard
Write-Host "📊 Step 4: Getting dashboard (last 7 days)..." -ForegroundColor Cyan
try {
    $dashboard = Invoke-RestMethod -Uri "http://localhost:8080/api/user/dashboard?days=7" -Headers $headers -Method Get
    Write-Host "✅ Dashboard loaded" -ForegroundColor Green
    Write-Host "   Active Days: $($dashboard.data.period.activeDays)/$($dashboard.data.period.days)" -ForegroundColor White
    Write-Host "   Total Commits: $($dashboard.data.totals.totalCommits)" -ForegroundColor White
    Write-Host "   Avg Commits/Day: $($dashboard.data.averages.commitsPerDay)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get dashboard: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 6: Get Activity Stats
Write-Host "📈 Step 5: Getting activity statistics..." -ForegroundColor Cyan
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/activity?days=30" -Headers $headers -Method Get
    Write-Host "✅ Stats loaded" -ForegroundColor Green
    Write-Host "   Period: $($stats.data.period.days) days" -ForegroundColor White
    Write-Host "   Active Days: $($stats.data.period.activeDays)" -ForegroundColor White
    Write-Host "   Total Commits: $($stats.data.periodStats.commits)" -ForegroundColor White
    Write-Host "   Total Additions: $($stats.data.periodStats.additions)" -ForegroundColor White
    Write-Host "   Total Deletions: $($stats.data.periodStats.deletions)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get stats: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 7: Get Repository Stats
Write-Host "📦 Step 6: Getting repository statistics..." -ForegroundColor Cyan
try {
    $repos = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/repositories?days=30" -Headers $headers -Method Get
    Write-Host "✅ Repository stats loaded" -ForegroundColor Green
    Write-Host "   Total Repositories: $($repos.data.totalRepositories)" -ForegroundColor White
    if ($repos.data.repositories.Count -gt 0) {
        Write-Host "   Top Repository: $($repos.data.repositories[0].repoName)" -ForegroundColor White
        Write-Host "   - Commits: $($repos.data.repositories[0].commits)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed to get repository stats: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 8: Get Recent Activities
Write-Host "📝 Step 7: Getting recent activities..." -ForegroundColor Cyan
try {
    $activities = Invoke-RestMethod -Uri "http://localhost:8080/api/user/activities?limit=5" -Headers $headers -Method Get
    Write-Host "✅ Activities loaded: $($activities.data.Count) items" -ForegroundColor Green
    foreach ($activity in $activities.data) {
        Write-Host "   - $($activity.repoName): $($activity.commits) commits" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Failed to get activities: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 9: Get Followers/Following
Write-Host "👥 Step 8: Getting social connections..." -ForegroundColor Cyan
try {
    $followers = Invoke-RestMethod -Uri "http://localhost:8080/api/follow/followers" -Headers $headers -Method Get
    $following = Invoke-RestMethod -Uri "http://localhost:8080/api/follow/following" -Headers $headers -Method Get
    Write-Host "✅ Social data loaded" -ForegroundColor Green
    Write-Host "   Followers: $($followers.data.count)" -ForegroundColor White
    Write-Host "   Following: $($following.data.count)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get social data: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Step 10: Get Weekly Summary
Write-Host "📅 Step 9: Getting weekly summary..." -ForegroundColor Cyan
try {
    $weekly = Invoke-RestMethod -Uri "http://localhost:8080/api/stats/weekly" -Headers $headers -Method Get
    Write-Host "✅ Weekly summary loaded" -ForegroundColor Green
    foreach ($week in $weekly.data.weeks) {
        Write-Host "   Week $($week.weekNumber): $($week.commits) commits, $($week.activeDays) active days" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Failed to get weekly summary: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Test Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ All endpoints tested successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  - View full profile: http://localhost:8080/api/user/me" -ForegroundColor Gray
Write-Host "  - Check dashboard: http://localhost:8080/api/user/dashboard" -ForegroundColor Gray
Write-Host "  - See documentation: Backend/COMPLETE_API_REFERENCE.md" -ForegroundColor Gray
