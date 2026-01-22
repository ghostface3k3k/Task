import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { GET_EMPLOYEE } from '../../graphql/queries';
import { DELETE_EMPLOYEE_RECORD } from '../../graphql/mutations';
import EmployeeEdit from '../EmployeeEdit';
import './index.css';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEE, {
    variables: { id },
    skip: !id,
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE_RECORD, {
    onCompleted: () => {
      navigate('/dashboard');
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
    return <Alert severity="error">Error loading employee: {error.message}</Alert>;
  }

  if (!data?.employee) {
    return <Alert severity="warning">Employee not found</Alert>;
  }

  const employee = data.employee;

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (id) {
      deleteEmployee({
        variables: { id },
      });
    }
  };

  const handleEditComplete = () => {
    setIsEditMode(false);
    refetch();
  };

  if (isEditMode) {
    return (
      <EmployeeEdit
        employee={employee}
        onCancel={() => setIsEditMode(false)}
        onComplete={handleEditComplete}
      />
    );
  }

  return (
    <Box className="employee-profile-container">
      <Box className="profile-header">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          className="back-button"
        >
          Back to Dashboard
        </Button>
        <Box className="header-actions">
          <Button
            startIcon={<Edit />}
            variant="contained"
            color="primary"
            onClick={() => setIsEditMode(true)}
          >
            Edit Employee
          </Button>
          <Button
            startIcon={<Delete />}
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete Employee
          </Button>
        </Box>
      </Box>

      <Paper className="profile-paper">
        <Typography variant="h4" className="employee-name">
          {employee.name}
        </Typography>
        
        <Box className="employee-info">
          <Box className="info-row">
            <Typography className="info-label">Employee ID:</Typography>
            <Typography className="info-value">{employee.id}</Typography>
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Role:</Typography>
            <Typography className="info-value">{employee.role}</Typography>
          </Box>
          
          <Box className="info-row">
            <Typography className="info-label">Contact:</Typography>
            <Typography className="info-value">{employee.contact}</Typography>
          </Box>
          
          {employee.department && (
            <Box className="info-row">
              <Typography className="info-label">Department:</Typography>
              <Typography className="info-value">{employee.department.name}</Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee? This action cannot be undone.
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

export default EmployeeProfile;
