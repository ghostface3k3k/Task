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
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. Use HR/HR to login.');
    }
  };

  const handleInputChange = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center font-poppins">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8">
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>

            <Box className="mt-4 text-center">
              <Typography variant="caption" className="text-gray-500">
                Default credentials: Username: HR, Password: HR
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
