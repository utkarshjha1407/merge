'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Flame, TrendingUp, GitCommit, Calendar, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [userRes, streakRes, statsRes] = await Promise.all([
        api.get('/user/me'),
        api.get('/streak/current'),
        api.get('/stats/activity'),
      ]);
      setUser(userRes.data.data);
      setStreak(streakRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await api.post('/github/sync');
      await fetchData();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
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
              disabled={syncing}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
              Sync
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
              {streak?.currentStreak || 0}
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
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            label="Longest Streak"
            value={`${streak?.longestStreak || 0} days`}
          />
          <StatCard
            icon={<Calendar className="h-6 w-6" />}
            label="Active Days"
            value={stats?.totalDays || 0}
          />
          <StatCard
            icon={<Flame className="h-6 w-6 text-neon-green" />}
            label="Weekly Rank"
            value="#--"
          />
        </div>

        {/* Empty State */}
        {(!stats || stats.totalCommits === 0) && (
          <div className="empty-state">
            <p className="text-xl mb-4">You haven't trained yet.</p>
            <p className="text-gray-500">Sync and start your streak.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
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
      <div className="text-3xl font-bold">{value}</div>
    </motion.div>
  );
}
