import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { LOGIN } from '../../graphql/mutations';
import './Login.css';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
      navigate('/dashboard');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = (data: LoginForm) => {
    setError('');
    login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <Box className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h4" component="h1" gutterBottom className="login-title">
          HR Management System
        </Typography>
        <Typography variant="subtitle1" gutterBottom className="login-subtitle">
          Sign in to continue
        </Typography>
        
        {error && <Alert severity="error" className="login-alert">{error}</Alert>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
