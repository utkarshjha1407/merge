import { GitCommit, Plus, Minus, Zap, LogIn, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { useGithubSync } from "@/lib/hooks/useGithubSync";
import { StreakDisplay } from "@/components/StreakDisplay";
import { StatsCard } from "@/components/StatsCard";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, login, user, isLoading: authLoading } = useAuth();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard(30);
  const { mutate: syncGithub, isPending: isSyncing } = useGithubSync();

  // Show login screen if not authenticated (and not loading auth check)
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome to CodeStrava</h1>
            <p className="text-muted-foreground">Track your coding activity and compete with developers</p>
          </div>
          <div className="space-y-3">
            <Button onClick={login} size="lg" className="gap-2 w-full">
              <LogIn className="h-5 w-5" />
              Login with GitHub
            </Button>
            <p className="text-xs text-muted-foreground">
              Having issues? <a href="/test-auth" className="text-primary hover:underline">Test OAuth</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (authLoading || dashboardLoading || !dashboard) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { user: dashUser, totals, averages, dailyStats } = dashboard;

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Good morning, <span className="text-gradient">{user?.username}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 font-mono">
              {totals.totalCommits} commits · {dashboard.period.activeDays} active days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => syncGithub()} 
              disabled={isSyncing}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync GitHub'}
            </Button>
            <img
              src={user?.avatarUrl}
              alt={user?.username}
              className="w-9 h-9 rounded-full ring-2 ring-primary/20"
            />
          </div>
        </motion.div>

        {/* Streak + Quick Stats */}
        <StreakDisplay currentStreak={dashUser.currentStreak} longestStreak={dashUser.longestStreak} />
        <div className="grid grid-cols-4 gap-3">
          <StatsCard label="Total Commits" value={totals.totalCommits.toLocaleString()} icon={GitCommit} delay={0.2} />
          <StatsCard label="Additions" value={`+${totals.totalAdditions}`} icon={Plus} delay={0.22} />
          <StatsCard label="Deletions" value={`-${totals.totalDeletions}`} icon={Minus} delay={0.24} />
          <StatsCard label="Avg/Day" value={averages.commitsPerDay.toString()} icon={Zap} delay={0.26} />
        </div>

        {/* Heatmap */}
        <ActivityHeatmap data={dailyStats.map(d => ({
          id: d.date,
          userId: user?.id || '',
          date: d.date,
          commitCount: d.commits,
          additions: d.additions,
          deletions: d.deletions,
          repoCount: 0
        }))} />

        {/* Message to sync data */}
        {totals.totalCommits === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-card border border-border p-8 text-center"
          >
            <h3 className="text-lg font-medium text-foreground mb-2">No Activity Data Yet</h3>
            <p className="text-muted-foreground mb-4">
              Click the "Sync GitHub" button above to fetch your coding activity from GitHub.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
