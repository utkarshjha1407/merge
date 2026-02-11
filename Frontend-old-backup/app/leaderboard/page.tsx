'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, GitCommit } from 'lucide-react';
import Link from 'next/link';
import { useLeaderboard } from '@/lib/hooks';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'streak' | 'commits'>('streak');
  const { data: leaderboardData, isLoading } = useLeaderboard(activeTab, 50);

  const leaderboard = leaderboardData?.data || [];

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="h-12 w-12 text-neon-green" />
            <h1 className="text-display font-bold">Leaderboard</h1>
          </div>
          <p className="text-xl text-gray-400">The elite. The consistent. The committed.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('streak')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'streak'
                ? 'bg-neon-green text-midnight-950'
                : 'bg-midnight-900 text-gray-400 hover:text-white'
            }`}
          >
            <Flame className="inline-block mr-2 h-5 w-5" />
            Longest Streak
          </button>
          <button
            onClick={() => setActiveTab('commits')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'commits'
                ? 'bg-neon-green text-midnight-950'
                : 'bg-midnight-900 text-gray-400 hover:text-white'
            }`}
          >
            <GitCommit className="inline-block mr-2 h-5 w-5" />
            Most Commits
          </button>
        </div>

        {/* Leaderboard */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-lg" />
            ))}
          </div>
        ) : leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.map((entry: any) => (
              <LeaderboardRow
                key={entry.user.id}
                rank={entry.rank}
                user={entry.user}
                value={entry.value}
                type={activeTab}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="text-xl">No data yet.</p>
            <p className="text-gray-500 mt-2">Be the first to compete.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderboardRow({ rank, user, value, type }: any) {
  const isTop3 = rank <= 3;
  const medalColor = rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-400' : 'text-orange-600';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
    >
      <Link href={`/profile/${user.username}`}>
        <div className={`stat-card flex items-center gap-6 ${isTop3 ? 'border-neon-green/30' : ''}`}>
          {/* Rank */}
          <div className="w-12 text-center">
            {isTop3 ? (
              <Trophy className={`h-8 w-8 ${medalColor} mx-auto`} />
            ) : (
              <span className="text-2xl font-bold text-gray-600">#{rank}</span>
            )}
          </div>

          {/* User */}
          <div className="flex-1">
            <div className="font-semibold text-lg">{user.username}</div>
            <div className="text-sm text-gray-500">
              {type === 'streak' ? `${user.totalCommits} commits` : `${user.currentStreak} day streak`}
            </div>
          </div>

          {/* Value */}
          <div className="text-right">
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-xs text-gray-500">{type === 'streak' ? 'days' : 'commits'}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
