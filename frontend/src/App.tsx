import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { CircularProgress, Box } from '@mui/material';
import { apolloClient } from './graphql/client';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AUTH_TOKEN_KEY } from './constants/api';

// Lazy load pages for performance
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const HRDashboard = lazy(() =>
  import('./pages/HRDashboard').then((module) => ({
    default: module.HRDashboard,
  }))
);

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

// Loading component
const LoadingFallback = () => (
  <Box className="flex justify-center items-center min-h-screen">
    <CircularProgress />
  </Box>
);

function App() {
  const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <HRDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
