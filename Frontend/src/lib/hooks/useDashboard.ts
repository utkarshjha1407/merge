import { useQuery } from '@tanstack/react-query';
import { userService } from '../api-service';
import { authService } from '../api-service';

export const useDashboard = (days: number = 30) => {
  return useQuery({
    queryKey: ['dashboard', days],
    queryFn: () => userService.getDashboard(days),
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useActivities = (limit: number = 20) => {
  return useQuery({
    queryKey: ['activities', limit],
    queryFn: () => userService.getActivities(limit),
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  });
};
