import { useQuery } from '@tanstack/react-query';
import apiService from '../api-service';

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => apiService.profile.getPublicProfile(username),
    enabled: !!username,
  });
}

export function useLeaderboard(type: 'streak' | 'commits', limit = 50) {
  return useQuery({
    queryKey: ['leaderboard', type, limit],
    queryFn: () => apiService.profile.getLeaderboard({ type, limit }),
  });
}

export function useSearchUsers(query: string, limit = 20) {
  return useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => apiService.profile.searchUsers({ query, limit }),
    enabled: query.length > 0,
  });
}
