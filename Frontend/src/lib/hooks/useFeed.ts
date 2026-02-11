import { useQuery } from '@tanstack/react-query';
import { feedService, authService } from '../api-service';

export const useFeed = (limit: number = 20) => {
  return useQuery({
    queryKey: ['feed', limit],
    queryFn: () => feedService.getFeed(limit),
    enabled: authService.isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
