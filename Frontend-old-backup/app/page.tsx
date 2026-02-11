'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex items-center pt-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6 w-full py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-huge font-bold leading-none tracking-tighter">
              Compete.<br />
              Commit.<br />
              Ship.
            </h1>
            
            <p className="text-2xl text-gray-400 max-w-xl leading-relaxed">
              Train your coding like an athlete trains miles.
            </p>

            <div className="flex gap-4 pt-4">
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <button className="btn-primary text-lg px-8 py-4">
                    Go to Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="btn-primary text-lg px-8 py-4 animate-pulse-soft">
                    <Github className="inline-block mr-2 h-5 w-5" />
                    Start Training
                  </button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right: Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="bg-midnight-900 border border-midnight-800 rounded-2xl p-8 space-y-6">
      {/* Streak Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-8"
      >
        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Current Streak</div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="number-display text-neon-green glow-green"
        >
          47
        </motion.div>
        <div className="text-gray-500 text-sm mt-2">days</div>
      </motion.div>

      {/* Mini Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Commits', value: '1,247' },
          { label: 'Rank', value: '#12' },
          { label: 'Best', value: '89' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="bg-midnight-950 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Activity Graph Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="h-32 bg-midnight-950 rounded-lg flex items-end justify-around p-4 gap-1"
      >
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
            className="flex-1 bg-neon-green/20 rounded-t"
          />
        ))}
      </motion.div>
    </div>
  );
}
