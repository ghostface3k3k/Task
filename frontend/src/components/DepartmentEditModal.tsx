import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface DepartmentFormData {
  name: string;
  description: string;
  localization: string;
  code: string;
  status: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  status: string;
}

interface DepartmentEditModalProps {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onSave: (id: string, data: DepartmentFormData) => Promise<void>;
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' },
];

/**
 * DepartmentEditModal component for editing department information
 * Pre-populates form with existing department data
 */
export const DepartmentEditModal: React.FC<DepartmentEditModalProps> = ({
  open,
  department,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    defaultValues: {
      name: '',
      description: '',
      localization: '',
      code: '',
      status: 'ACTIVE',
    },
  });

  // Pre-populate form when department changes
  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        description: department.description,
        localization: department.localization,
        code: department.code,
        status: department.status,
      });
    }
  }, [department, reset]);

  const onSubmit = async (data: DepartmentFormData) => {
    if (!department) return;

    setLoading(true);
    try {
      await onSave(department.id, data);
      onClose();
    } catch (error) {
      console.error('Error saving department:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Department Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="code"
                control={control}
                rules={{ required: 'Code is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Department Code"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="localization"
                control={control}
                rules={{ required: 'Localization is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Localization"
                    fullWidth
                    error={!!errors.localization}
                    helperText={errors.localization?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
