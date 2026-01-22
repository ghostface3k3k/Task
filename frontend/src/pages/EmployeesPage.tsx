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
  Add as AddIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { GET_EMPLOYEES, GET_ALL_DEPARTMENTS } from '../graphql/queries';
import { DELETE_EMPLOYEE, ADD_EMPLOYEE } from '../graphql/mutations';
import { EmployeesList } from '../components/EmployeesList';
import { AddEmployeeModal } from '../components/AddEmployeeModal';

/**
 * EmployeesPage - Display all employees with add/delete functionality
 * Shows employee list and allows adding new employees through modal
 */
export const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: employeesData, loading: employeesLoading, error: employeesError, refetch } = useQuery(GET_EMPLOYEES);
  const { data: departmentsData } = useQuery(GET_ALL_DEPARTMENTS);
  const [deleteEmployee, { loading: deleteLoading }] = useMutation(DELETE_EMPLOYEE);
  const [addEmployee] = useMutation(ADD_EMPLOYEE);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleBack = useCallback(() => {
    navigate('/hr-manage');
  }, [navigate]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteEmployee({
        variables: { id },
      });
      setSnackbar({ open: true, message: 'Employee deleted successfully!', severity: 'success' });
      refetch();
    } catch (err) {
      console.error('Error deleting employee:', err);
      setSnackbar({ open: true, message: 'Failed to delete employee', severity: 'error' });
    }
  }, [deleteEmployee, refetch]);

  const handleAddEmployee = useCallback(async (data: any) => {
    try {
      await addEmployee({
        variables: {
          input: {
            ...data,
            salary: parseFloat(data.salary),
          },
        },
      });
      setSnackbar({ open: true, message: 'Employee added successfully!', severity: 'success' });
      refetch();
    } catch (err) {
      console.error('Error adding employee:', err);
      setSnackbar({ open: true, message: 'Failed to add employee', severity: 'error' });
      throw err;
    }
  }, [addEmployee, refetch]);

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
            Employees Management
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Employees
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Employee
          </Button>
        </Box>

        {employeesLoading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {employeesError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading employees: {employeesError.message}
          </Alert>
        )}

        {employeesData?.employees && (
          <EmployeesList
            employees={employeesData.employees}
            onDelete={handleDelete}
            loading={deleteLoading}
          />
        )}
      </Container>

      <AddEmployeeModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddEmployee}
        departments={departmentsData?.departments || []}
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
