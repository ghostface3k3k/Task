import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as FileDownloadIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { GET_DEPARTMENT, DELETE_EMPLOYEE } from '../../lib/graphql/queries';
import { Department, Employee } from '../../types';

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id },
  });

  const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    },
  });

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading department: {error.message}</Alert>;
  }

  const department: Department = data?.getDepartment;

  if (!department) {
    return <Alert severity="error">Department not found</Alert>;
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      deleteEmployeeMutation({
        variables: {
          departmentId: id,
          employeeId: selectedEmployee.id,
        },
      });
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Employee Name', 'Role', 'Contact', 'KPI'],
      ...department.employees.map(emp => [
        emp.id,
        emp.name,
        emp.role,
        emp.contact,
        emp.kpi || 'N/A'
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${department.name}-employees.csv`;
    a.click();
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-4" sx={{ color: '#737791' }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/departments')}>
          Departments
        </Link>
        <Typography color="text.primary" className="capitalize">
          {department.name}
        </Typography>
      </Breadcrumbs>

      {/* Department Info Card */}
      <Card className="mb-6" sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)' }}>
        <CardContent className="p-6">
          <Box className="flex justify-between items-start mb-4">
            <Box>
              <Typography variant="h4" className="font-poppins font-semibold mb-2 capitalize" sx={{ color: '#151d48' }}>
                {department.name}
              </Typography>
              <Chip
                label={department.status ? 'Active' : 'Inactive'}
                size="small"
                sx={{
                  backgroundColor: department.status ? '#16c098' : '#737791',
                  color: 'white',
                  fontFamily: 'Poppins',
                }}
              />
            </Box>
            <Box className="flex gap-2">
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExport}
                sx={{
                  borderColor: '#0f6bbc',
                  color: '#0f6bbc',
                  textTransform: 'none',
                  fontFamily: 'Poppins',
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/departments/${id}/edit`)}
                sx={{
                  backgroundColor: '#0f6bbc',
                  '&:hover': { backgroundColor: '#003fad' },
                  textTransform: 'none',
                  fontFamily: 'Poppins',
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ color: '#151d48' }}>
                {department.description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Localization Name
              </Typography>
              <Typography variant="body1" sx={{ color: '#151d48' }}>
                {department.localization.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Code
              </Typography>
              <Typography variant="body1" sx={{ color: '#151d48' }}>
                {department.code}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Manager
              </Typography>
              <Typography variant="body1" className="capitalize" sx={{ color: '#151d48' }}>
                {department.manager}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Location
              </Typography>
              <Typography variant="body1" sx={{ color: '#151d48' }}>
                {department.location}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#737791' }}>
                Employees Count
              </Typography>
              <Typography variant="body1" sx={{ color: '#151d48' }}>
                {department.employeesNumber}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)' }}>
        <CardContent className="p-6">
          <Typography variant="h5" className="font-poppins font-semibold mb-4" sx={{ color: '#151d48' }}>
            Assigned Employees
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Employee Name</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Contact Information</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>KPI</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {department.employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.id}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.role}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.contact}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <Chip
                        label={employee.kpi || 'N/A'}
                        size="small"
                        sx={{
                          backgroundColor: '#16c098',
                          color: 'white',
                          fontFamily: 'Poppins',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/employees/${employee.id}`)}
                        sx={{ color: '#0f6bbc', mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteEmployee(employee)}
                        sx={{ color: '#f44336' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee {selectedEmployee?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained" sx={{ textTransform: 'none' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentDetails;
