import { memo, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { Department, UpdateDepartmentInput } from '../types';

interface DepartmentEditProps {
  open: boolean;
  department: Department;
  onClose: () => void;
  onSave: (input: UpdateDepartmentInput) => void;
}

const DepartmentEdit: React.FC<DepartmentEditProps> = memo(
  ({ open, department, onClose, onSave }) => {
    const { control, handleSubmit } = useForm<UpdateDepartmentInput>({
      defaultValues: {
        code: department.code,
        nameEn: department.nameEn,
        nameAr: department.nameAr,
        manager: department.manager,
        location: department.location,
        status: department.status,
      },
    });

    const handleFormSubmit = useCallback(
      (data: UpdateDepartmentInput) => {
        onSave(data);
      },
      [onSave]
    );

    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Department</DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Department Code"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Status"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nameEn"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name (English)"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nameAr"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name (Arabic)"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="manager"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Manager"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);

DepartmentEdit.displayName = 'DepartmentEdit';

export default DepartmentEdit;
