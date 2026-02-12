import { useMutation, useQueryClient } from '@tanstack/react-query';
import { githubService } from '../api-service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useGithubSync = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: githubService.syncActivity,
    onSuccess: (data) => {
      const count = data.saved || data.fetched || 0;
      toast.success(`Synced ${count} activities from GitHub`);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['streak'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      // Check if user needs to complete profile
      const user = queryClient.getQueryData(['currentUser']) as any;
      if (user && !user.hasCompletedProfile) {
        // Redirect to profile completion after sync
        setTimeout(() => {
          navigate('/complete-profile');
        }, 1000);
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Failed to sync GitHub activity';
      toast.error(message);
    },
  });
};

export const useFetchCustomRange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (days: number) => githubService.fetchCustomRange(days),
    onSuccess: (data) => {
      const count = data.saved || data.fetched || 0;
      toast.success(`Fetched ${count} activities`);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Failed to fetch activities';
      toast.error(message);
    },
  });
};
