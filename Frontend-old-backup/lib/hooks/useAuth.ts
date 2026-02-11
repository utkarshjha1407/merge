import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import apiService from '../api-service';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Check if user is logged in
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

  // Get current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => apiService.user.getCurrentUser(),
    enabled: isLoggedIn,
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    user: user?.data,
    isLoggedIn,
    isLoading,
    error,
    logout: logout.mutate,
  };
}
