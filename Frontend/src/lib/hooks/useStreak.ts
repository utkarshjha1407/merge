import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { streakService, authService } from '../api-service';

export const useStreak = () => {
  return useQuery({
    queryKey: ['streak'],
    queryFn: streakService.getStreak,
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCalculateStreak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streakService.calculateStreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streak'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
