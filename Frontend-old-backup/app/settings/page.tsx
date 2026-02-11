'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Github, Mail, Calendar, Save } from 'lucide-react';
import { useAuth } from '@/lib/hooks';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center pt-16">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-2">Settings</h1>
          <p className="text-xl text-gray-400 mb-12">Manage your profile and preferences</p>

          {/* Profile Section */}
          <div className="bg-midnight-900 border border-midnight-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="h-6 w-6 text-neon-green" />
              Profile Information
            </h2>

            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <img
                  src={user?.avatarUrl || `https://github.com/${user?.username}.png`}
                  alt={user?.username}
                  className="w-24 h-24 rounded-full border-2 border-midnight-800"
                />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Profile Picture</div>
                  <div className="text-gray-500 text-sm">Synced from GitHub</div>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={user?.username || ''}
                  disabled
                  className="w-full px-4 py-3 bg-midnight-950 border border-midnight-800 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 mt-1">Cannot be changed</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || 'Not provided'}
                  disabled
                  className="w-full px-4 py-3 bg-midnight-950 border border-midnight-800 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 mt-1">Synced from GitHub</p>
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </label>
                <input
                  type="text"
                  value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  disabled
                  className="w-full px-4 py-3 bg-midnight-950 border border-midnight-800 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-midnight-900 border border-midnight-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Account Actions</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-secondary w-full justify-center"
              >
                Back to Dashboard
              </button>
              
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to log out?')) {
                    logout();
                  }
                }}
                className="w-full px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-midnight-900/50 border border-midnight-800 rounded-lg">
            <p className="text-sm text-gray-500">
              Your profile information is automatically synced from your GitHub account. 
              To update your details, please update them on GitHub.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
