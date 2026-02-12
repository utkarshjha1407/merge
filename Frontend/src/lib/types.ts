// API Response Types

export interface User {
  id: string;
  githubId: string;
  username: string;
  avatarUrl: string;
  email?: string;
  hasCompletedProfile?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  repoName: string;
  commitCount: number;
  additions: number;
  deletions: number;
  activityDate: string;
  message?: string;
  createdAt: string;
}

export interface DailyStat {
  id: string;
  userId: string;
  date: string;
  commitCount: number;
  additions: number;
  deletions: number;
  repoCount: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}

export interface DashboardData {
  user: {
    username: string;
    avatarUrl: string;
    currentStreak: number;
    longestStreak: number;
  };
  period: {
    days: number;
    activeDays: number;
  };
  totals: {
    totalCommits: number;
    totalAdditions: number;
    totalDeletions: number;
  };
  averages: {
    commitsPerDay: number;
  };
  dailyStats: Array<{
    date: string;
    commits: number;
    additions: number;
    deletions: number;
  }>;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  currentStreak: number;
  totalCommits: number;
}

export interface FeedItem {
  id: string;
  user: User;
  activity: Activity;
  type: 'commit' | 'streak' | 'follow';
  createdAt: string;
}

export interface FollowStats {
  followers: number;
  following: number;
  isFollowing?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
