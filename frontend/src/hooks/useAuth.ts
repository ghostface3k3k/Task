import { useState, useEffect, useCallback } from 'react';
import { CREDENTIALS } from '../constants/credentials';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

/**
 * Custom hook for managing authentication state
 * Uses localStorage to persist auth token
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
  });

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
      });
    }
  }, []);

  /**
   * Login with username and password
   * Validates against hardcoded credentials
   */
  const login = useCallback((username: string, password: string): boolean => {
    if (username === CREDENTIALS.USERNAME && password === CREDENTIALS.PASSWORD) {
      // Generate a simple token (in production, this would come from backend)
      const token = `token_${Date.now()}`;
      localStorage.setItem('authToken', token);
      setAuthState({
        isAuthenticated: true,
        token,
      });
      return true;
    }
    return false;
  }, []);

  /**
   * Logout and clear auth state
   */
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
    login,
    logout,
  };
};
