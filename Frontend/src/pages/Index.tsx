import { GitCommit, Plus, Minus, Zap, LogIn, Loader2, RefreshCw, Github, TrendingUp, Users } from "lucide-react";
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

  // Landing page for non-authenticated users
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-16 w-16 text-primary" />
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-6xl font-bold text-gradient">
              CodeStrava
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your coding activity, build streaks, and compete with developers worldwide
            </p>

            <div className="flex items-center justify-center gap-4 pt-8">
              <Button onClick={login} size="lg" className="gap-2 text-lg px-8 py-6">
                <LogIn className="h-5 w-5" />
                Get Started with GitHub
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 mt-20"
          >
            <div className="rounded-lg bg-card border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GitCommit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Activity</h3>
              <p className="text-sm text-muted-foreground">
                Automatically sync your GitHub commits and contributions
              </p>
            </div>

            <div className="rounded-lg bg-card border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-streak/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-streak" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Build Streaks</h3>
              <p className="text-sm text-muted-foreground">
                Maintain your coding momentum with daily streak tracking
              </p>
            </div>

            <div className="rounded-lg bg-card border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compete</h3>
              <p className="text-sm text-muted-foreground">
                See how you rank against other developers
              </p>
            </div>
          </motion.div>
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
  const hasData = totals.totalCommits > 0;

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
              Welcome back, <span className="text-gradient">{user?.username}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 font-mono">
              {hasData ? `${totals.totalCommits} commits · ${dashboard.period.activeDays} active days` : 'No activity data yet'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => syncGithub()} 
              disabled={isSyncing}
              variant={hasData ? "outline" : "default"}
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : hasData ? 'Sync GitHub' : 'Sync Your Data'}
            </Button>
            <img
              src={user?.avatarUrl}
              alt={user?.username}
              className="w-9 h-9 rounded-full ring-2 ring-primary/20"
            />
          </div>
        </motion.div>

        {/* Show welcome message if no data */}
        {!hasData && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-card border border-primary/50 p-8 text-center"
          >
            <Github className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Welcome to CodeStrava!</h3>
            <p className="text-muted-foreground mb-6">
              Click the "Sync Your Data" button above to fetch your GitHub activity and start tracking your coding journey.
            </p>
            <Button onClick={() => syncGithub()} disabled={isSyncing} size="lg" className="gap-2">
              <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </motion.div>
        )}

        {/* Show stats only if data exists */}
        {hasData && (
          <>
            {/* Streak + Quick Stats */}
            <StreakDisplay currentStreak={dashUser.currentStreak} longestStreak={dashUser.longestStreak} />
            <div className="grid grid-cols-4 gap-3">
              <StatsCard label="Total Commits" value={totals.totalCommits.toLocaleString()} icon={GitCommit} delay={0.2} />
              <StatsCard label="Additions" value={`+${totals.totalAdditions.toLocaleString()}`} icon={Plus} delay={0.22} />
              <StatsCard label="Deletions" value={`-${totals.totalDeletions.toLocaleString()}`} icon={Minus} delay={0.24} />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
