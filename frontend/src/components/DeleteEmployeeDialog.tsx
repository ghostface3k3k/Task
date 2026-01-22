import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE } from '../graphql/mutations';

interface DeleteEmployeeDialogProps {
  open: boolean;
  employeeId: string;
  departmentId: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({
  open,
  employeeId,
  departmentId,
  onCancel,
  onConfirm,
}) => {
  const [error, setError] = useState<string>('');

  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      onConfirm();
    },
    onError: (err) => {
      setError(err.message || 'Failed to delete employee');
    },
  });

  const handleConfirm = async () => {
    try {
      setError('');
      await deleteEmployee({
        variables: {
          departmentId,
          employeeId,
        },
      });
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <Typography>
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
