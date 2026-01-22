import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/api';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setError('');
    const success = login(data.username, data.password);
    
    if (success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError('Invalid credentials. Please use HR/HR');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8 rounded-lg">
          <Box className="text-center mb-6">
            <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-2">
              HR Management System
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Please login to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              autoComplete="username"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="mt-6 bg-blue-600 hover:bg-blue-700"
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Login
            </Button>

            <Box className="mt-4 p-3 bg-blue-50 rounded">
              <Typography variant="caption" className="text-gray-600">
                <strong>Demo Credentials:</strong>
                <br />
                Username: HR
                <br />
                Password: HR
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
