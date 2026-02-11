import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, userService } from '../api-service';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getMe,
    enabled: authService.isAuthenticated(),
    retry: false,
  });

  const login = () => {
    window.location.href = authService.getGithubAuthUrl();
  };

  const logout = () => {
    authService.removeToken();
    queryClient.clear();
    navigate('/');
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: authService.isAuthenticated(),
    login,
    logout,
  };
};

export const useHandleAuthCallback = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (token: string) => {
    console.log('[Auth] Handling callback with token');
    authService.setToken(token);
    console.log('[Auth] Token saved to localStorage');
    
    // Clear all queries and refetch
    queryClient.clear();
    console.log('[Auth] Query cache cleared');
    
    // Small delay to ensure token is saved before navigation
    setTimeout(() => {
      console.log('[Auth] Navigating to home');
      navigate('/');
    }, 100);
  };
};
