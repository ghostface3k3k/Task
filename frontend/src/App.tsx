import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './graphql/client';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ROUTES } from './constants/api';
import './styles/globals.css';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const HRDashboard = lazy(() => import('./pages/HRDashboard').then(module => ({ default: module.HRDashboard })));
const DepartmentPage = lazy(() => import('./pages/DepartmentPage').then(module => ({ default: module.DepartmentPage })));

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0ea5e9',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

// Loading component
const LoadingFallback = () => (
  <Box className="min-h-screen flex items-center justify-center">
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <HRDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/department/:id"
                element={
                  <ProtectedRoute>
                    <DepartmentPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
              <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
