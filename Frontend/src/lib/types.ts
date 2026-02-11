// API Response Types

export interface User {
  id: string;
  githubId: string;
  username: string;
  avatarUrl: string;
  email?: string;
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
  user: User;
  stats: {
    totalCommits: number;
    totalAdditions: number;
    totalDeletions: number;
    activeRepos: number;
    avgCommitsPerDay: number;
  };
  streak: StreakInfo;
  recentActivities: Activity[];
  heatmapData: DailyStat[];
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
