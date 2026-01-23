import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { People as PeopleIcon, Business as BusinessIcon } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Employees',
      icon: <PeopleIcon sx={{ fontSize: 48, color: '#0f6bbc' }} />,
      description: 'View and manage all employees',
      path: '/employees',
    },
    {
      title: 'Departments',
      icon: <BusinessIcon sx={{ fontSize: 48, color: '#16c098' }} />,
      description: 'View and manage departments',
      path: '/departments',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" className="font-poppins font-semibold mb-6" sx={{ color: '#151d48' }}>
        Dashboard
      </Typography>
      <Grid2 container spacing={3}>
        {cards.map((card) => (
          <Grid2 xs={12} sm={6} md={4} key={card.title}>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(237, 237, 237, 0.8)',
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <CardContent className="text-center p-8">
                <Box className="mb-4">{card.icon}</Box>
                <Typography variant="h5" className="font-poppins font-semibold mb-2" sx={{ color: '#151d48' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Dashboard;
