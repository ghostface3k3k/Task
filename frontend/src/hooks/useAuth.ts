import { useState, useEffect } from 'react';
import { AUTH_TOKEN_KEY, LOGIN_CREDENTIALS } from '../constants/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      username === LOGIN_CREDENTIALS.username &&
      password === LOGIN_CREDENTIALS.password
    ) {
      const token = 'hr-token-' + Date.now();
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
