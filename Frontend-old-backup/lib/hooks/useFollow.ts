import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../api-service';

export function useFollowStatus(username: string) {
  return useQuery({
    queryKey: ['follow', 'status', username],
    queryFn: () => apiService.follow.getFollowStatus(username),
    enabled: !!username,
  });
}

export function useFollowers() {
  return useQuery({
    queryKey: ['follow', 'followers'],
    queryFn: () => apiService.follow.getFollowers(),
  });
}

export function useFollowing() {
  return useQuery({
    queryKey: ['follow', 'following'],
    queryFn: () => apiService.follow.getFollowing(),
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => apiService.follow.followUser(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ['follow', 'status', username] });
      queryClient.invalidateQueries({ queryKey: ['follow', 'following'] });
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => apiService.follow.unfollowUser(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ['follow', 'status', username] });
      queryClient.invalidateQueries({ queryKey: ['follow', 'following'] });
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });
}
