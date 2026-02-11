'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, GitCommit, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useAuth, useActivityFeed } from '@/lib/hooks';

export default function FeedPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { data: feedData, isLoading: feedLoading } = useActivityFeed(50);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  const loading = authLoading || feedLoading;

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center pt-16">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const feed = feedData?.data || [];

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <Activity className="h-12 w-12 text-neon-green" />
            <h1 className="text-display font-bold">Activity Feed</h1>
          </div>
          <p className="text-xl text-gray-400">Training sessions from your network.</p>
        </motion.div>

        {/* Feed */}
        {feed.length > 0 ? (
          <div className="space-y-4">
            {feed.map((activity: any, index: number) => (
              <FeedCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="text-xl mb-4">No activity yet.</p>
            <p className="text-gray-500 mb-6">Follow developers to see their training.</p>
            <Link href="/search">
              <button className="btn-primary">Find Athletes</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedCard({ activity, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="stat-card"
    >
      <div className="flex gap-4">
        {/* User Info */}
        <div className="flex-1">
          <Link href={`/profile/${activity.user.username}`}>
            <span className="font-semibold text-lg hover:text-neon-green transition-colors">
              {activity.user.username}
            </span>
          </Link>
          
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <GitCommit className="h-4 w-4" />
              {activity.commitCount} commits
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(activity.date), 'MMM d, yyyy')}
            </div>
          </div>

          <div className="mt-3">
            <code className="text-sm bg-midnight-950 px-3 py-1 rounded">
              {activity.repository}
            </code>
          </div>

          {/* Commit Messages */}
          {activity.commitMessages && activity.commitMessages.length > 0 && (
            <div className="mt-4 space-y-2">
              {activity.commitMessages.slice(0, 3).map((msg: string, i: number) => (
                <div key={i} className="text-sm text-gray-400 pl-4 border-l-2 border-midnight-800">
                  {msg}
                </div>
              ))}
              {activity.commitMessages.length > 3 && (
                <div className="text-xs text-gray-600 pl-4">
                  +{activity.commitMessages.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
