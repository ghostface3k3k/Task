import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../lib/auth/AuthContext';
import { LOGIN_MUTATION } from '../../lib/graphql/queries';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@hr.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token, data.login.user);
      navigate('/dashboard');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await loginMutation({ variables: { email, password } });
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-light"
      sx={{ backgroundColor: '#fafafa' }}
    >
      <Card className="w-full max-w-md shadow-custom" sx={{ borderRadius: '16px' }}>
        <CardContent className="p-8">
          <Box className="text-center mb-6">
            <Typography variant="h4" className="font-poppins font-semibold text-text-primary mb-2">
              HR Management System
            </Typography>
            <Typography variant="body2" className="text-text-secondary">
              Sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              className="mb-6"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#0f6bbc',
                '&:hover': { backgroundColor: '#003fad' },
                borderRadius: '8px',
                textTransform: 'none',
                fontFamily: 'Poppins',
                fontWeight: 500,
                py: 1.5,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

          <Box className="mt-4 text-center">
            <Typography variant="caption" className="text-text-secondary">
              Default: admin@hr.com / password123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
