import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { GET_DEPARTMENT } from '../../graphql/queries';
import { DELETE_EMPLOYEE } from '../../graphql/mutations';
import DepartmentEdit from '../DepartmentEdit';
import './index.css';

interface Employee {
  id: string;
  name: string;
  role: string;
  contact: string;
}

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id },
    skip: !id,
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    },
  });

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading department: {error.message}</Alert>;
  }

  if (!data?.department) {
    return <Alert severity="warning">Department not found</Alert>;
  }

  const department = data.department;

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployeeToDelete(employeeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete && id) {
      deleteEmployee({
        variables: {
          departmentId: id,
          employeeId: employeeToDelete,
        },
      });
    }
  };

  const handleEditComplete = () => {
    setIsEditMode(false);
    refetch();
  };

  if (isEditMode) {
    return (
      <DepartmentEdit
        department={department}
        onCancel={() => setIsEditMode(false)}
        onComplete={handleEditComplete}
      />
    );
  }

  return (
    <Box className="department-details-container">
      <Box className="details-header">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          className="back-button"
        >
          Back to Dashboard
        </Button>
        <Button
          startIcon={<Edit />}
          variant="contained"
          color="primary"
          onClick={() => setIsEditMode(true)}
        >
          Edit Department
        </Button>
      </Box>

      <Paper className="details-paper">
        <Typography variant="h4" className="department-name">
          {department.name}
        </Typography>
        
        <Box className="department-info">
          <Box className="info-row">
            <Typography className="info-label">Manager:</Typography>
            <Typography className="info-value">{department.manager}</Typography>
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Code:</Typography>
            <Typography className="info-value">{department.code}</Typography>
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Location:</Typography>
            <Typography className="info-value">{department.location}</Typography>
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Status:</Typography>
            <Chip
              label={department.status ? 'Active' : 'Inactive'}
              color={department.status ? 'success' : 'default'}
              size="small"
            />
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Description:</Typography>
            <Typography className="info-value">{department.description}</Typography>
          </Box>
          
          {department.localization && (
            <>
              <Box className="info-row">
                <Typography className="info-label">Arabic Name:</Typography>
                <Typography className="info-value">{department.localization.name}</Typography>
              </Box>
              <Box className="info-row">
                <Typography className="info-label">Arabic Description:</Typography>
                <Typography className="info-value">{department.localization.description}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>

      <Paper className="employees-paper">
        <Typography variant="h5" className="section-title">
          Assigned Employees
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-head-row">
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {department.employees && department.employees.length > 0 ? (
                department.employees.map((employee: Employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell className="font-semibold">{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.contact}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No employees assigned
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this employee from the department?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentDetails;
