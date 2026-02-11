import { useQuery } from '@tanstack/react-query';
import apiService from '../api-service';

export function useActivityFeed(limit = 50) {
  return useQuery({
    queryKey: ['feed', 'activity', limit],
    queryFn: () => apiService.feed.getActivityFeed({ limit }),
  });
}

export function useTrendingUsers(limit = 10) {
  return useQuery({
    queryKey: ['feed', 'trending', limit],
    queryFn: () => apiService.feed.getTrendingUsers({ limit }),
  });
}
