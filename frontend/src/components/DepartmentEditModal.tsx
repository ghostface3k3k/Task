import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { UPDATE_DEPARTMENT } from '../graphql/mutations';

interface Department {
  id: string;
  name: string;
  description: string;
  localization: {
    name: string;
    description: string;
  };
  manager: string;
  location: string;
  status: boolean;
}

interface DepartmentEditModalProps {
  open: boolean;
  department: Department;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  localizationName: string;
  localizationDescription: string;
  manager: string;
  location: string;
  status: boolean;
}

export const DepartmentEditModal: React.FC<DepartmentEditModalProps> = ({
  open,
  department,
  onClose,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const status = watch('status');

  useEffect(() => {
    if (department && open) {
      reset({
        name: department.name,
        description: department.description,
        localizationName: department.localization.name,
        localizationDescription: department.localization.description,
        manager: department.manager,
        location: department.location,
        status: department.status,
      });
    }
  }, [department, open, reset]);

  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      toast.success('Department updated successfully');
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update department: ${error.message}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateDepartment({
        variables: {
          id: department.id,
          input: {
            name: data.name,
            description: data.description,
            localization: {
              name: data.localizationName,
              description: data.localizationDescription,
            },
            manager: data.manager,
            location: data.location,
            status: data.status,
          },
        },
      });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" className="font-semibold">
          Edit Department
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="Department Name (English)"
              {...register('name', { required: 'Department name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Department Name (Arabic)"
              {...register('localizationName', { required: 'Arabic name is required' })}
              error={!!errors.localizationName}
              helperText={errors.localizationName?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Description (English)"
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              label="Description (Arabic)"
              {...register('localizationDescription', {
                required: 'Arabic description is required',
              })}
              error={!!errors.localizationDescription}
              helperText={errors.localizationDescription?.message}
              margin="normal"
              multiline
              rows={3}
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
              control={
                <Switch
                  checked={status || false}
                  onChange={(e) => setValue('status', e.target.checked)}
                  color="primary"
                />
              }
              label={status ? 'Active' : 'Inactive'}
              className="mt-2"
            />
          </Box>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={onClose} disabled={loading} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            className="bg-blue-600 hover:bg-blue-700"
            sx={{ textTransform: 'none' }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
