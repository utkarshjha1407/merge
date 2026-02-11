import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../api-service';

export function useGithubSync() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiService.github.syncActivity(),
    onSuccess: () => {
      // Invalidate all related queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['streak'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
