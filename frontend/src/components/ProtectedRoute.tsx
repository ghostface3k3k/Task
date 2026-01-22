import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../constants/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
