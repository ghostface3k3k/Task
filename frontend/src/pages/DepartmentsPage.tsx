import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { GET_ALL_DEPARTMENTS } from '../graphql/queries';
import { UPDATE_DEPARTMENT } from '../graphql/mutations';
import { DepartmentView } from '../components/DepartmentView';
import { DepartmentEditModal } from '../components/DepartmentEditModal';

interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  status: string;
  createdAt: string;
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  location?: {
    id: string;
    name: string;
    address: string;
  };
  parentDepartment?: {
    id: string;
    name: string;
  };
  employees?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
  }>;
}

/**
 * DepartmentsPage - Display all departments with edit functionality
 * Shows department details and allows editing through modal
 */
export const DepartmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data, loading, error, refetch } = useQuery(GET_ALL_DEPARTMENTS);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleBack = useCallback(() => {
    navigate('/hr-manage');
  }, [navigate]);

  const handleEdit = useCallback((department: Department) => {
    setSelectedDepartment(department);
    setEditModalOpen(true);
  }, []);

  const handleSaveDepartment = useCallback(async (id: string, data: any) => {
    try {
      await updateDepartment({
        variables: {
          id,
          input: data,
        },
      });
      setSnackbar({ open: true, message: 'Department updated successfully!', severity: 'success' });
      refetch();
    } catch (err) {
      console.error('Error updating department:', err);
      setSnackbar({ open: true, message: 'Failed to update department', severity: 'error' });
      throw err;
    }
  }, [updateDepartment, refetch]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Departments Management
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Departments
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading departments: {error.message}
          </Alert>
        )}

        {data?.departments && data.departments.length === 0 && (
          <Alert severity="info">No departments found</Alert>
        )}

        {data?.departments?.map((department: Department) => (
          <Box key={department.id} sx={{ mb: 2, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(department)}
              >
                Edit
              </Button>
            </Box>
            <DepartmentView department={department} />
          </Box>
        ))}
      </Container>

      <DepartmentEditModal
        open={editModalOpen}
        department={selectedDepartment}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveDepartment}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
