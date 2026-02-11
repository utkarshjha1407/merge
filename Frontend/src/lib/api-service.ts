import api from './api';
import type { 
  User, 
  DashboardData, 
  Activity, 
  StreakInfo, 
  LeaderboardEntry, 
  FeedItem,
  FollowStats,
  ApiResponse 
} from './types';

// Auth
export const authService = {
  getGithubAuthUrl: () => `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/auth/github`,
  
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },
  
  getToken: () => localStorage.getItem('auth_token'),
  
  removeToken: () => {
    localStorage.removeItem('auth_token');
  },
  
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

// User
export const userService = {
  getMe: async () => {
    const { data } = await api.get<ApiResponse<User>>('/api/user/me');
    return data.data;
  },
  
  getDashboard: async (days: number = 30) => {
    const { data } = await api.get<ApiResponse<DashboardData>>(`/api/user/dashboard?days=${days}`);
    return data.data;
  },
  
  getActivities: async (limit: number = 20) => {
    const { data } = await api.get<ApiResponse<Activity[]>>(`/api/user/activities?limit=${limit}`);
    return data.data;
  },
};

// GitHub Sync
export const githubService = {
  syncActivity: async () => {
    const { data } = await api.post<ApiResponse<{ synced: number }>>('/api/github/sync');
    return data.data;
  },
  
  fetchCustomRange: async (days: number) => {
    const { data } = await api.post<ApiResponse<{ synced: number }>>('/api/github/fetch', { days });
    return data.data;
  },
};

// Streak
export const streakService = {
  getStreak: async () => {
    const { data } = await api.get<ApiResponse<StreakInfo>>('/api/streak');
    return data.data;
  },
  
  calculateStreak: async () => {
    const { data } = await api.post<ApiResponse<StreakInfo>>('/api/streak/calculate');
    return data.data;
  },
};

// Follow
export const followService = {
  followUser: async (userId: string) => {
    const { data } = await api.post<ApiResponse<{ message: string }>>(`/api/follow/${userId}`);
    return data.data;
  },
  
  unfollowUser: async (userId: string) => {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(`/api/follow/${userId}`);
    return data.data;
  },
  
  getFollowers: async (userId?: string) => {
    const url = userId ? `/api/follow/followers/${userId}` : '/api/follow/followers';
    const { data } = await api.get<ApiResponse<User[]>>(url);
    return data.data;
  },
  
  getFollowing: async (userId?: string) => {
    const url = userId ? `/api/follow/following/${userId}` : '/api/follow/following';
    const { data } = await api.get<ApiResponse<User[]>>(url);
    return data.data;
  },
  
  getFollowStats: async (userId?: string) => {
    const url = userId ? `/api/follow/stats/${userId}` : '/api/follow/stats';
    const { data } = await api.get<ApiResponse<FollowStats>>(url);
    return data.data;
  },
};

// Stats
export const statsService = {
  getLeaderboard: async (limit: number = 10) => {
    const { data } = await api.get<ApiResponse<LeaderboardEntry[]>>(`/api/stats/leaderboard?limit=${limit}`);
    return data.data;
  },
  
  getGlobalStats: async () => {
    const { data } = await api.get<ApiResponse<any>>('/api/stats/global');
    return data.data;
  },
};

// Feed
export const feedService = {
  getFeed: async (limit: number = 20) => {
    const { data } = await api.get<ApiResponse<FeedItem[]>>(`/api/feed?limit=${limit}`);
    return data.data;
  },
};

// Profile
export const profileService = {
  getProfile: async (username: string) => {
    const { data } = await api.get<ApiResponse<any>>(`/api/profile/${username}`);
    return data.data;
  },
};
