// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  githubId: string;
  createdAt: string;
  updatedAt: string;
}

// Streak Types
export interface Streak {
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
  lastCommitDate?: string;
}

// Stats Types
export interface ActivityStats {
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
  totalDays: number;
  dailyStats?: DailyStat[];
}

export interface DailyStat {
  date: string;
  commits: number;
  additions: number;
  deletions: number;
}

// Profile Types
export interface PublicProfile {
  username: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  currentStreak: number;
  longestStreak: number;
  totalCommits: number;
  isFollowing?: boolean;
}

// Follow Types
export interface FollowStatus {
  isFollowing: boolean;
}

export interface FollowUser {
  id: string;
  username: string;
  avatarUrl?: string;
  currentStreak: number;
  totalCommits: number;
}

// Feed Types
export interface FeedActivity {
  id: string;
  date: string;
  commitCount: number;
  repository: string;
  commitMessages?: string[];
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
    currentStreak: number;
    longestStreak: number;
    totalCommits: number;
  };
  value: number;
}

// Search Types
export interface SearchResult {
  id: string;
  username: string;
  avatarUrl?: string;
  currentStreak: number;
  totalCommits: number;
}
