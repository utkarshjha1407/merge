import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    console.log('[API] Request to:', config.url);
    console.log('[API] Token present:', !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API] Authorization header set');
    } else {
      console.log('[API] No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('[API] Response error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.log('[API] 401 Unauthorized');
      // Don't redirect if we're on the auth callback page (token might be processing)
      if (!window.location.pathname.includes('/auth/callback')) {
        console.log('[API] Clearing token and redirecting to home');
        localStorage.removeItem('auth_token');
        window.location.href = '/';
      } else {
        console.log('[API] On callback page, not redirecting');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
