import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { ADD_EMPLOYEE } from '../graphql/queries';

interface AddEmployeeFormData {
  name: string;
  role: string;
  contact: string;
}

interface AddEmployeeModalProps {
  open: boolean;
  departmentId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  open,
  departmentId,
  onClose,
  onSuccess,
}) => {
  const [error, setError] = React.useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddEmployeeFormData>();

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      reset();
      onSuccess();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const onSubmit = async (data: AddEmployeeFormData) => {
    setError('');
    try {
      await addEmployee({
        variables: {
          departmentId,
          input: data,
        },
      });
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Employee</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Employee Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Role"
            {...register('role', { required: 'Role is required' })}
            error={!!errors.role}
            helperText={errors.role?.message}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Contact (Email)"
            type="email"
            {...register('contact', { 
              required: 'Contact is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.contact}
            helperText={errors.contact?.message}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEmployeeModal;
