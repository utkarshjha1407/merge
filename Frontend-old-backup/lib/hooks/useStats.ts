import { useQuery } from '@tanstack/react-query';
import apiService from '../api-service';

export function useActivityStats() {
  return useQuery({
    queryKey: ['stats', 'activity'],
    queryFn: () => apiService.stats.getActivityStats(),
  });
}

export function useUserActivityStats(username: string) {
  return useQuery({
    queryKey: ['stats', 'activity', username],
    queryFn: () => apiService.stats.getUserActivityStats(username),
    enabled: !!username,
  });
}
