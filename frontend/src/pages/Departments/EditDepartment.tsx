import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Home as HomeIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from '../../lib/graphql/queries';

interface DepartmentFormData {
  name: string;
  description: string;
  localizationName: string;
  localizationDescription: string;
  code: number;
  manager: string;
  location: string;
  status: boolean;
}

const EditDepartment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<DepartmentFormData>();

  const { data, loading, error } = useQuery(GET_DEPARTMENT, {
    variables: { id },
  });

  const [updateDepartment, { loading: updateLoading }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      navigate(`/departments/${id}`);
    },
  });

  useEffect(() => {
    if (data?.getDepartment) {
      const dept = data.getDepartment;
      reset({
        name: dept.name,
        description: dept.description,
        localizationName: dept.localization.name,
        localizationDescription: dept.localization.description,
        code: dept.code,
        manager: dept.manager,
        location: dept.location,
        status: dept.status,
      });
    }
  }, [data, reset]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading department: {error.message}</Alert>;
  }

  const department = data?.getDepartment;

  if (!department) {
    return <Alert severity="error">Department not found</Alert>;
  }

  const onSubmit = (formData: DepartmentFormData) => {
    updateDepartment({
      variables: {
        id,
        input: {
          name: formData.name,
          description: formData.description,
          localization: {
            name: formData.localizationName,
            description: formData.localizationDescription,
          },
          code: Number(formData.code),
          manager: formData.manager,
          location: formData.location,
          status: formData.status,
        },
      },
    });
  };

  return (
    <Box>
      <Breadcrumbs className="mb-4" sx={{ color: '#737791' }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/departments')}>
          Departments
        </Link>
        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/departments/${id}`)}>
          {department.name}
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>

      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)' }}>
        <CardContent className="p-6">
          <Typography variant="h4" className="font-poppins font-semibold mb-6 capitalize" sx={{ color: '#151d48' }}>
            Edit Department: {department.name}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Department Name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: 'Code is required', min: 1 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Department Code"
                      type="number"
                      error={!!errors.code}
                      helperText={errors.code?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Description"
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="localizationName"
                  control={control}
                  rules={{ required: 'Localization name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Localization Name (Arabic)"
                      error={!!errors.localizationName}
                      helperText={errors.localizationName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="localizationDescription"
                  control={control}
                  rules={{ required: 'Localization description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Localization Description (Arabic)"
                      error={!!errors.localizationDescription}
                      helperText={errors.localizationDescription?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="manager"
                  control={control}
                  rules={{ required: 'Manager is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Manager"
                      error={!!errors.manager}
                      helperText={errors.manager?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: 'Location is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Location"
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} className="flex gap-3 justify-end">
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => navigate(`/departments/${id}`)}
                  sx={{
                    borderColor: '#737791',
                    color: '#737791',
                    textTransform: 'none',
                    fontFamily: 'Poppins',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={updateLoading}
                  sx={{
                    backgroundColor: '#0f6bbc',
                    '&:hover': { backgroundColor: '#003fad' },
                    textTransform: 'none',
                    fontFamily: 'Poppins',
                  }}
                >
                  {updateLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditDepartment;
