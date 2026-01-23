import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/employees')}>
          Employees
        </Link>
        <Typography color="text.primary">Employee Profile</Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          textTransform: 'none',
          color: '#0f6bbc',
        }}
      >
        Back
      </Button>

      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)', mb: 3 }}>
        <CardContent className="p-6">
          <Box className="flex items-center gap-4 mb-6">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: '#0f6bbc',
                fontSize: '2rem',
                fontFamily: 'Poppins',
              }}
            >
              EP
            </Avatar>
            <Box>
              <Typography variant="h4" className="font-poppins font-semibold" sx={{ color: '#151d48' }}>
                Employee Profile
              </Typography>
              <Typography variant="body1" sx={{ color: '#737791' }}>
                Employee ID: {id}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" className="font-poppins font-semibold mb-4" sx={{ color: '#151d48' }}>
            Personal Information
          </Typography>

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Box>
                <Typography variant="caption" sx={{ color: '#737791' }}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ color: '#151d48' }}>
                  Employee Name (ID: {id})
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box>
                <Typography variant="caption" sx={{ color: '#737791' }}>
                  Role
                </Typography>
                <Typography variant="body1" sx={{ color: '#151d48' }}>
                  Employee Role
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box>
                <Typography variant="caption" sx={{ color: '#737791' }}>
                  Contact
                </Typography>
                <Typography variant="body1" sx={{ color: '#151d48' }}>
                  Contact Information
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box>
                <Typography variant="caption" sx={{ color: '#737791' }}>
                  KPI
                </Typography>
                <Typography variant="body1" sx={{ color: '#151d48' }}>
                  Performance Score
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="body2" className="mt-6 text-center" sx={{ color: '#737791', fontStyle: 'italic' }}>
            This is a placeholder employee profile page. In a full implementation, this would show detailed employee
            information including basic information, contact details, emergency contacts, address, driving license,
            military status, and more sections as per the Figma design.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeProfile;
