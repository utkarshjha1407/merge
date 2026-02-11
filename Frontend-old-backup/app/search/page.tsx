'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useSearchUsers, useTrendingUsers } from '@/lib/hooks';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  
  const { data: searchData, isLoading: searchLoading } = useSearchUsers(query, 20);
  const { data: trendingData } = useTrendingUsers(10);

  const results = searchData?.data || [];
  const trending = trendingData?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-display font-bold mb-4">Find Athletes</h1>
          <p className="text-xl text-gray-400">Discover developers who train daily.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username..."
              className="w-full bg-midnight-900 border border-midnight-800 rounded-xl pl-16 pr-6 py-5 text-lg focus:outline-none focus:border-neon-green transition-colors"
            />
          </div>
        </motion.form>

        {/* Search Results */}
        {searchLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-lg" />
            ))}
          </div>
        ) : searched && results.length > 0 ? (
          <div className="space-y-3">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            {results.map((user: any, index: number) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>
        ) : searched && results.length === 0 ? (
          <div className="empty-state">
            <p className="text-xl">No athletes found.</p>
            <p className="text-gray-500 mt-2">Try a different search.</p>
          </div>
        ) : (
          // Trending
          trending.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-neon-green" />
                <h2 className="text-2xl font-bold">Trending This Week</h2>
              </div>
              <div className="space-y-3">
                {trending.map((user: any, index: number) => (
                  <UserCard key={user.id} user={user} index={index} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function UserCard({ user, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/profile/${user.username}`}>
        <div className="stat-card flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg mb-1">{user.username}</div>
            <div className="text-sm text-gray-400">
              {user.currentStreak} day streak • {user.totalCommits} commits
            </div>
          </div>
          {user.currentStreak > 0 && (
            <div className="flex items-center gap-2 text-neon-green">
              <Flame className="h-5 w-5" />
              <span className="font-bold">{user.currentStreak}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
