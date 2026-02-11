'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, GitCommit, MapPin, Globe } from 'lucide-react';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import { usePublicProfile, useUserActivityStats, useFollowStatus, useFollowUser, useUnfollowUser } from '@/lib/hooks';
import { useAuth } from '@/lib/hooks';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { user: currentUser } = useAuth();
  const { data: profileData, isLoading: profileLoading } = usePublicProfile(username);
  const { data: statsData } = useUserActivityStats(username);
  const { data: followStatusData } = useFollowStatus(username);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const profile = profileData?.data;
  const stats = statsData?.data;
  const isFollowing = followStatusData?.data?.isFollowing || false;
  const isOwnProfile = currentUser?.username === username;

  const heatmapData = stats?.dailyStats?.map(day => ({
    date: day.date,
    count: day.commits,
  })) || [];

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate(username);
    } else {
      followMutation.mutate(username);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center pt-16">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">User not found</h1>
          <p className="text-gray-400">This athlete doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-display font-bold mb-2">{profile.username}</h1>
              {profile.bio && <p className="text-xl text-gray-400 mb-4">{profile.bio}</p>}
              
              <div className="flex flex-wrap gap-4 text-gray-400">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-green">
                    <Globe className="h-4 w-4" />
                    {profile.website}
                  </a>
                )}
              </div>
            </div>

            {!isOwnProfile && currentUser && (
              <button
                onClick={handleFollowToggle}
                disabled={followMutation.isPending || unfollowMutation.isPending}
                className={isFollowing ? 'btn-secondary' : 'btn-primary'}
              >
                {followMutation.isPending || unfollowMutation.isPending
                  ? 'Loading...'
                  : isFollowing
                  ? 'Following'
                  : 'Follow'}
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              icon={<Flame className="h-6 w-6 text-neon-green" />}
              label="Current Streak"
              value={`${profile.currentStreak} days`}
            />
            <StatCard
              icon={<TrendingUp className="h-6 w-6" />}
              label="Longest Streak"
              value={`${profile.longestStreak} days`}
            />
            <StatCard
              icon={<GitCommit className="h-6 w-6" />}
              label="Total Commits"
              value={profile.totalCommits}
            />
          </div>
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <h3 className="text-xl font-bold mb-6">365-Day Activity</h3>
          {heatmapData.length > 0 ? (
            <ActivityHeatmap data={heatmapData} />
          ) : (
            <div className="h-32 bg-midnight-950 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No activity data yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
