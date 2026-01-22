import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Breadcrumbs,
  Link,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../hooks/useAuth';
import { DepartmentPage } from './DepartmentPage';

export const HRDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* App Bar */}
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <BusinessIcon className="mr-2" />
          <Typography variant="h6" component="div" className="flex-grow font-bold">
            HR Management System
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            className="text-white"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Breadcrumb Navigation */}
      <Box className="bg-white shadow-sm py-3">
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="/dashboard"
              className="flex items-center hover:underline"
            >
              <HomeIcon className="mr-1" fontSize="small" />
              Dashboard
            </Link>
            <Typography color="text.primary" className="flex items-center">
              <BusinessIcon className="mr-1" fontSize="small" />
              Department Management
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <DepartmentPage />
    </div>
  );
};
