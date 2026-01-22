import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
}

interface ParentDepartment {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  status: string;
  createdAt: string;
  manager?: Manager;
  location?: Location;
  parentDepartment?: ParentDepartment;
  employees?: Employee[];
}

interface DepartmentViewProps {
  department: Department;
}

/**
 * DepartmentView component to display all department information
 * Shows department details, manager, location, employees, and metadata
 */
export const DepartmentView: React.FC<DepartmentViewProps> = React.memo(({ department }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {department.name}
          </Typography>
          <Chip
            label={department.status}
            color={department.status === 'ACTIVE' ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {department.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Department Code
            </Typography>
            <Typography variant="body1" gutterBottom>
              {department.code}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              Localization
            </Typography>
            <Typography variant="body1" gutterBottom>
              {department.localization}
            </Typography>

            {department.manager && (
              <>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  <PersonIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Manager
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {department.manager.firstName} {department.manager.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {department.manager.email}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {department.location && (
              <>
                <Typography variant="subtitle2" color="text.secondary">
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Location
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {department.location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {department.location.address}
                </Typography>
              </>
            )}

            {department.parentDepartment && (
              <>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Parent Department
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {department.parentDepartment.name}
                </Typography>
              </>
            )}

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              <CalendarIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
              Created At
            </Typography>
            <Typography variant="body1">
              {formatDate(department.createdAt)}
            </Typography>
          </Grid>
        </Grid>

        {department.employees && department.employees.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Employees ({department.employees.length})
            </Typography>
            <List dense>
              {department.employees.map((employee) => (
                <ListItem key={employee.id}>
                  <ListItemText
                    primary={`${employee.firstName} ${employee.lastName}`}
                    secondary={`${employee.position} - ${employee.email}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
});

DepartmentView.displayName = 'DepartmentView';
