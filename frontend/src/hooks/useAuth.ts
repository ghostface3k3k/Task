import { useCallback } from 'react';
import { STORAGE_KEYS, AUTH_CREDENTIALS } from '../constants/api';

interface AuthUser {
  username: string;
}

export const useAuth = () => {
  const login = useCallback((username: string, password: string): boolean => {
    if (username === AUTH_CREDENTIALS.USERNAME && password === AUTH_CREDENTIALS.PASSWORD) {
      const user: AuthUser = { username };
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'authenticated');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'authenticated';
  }, []);

  const getUser = useCallback((): AuthUser | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr) as AuthUser;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
  };
};
