import { useMutation, useQueryClient } from '@tanstack/react-query';
import { githubService } from '../api-service';
import { toast } from 'sonner';

export const useGithubSync = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: githubService.syncActivity,
    onSuccess: (data) => {
      toast.success(`Synced ${data.synced} activities from GitHub`);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['streak'] });
    },
    onError: () => {
      toast.error('Failed to sync GitHub activity');
    },
  });
};

export const useFetchCustomRange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (days: number) => githubService.fetchCustomRange(days),
    onSuccess: (data) => {
      toast.success(`Fetched ${data.synced} activities`);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: () => {
      toast.error('Failed to fetch activities');
    },
  });
};
