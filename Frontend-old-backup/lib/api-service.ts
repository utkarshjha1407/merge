/**
 * API Service Layer
 * Centralized API calls with type safety
 */

import apiClient from './api';
import {
  User,
  Streak,
  ActivityStats,
  PublicProfile,
  FollowStatus,
  FollowUser,
  FeedActivity,
  LeaderboardEntry,
  SearchResult,
} from './types';

export const userService = {
  // Get current user
  getCurrentUser: () => apiClient.get<User>('/user/me'),

  // Get user profile
  getUserProfile: () => apiClient.get<User>('/user/profile'),
};

export const githubService = {
  // Sync GitHub activity
  syncActivity: () => apiClient.post<{ message: string }>('/github/sync'),

  // Get GitHub activity
  getActivity: (params?: { days?: number }) =>
    apiClient.get<any>('/github/activity', params),
};

export const streakService = {
  // Get current streak
  getCurrentStreak: () => apiClient.get<Streak>('/streak/current'),

  // Get streak history
  getStreakHistory: () => apiClient.get<any>('/streak/history'),
};

export const statsService = {
  // Get activity stats for current user
  getActivityStats: () => apiClient.get<ActivityStats>('/stats/activity'),

  // Get activity stats for specific user
  getUserActivityStats: (username: string) =>
    apiClient.get<ActivityStats>(`/stats/activity/${username}`),
};

export const followService = {
  // Follow a user
  followUser: (username: string) =>
    apiClient.post<{ message: string }>(`/follow/${username}`),

  // Unfollow a user
  unfollowUser: (username: string) =>
    apiClient.delete<{ message: string }>(`/follow/${username}`),

  // Get follow status
  getFollowStatus: (username: string) =>
    apiClient.get<FollowStatus>(`/follow/${username}/status`),

  // Get followers
  getFollowers: () => apiClient.get<FollowUser[]>('/follow/followers'),

  // Get following
  getFollowing: () => apiClient.get<FollowUser[]>('/follow/following'),
};

export const profileService = {
  // Get public profile
  getPublicProfile: (username: string) =>
    apiClient.get<PublicProfile>(`/profile/${username}`),

  // Get leaderboard
  getLeaderboard: (params: { type: 'streak' | 'commits'; limit?: number }) =>
    apiClient.get<LeaderboardEntry[]>('/profile/leaderboard', params),

  // Search users
  searchUsers: (params: { query: string; limit?: number }) =>
    apiClient.get<SearchResult[]>('/profile/search', params),
};

export const feedService = {
  // Get activity feed
  getActivityFeed: (params?: { limit?: number }) =>
    apiClient.get<FeedActivity[]>('/feed/activity', params),

  // Get trending users
  getTrendingUsers: (params?: { limit?: number }) =>
    apiClient.get<SearchResult[]>('/feed/trending', params),
};

// Export all services as a single object
const apiService = {
  user: userService,
  github: githubService,
  streak: streakService,
  stats: statsService,
  follow: followService,
  profile: profileService,
  feed: feedService,
};

export default apiService;
