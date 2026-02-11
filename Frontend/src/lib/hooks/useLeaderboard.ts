import { useQuery } from '@tanstack/react-query';
import { statsService, authService } from '../api-service';

export const useLeaderboard = (limit: number = 10) => {
  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: () => statsService.getLeaderboard(limit),
    enabled: authService.isAuthenticated(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
