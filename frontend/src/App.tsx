import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './lib/auth/AuthContext';
import { apolloClient } from './lib/apollo/client';

// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import DepartmentsList from './pages/Departments/DepartmentsList';
import DepartmentDetails from './pages/Departments/DepartmentDetails';
import EditDepartment from './pages/Departments/EditDepartment';
import EmployeesList from './pages/Employees/EmployeesList';
import EmployeeProfile from './pages/Employees/EmployeeProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f6bbc',
      dark: '#003fad',
    },
    secondary: {
      main: '#16c098',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="departments" element={<DepartmentsList />} />
                <Route path="departments/:id" element={<DepartmentDetails />} />
                <Route path="departments/:id/edit" element={<EditDepartment />} />
                <Route path="employees" element={<EmployeesList />} />
                <Route path="employees/:id" element={<EmployeeProfile />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
