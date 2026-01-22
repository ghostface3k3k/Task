import React, { useState } from 'react';
import { Box, Tabs, Tab, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DepartmentList from '../DepartmentList';
import EmployeeList from '../EmployeeList';
import './Dashboard.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <Container maxWidth="lg">
          <Box className="header-content">
            <Typography variant="h4" className="header-title">
              HR Management System
            </Typography>
            <Box className="header-actions">
              <Typography variant="body1" className="user-name">
                Welcome, {user.name || 'User'}
              </Typography>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="dashboard-content">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="Departments" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Employees" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <DepartmentList />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <EmployeeList />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default Dashboard;
