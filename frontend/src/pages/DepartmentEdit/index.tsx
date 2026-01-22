import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';
import { UPDATE_DEPARTMENT } from '../../graphql/mutations';
import './DepartmentEdit.css';

interface DepartmentFormData {
  name: string;
  description: string;
  manager: string;
  location: string;
  status: boolean;
}

interface DepartmentEditProps {
  department: any;
  onCancel: () => void;
  onComplete: () => void;
}

const DepartmentEdit: React.FC<DepartmentEditProps> = ({
  department,
  onCancel,
  onComplete,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DepartmentFormData>({
    defaultValues: {
      name: department.name,
      description: department.description,
      manager: department.manager,
      location: department.location,
      status: department.status,
    },
  });

  const [updateDepartment, { loading, error }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      onComplete();
    },
  });

  const onSubmit = (data: DepartmentFormData) => {
    updateDepartment({
      variables: {
        id: department.id,
        input: data,
      },
    });
  };

  return (
    <Box className="department-edit-container">
      <Paper className="edit-paper">
        <Typography variant="h5" className="edit-title">
          Edit Department
        </Typography>

        {error && (
          <Alert severity="error" className="error-alert">
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <TextField
            fullWidth
            label="Department Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            {...register('description', { required: 'Description is required' })}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Manager"
            {...register('manager', { required: 'Manager is required' })}
            error={!!errors.manager}
            helperText={errors.manager?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={!!errors.location}
            helperText={errors.location?.message}
            margin="normal"
          />

          <FormControlLabel
            control={<Switch {...register('status')} defaultChecked={department.status} />}
            label="Active Status"
            className="status-switch"
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

export default DepartmentEdit;
