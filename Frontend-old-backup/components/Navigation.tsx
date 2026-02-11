'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, BarChart3, Users, Search, User, LogOut, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('token'));
    }
  }, [pathname]);

  // Don't show nav on login and callback pages
  if (pathname === '/login' || pathname === '/auth/callback') {
    return null;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/leaderboard', icon: BarChart3, label: 'Leaderboard' },
    { href: '/feed', icon: Users, label: 'Feed' },
    { href: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/80 backdrop-blur-xl border-b border-midnight-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? '/dashboard' : '/'}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tight cursor-pointer"
            >
              Code<span className="text-neon-green">Streak</span>
            </motion.div>
          </Link>

          {/* Nav Items - Only show when logged in */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${isActive 
                          ? 'bg-neon-green/10 text-neon-green' 
                          : 'text-gray-400 hover:text-white hover:bg-midnight-900'
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  </Link>
                );
              })}

              {/* Profile & Logout */}
              <div className="ml-4 flex items-center gap-2 pl-4 border-l border-midnight-800">
                <Link href="/settings">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-midnight-900 transition-all"
                    title="Settings"
                  >
                    <User className="h-4 w-4" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-midnight-900 transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          ) : (
            // Show login button when not logged in
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Sign In
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
