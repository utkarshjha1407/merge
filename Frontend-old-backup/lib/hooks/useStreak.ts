import { useQuery } from '@tanstack/react-query';
import apiService from '../api-service';

export function useStreak() {
  return useQuery({
    queryKey: ['streak', 'current'],
    queryFn: () => apiService.streak.getCurrentStreak(),
  });
}

export function useStreakHistory() {
  return useQuery({
    queryKey: ['streak', 'history'],
    queryFn: () => apiService.streak.getStreakHistory(),
  });
}
