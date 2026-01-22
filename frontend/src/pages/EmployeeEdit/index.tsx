import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { UPDATE_EMPLOYEE } from '../../graphql/mutations';
import './EmployeeEdit.css';

interface EmployeeFormData {
  name: string;
  role: string;
  contact: string;
}

interface EmployeeEditProps {
  employee: any;
  onCancel: () => void;
  onComplete: () => void;
}

const EmployeeEdit: React.FC<EmployeeEditProps> = ({
  employee,
  onCancel,
  onComplete,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    defaultValues: {
      name: employee.name,
      role: employee.role,
      contact: employee.contact,
    },
  });

  const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      onComplete();
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    updateEmployee({
      variables: {
        id: employee.id,
        input: data,
      },
    });
  };

  return (
    <Box className="employee-edit-container">
      <Paper className="edit-paper">
        <Typography variant="h5" className="edit-title">
          Edit Employee
        </Typography>

        {error && (
          <Alert severity="error" className="error-alert">
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
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
            label="Contact"
            {...register('contact', { 
              required: 'Contact is required',
              pattern: {
                value: /^[+]?[\d\s-()]+$/,
                message: 'Invalid contact number'
              }
            })}
            error={!!errors.contact}
            helperText={errors.contact?.message}
            margin="normal"
          />

          <Box className="form-actions">
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployeeEdit;
