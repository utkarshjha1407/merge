'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, GitCommit, Calendar, RefreshCw } from 'lucide-react';
import CountUpNumber from '@/components/CountUpNumber';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import { useAuth, useStreak, useActivityStats, useGithubSync } from '@/lib/hooks';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const { data: streakData, isLoading: streakLoading } = useStreak();
  const { data: statsData, isLoading: statsLoading } = useActivityStats();
  const syncMutation = useGithubSync();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  const handleSync = () => {
    syncMutation.mutate();
  };

  const loading = authLoading || streakLoading || statsLoading;

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center pt-16">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const streak = streakData?.data;
  const stats = statsData?.data;
  const heatmapData = stats?.dailyStats?.map(day => ({
    date: day.date,
    count: day.commits,
  })) || [];

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                Welcome back, {user?.username}.
              </h1>
              <p className="text-2xl text-gray-400">
                Your streak is {streak?.isActive ? 'alive' : 'waiting'}.
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncMutation.isPending}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
              {syncMutation.isPending ? 'Syncing...' : 'Sync'}
            </button>
          </div>

          {/* Massive Streak Display */}
          <div className="text-center py-16 bg-midnight-900 border border-midnight-800 rounded-2xl">
            <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Current Streak</div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="number-display text-neon-green glow-green"
            >
              <CountUpNumber value={streak?.currentStreak || 0} duration={1.5} />
            </motion.div>
            <div className="text-gray-500 text-xl mt-4">days</div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<GitCommit className="h-6 w-6" />}
            label="Commits"
            value={stats?.totalCommits || 0}
            animated
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            label="Longest Streak"
            value={streak?.longestStreak || 0}
            suffix=" days"
            animated
          />
          <StatCard
            icon={<Calendar className="h-6 w-6" />}
            label="Active Days"
            value={stats?.totalDays || 0}
            animated
          />
          <StatCard
            icon={<Flame className="h-6 w-6 text-neon-green" />}
            label="Weekly Rank"
            value="#--"
          />
        </div>

        {/* Activity Heatmap */}
        {heatmapData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-midnight-900 border border-midnight-800 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">365 Days of Code</h2>
            <ActivityHeatmap data={heatmapData} />
          </motion.div>
        )}

        {/* Empty State */}
        {(!stats || stats.totalCommits === 0) && (
          <div className="empty-state">
            <p className="text-xl mb-4">You haven't trained yet.</p>
            <p className="text-gray-500">Sync and start your streak.</p>
          </div>
        )}

        {/* Sync Success Message */}
        {syncMutation.isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 right-6 bg-neon-green/10 border border-neon-green/30 rounded-lg px-4 py-3 text-neon-green"
          >
            ✓ Synced successfully!
          </motion.div>
        )}

        {/* Sync Error Message */}
        {syncMutation.isError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 right-6 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400"
          >
            ✗ Sync failed. Please try again.
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, suffix = '', animated = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold">
        {animated && typeof value === 'number' ? (
          <>
            <CountUpNumber value={value} />
            {suffix}
          </>
        ) : (
          value
        )}
      </div>
    </motion.div>
  );
}
