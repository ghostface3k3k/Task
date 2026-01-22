import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
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
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Download as DownloadIcon,
  Logout,
  ArrowBack,
} from '@mui/icons-material';
import { GET_DEPARTMENT } from '../graphql/queries';
import { EmployeesTable } from '../components/EmployeesTable';
import { DepartmentEditModal } from '../components/DepartmentEditModal';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/api';

interface Department {
  id: string;
  name: string;
  description: string;
  localization: {
    name: string;
    description: string;
  };
  code: number;
  manager: string;
  location: string;
  employeesNumber: number;
  status: boolean;
  parentDepartment: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  employees: Array<{
    id: number;
    name: string;
    role: string;
    contact: string;
  }>;
}

export const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logout, getUser } = useAuth();
  const user = getUser();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id: id || '1' },
    fetchPolicy: 'network-only',
  });

  const handleLogout = useCallback(() => {
    logout();
    navigate(ROUTES.LOGIN);
  }, [logout, navigate]);

  const handleEditClick = useCallback(() => {
    setEditModalOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleEditSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEmployeeDeleted = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleExport = useCallback(() => {
    if (data?.department) {
      const json = JSON.stringify(data.department, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `department-${data.department.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, [data]);

  const department: Department | null = useMemo(() => data?.department || null, [data]);

  const formattedDate = useMemo(() => {
    if (!department?.createdAt) return '';
    return new Date(department.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [department]);

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Alert severity="error">Error loading department: {error.message}</Alert>
      </Container>
    );
  }

  if (!department) {
    return (
      <Container className="py-8">
        <Alert severity="warning">Department not found</Alert>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => navigate(ROUTES.DASHBOARD)}
            sx={{ textTransform: 'none', mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Department Details
          </Typography>
          <Typography variant="body2" className="mr-4">
            {user?.username || 'User'}
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
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            sx={{ cursor: 'pointer' }}
          >
            Dashboard
          </Link>
          <Typography color="text.primary">Department</Typography>
          <Typography color="text.primary">{department.name}</Typography>
        </Breadcrumbs>

        {/* Department Information */}
        <Paper className="p-6 mb-6 shadow-md">
          <Box className="flex justify-between items-start mb-4">
            <div>
              <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                {department.name}
              </Typography>
              <Chip
                label={department.status ? 'Active' : 'Inactive'}
                color={department.status ? 'success' : 'default'}
                size="small"
              />
            </div>
            <Box className="flex gap-2">
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                sx={{ textTransform: 'none' }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700"
                sx={{ textTransform: 'none' }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Divider className="my-4" />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Department Code
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {department.code}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Manager
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {department.manager}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Location
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {department.location}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Number of Employees
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {department.employeesNumber}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Description (English)
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {department.description}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Arabic Name
                </Typography>
                <Typography variant="body1" className="font-medium" dir="rtl">
                  {department.localization.name}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Description (Arabic)
                </Typography>
                <Typography variant="body1" className="font-medium" dir="rtl">
                  {department.localization.description}
                </Typography>
              </Box>

              <Box className="mb-4">
                <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                  Created At
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {formattedDate}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {department.parentDepartment && (
            <Box className="mt-4 p-3 bg-blue-50 rounded">
              <Typography variant="caption" className="text-gray-600 uppercase font-semibold">
                Parent Department
              </Typography>
              <Typography variant="body1" className="font-medium">
                {department.parentDepartment.name}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Employees Table */}
        <Box className="mb-4">
          <Typography variant="h5" className="font-bold text-gray-800 mb-4">
            Assigned Employees
          </Typography>
        </Box>

        <EmployeesTable
          employees={department.employees}
          departmentId={department.id}
          onEmployeeDeleted={handleEmployeeDeleted}
        />
      </Container>

      {/* Edit Modal */}
      {editModalOpen && (
        <DepartmentEditModal
          open={editModalOpen}
          department={department}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};
