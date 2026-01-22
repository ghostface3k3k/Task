import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Logout, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/api';

export const HRDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, getUser } = useAuth();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleNavigateToDepartment = () => {
    navigate('/department/1');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <DashboardIcon className="mr-2" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HR Management System
          </Typography>
          <Typography variant="body2" className="mr-4">
            Welcome, {user?.username || 'User'}
          </Typography>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-8">
        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
          <Link underline="hover" color="inherit" href="#">
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>

        <Typography variant="h4" className="font-bold mb-6 text-gray-800">
          Dashboard
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Paper className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleNavigateToDepartment}>
            <Box className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                  Departments
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  View and manage departments
                </Typography>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </Box>
          </Paper>

          <Paper className="p-6 hover:shadow-lg transition-shadow">
            <Box className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                  Employees
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Manage employee records
                </Typography>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </Box>
          </Paper>
        </div>

        <Box className="mt-8">
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigateToDepartment}
            className="bg-blue-600 hover:bg-blue-700"
            sx={{ textTransform: 'none', px: 4 }}
          >
            View Finance Department
          </Button>
        </Box>
      </Container>
    </div>
  );
};
