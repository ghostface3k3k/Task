import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

interface LoginFormData {
  username: string;
  password: string;
}

/**
 * LoginPage component with username/password authentication
 * Hardcoded credentials: HR/HR
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setError('');
    const success = login(data.username, data.password);

    if (success) {
      navigate('/hr-manage');
    } else {
      setError('Invalid username or password. Please use HR/HR.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box textAlign="center" mb={3}>
            <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              HR Management System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access the system
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    autoFocus
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Box>

            <Box mb={3}>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Box>

            <Button type="submit" variant="contained" fullWidth size="large">
              Sign In
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Demo Credentials: Username: <strong>HR</strong>, Password: <strong>HR</strong>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
