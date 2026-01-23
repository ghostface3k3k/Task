import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Business as BusinessIcon, People as PeopleIcon } from '@mui/icons-material';
import { GET_DEPARTMENTS } from '../../lib/graphql/queries';
import { Department } from '../../types';

const DepartmentsList: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading departments: {error.message}</Alert>;
  }

  const departments: Department[] = data?.getDepartments || [];

  return (
    <Box>
      <Typography variant="h4" className="font-poppins font-semibold mb-6" sx={{ color: '#151d48' }}>
        Departments
      </Typography>
      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid xs={12} sm={6} md={4} key={dept.id}>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(237, 237, 237, 0.8)',
                },
              }}
              onClick={() => navigate(`/departments/${dept.id}`)}
            >
              <CardContent className="p-6">
                <Box className="flex items-center justify-between mb-4">
                  <BusinessIcon sx={{ fontSize: 40, color: '#0f6bbc' }} />
                  <Chip
                    label={dept.status ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      backgroundColor: dept.status ? '#16c098' : '#737791',
                      color: 'white',
                      fontFamily: 'Poppins',
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  className="font-poppins font-semibold mb-2 capitalize"
                  sx={{ color: '#151d48' }}
                >
                  {dept.name}
                </Typography>
                <Typography variant="body2" className="text-text-secondary mb-3">
                  {dept.description}
                </Typography>
                <Box className="flex items-center justify-between text-sm">
                  <Box className="flex items-center">
                    <PeopleIcon sx={{ fontSize: 18, mr: 0.5, color: '#737791' }} />
                    <Typography variant="body2" sx={{ color: '#737791' }}>
                      {dept.employeesNumber} employees
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#737791' }}>
                    Code: {dept.code}
                  </Typography>
                </Box>
                <Box className="mt-3 pt-3 border-t border-gray-200">
                  <Typography variant="caption" sx={{ color: '#737791' }}>
                    Manager: <span className="font-medium capitalize">{dept.manager}</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DepartmentsList;
