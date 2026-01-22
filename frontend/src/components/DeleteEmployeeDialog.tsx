import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import { DELETE_EMPLOYEE } from '../graphql/mutations';

interface DeleteEmployeeDialogProps {
  open: boolean;
  employeeId: number;
  departmentId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({
  open,
  employeeId,
  departmentId,
  onClose,
  onSuccess,
}) => {
  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      toast.success('Employee deleted successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to delete employee: ${error.message}`);
    },
  });

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee({
        variables: {
          departmentId,
          employeeId: employeeId.toString(),
        },
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-red-50">
        <Typography variant="h6" className="font-semibold text-red-700">
          Confirm Delete
        </Typography>
      </DialogTitle>
      <DialogContent className="mt-4">
        <Typography variant="body1">
          Are you sure you want to delete this employee?
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-2">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{ textTransform: 'none' }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
