import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';

interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  manager: string;
  location: string;
  status: string;
}

interface EditDepartmentModalProps {
  open: boolean;
  department: Department;
  onClose: () => void;
  onSave: (data: Partial<Department>) => void;
}

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  open,
  department,
  onClose,
  onSave,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: department.name,
      description: department.description,
      localization: department.localization,
      code: department.code,
      manager: department.manager,
      location: department.location,
      status: department.status,
    },
  });

  const onSubmit = (data: Partial<Department>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Code"
                {...register('code', { required: 'Code is required' })}
                error={!!errors.code}
                helperText={errors.code?.message}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                {...register('description')}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Localization (Arabic)"
                {...register('localization')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manager"
                {...register('manager')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                {...register('location')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                {...register('status')}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDepartmentModal;
