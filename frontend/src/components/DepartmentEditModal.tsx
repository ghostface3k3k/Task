import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_DEPARTMENT } from '../graphql/mutations';

interface DepartmentFormData {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  manager: string;
  location: string;
  status: boolean;
}

interface DepartmentEditModalProps {
  open: boolean;
  onClose: () => void;
  department: any;
  onSuccess: () => void;
}

export const DepartmentEditModal: React.FC<DepartmentEditModalProps> = ({
  open,
  onClose,
  department,
  onSuccess,
}) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DepartmentFormData>();

  const status = watch('status');

  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      setSuccess('Department updated successfully!');
      setTimeout(() => {
        setSuccess('');
        onSuccess();
        onClose();
      }, 1500);
    },
    onError: (err) => {
      setError(err.message || 'Failed to update department');
    },
  });

  useEffect(() => {
    if (department && open) {
      reset({
        name: department.name || '',
        nameAr: department.localization?.name || '',
        description: department.description || '',
        descriptionAr: department.localization?.description || '',
        manager: department.manager || '',
        location: department.location || '',
        status: department.status || false,
      });
    }
  }, [department, open, reset]);

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      setError('');
      await updateDepartment({
        variables: {
          id: department.id,
          input: {
            name: data.name,
            description: data.description,
            localization: {
              name: data.nameAr,
              description: data.descriptionAr,
            },
            manager: data.manager,
            location: data.location,
            status: data.status,
          },
        },
      });
    } catch (err) {
      console.error('Error updating department:', err);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      setSuccess('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-blue-600 text-white">
        Edit Department
      </DialogTitle>
      <DialogContent className="mt-4">
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department Name (English)"
                variant="outlined"
                margin="normal"
                {...register('name', {
                  required: 'Department name is required',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department Name (Arabic)"
                variant="outlined"
                margin="normal"
                {...register('nameAr', {
                  required: 'Arabic name is required',
                })}
                error={!!errors.nameAr}
                helperText={errors.nameAr?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description (English)"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                {...register('description')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description (Arabic)"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                {...register('descriptionAr')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Manager"
                variant="outlined"
                margin="normal"
                {...register('manager')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                margin="normal"
                {...register('location')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={status}
                    onChange={(e) => setValue('status', e.target.checked)}
                    color="primary"
                  />
                }
                label="Active Status"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
