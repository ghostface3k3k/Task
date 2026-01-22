import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import {
  GET_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_EMPLOYEE,
} from '../graphql/queries';
import type { Department, UpdateDepartmentInput } from '../types';
import EmployeesList from '../components/EmployeesList';
import DepartmentEdit from '../components/DepartmentEdit';

const DepartmentPage: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery<{
    getDepartment: Department;
  }>(GET_DEPARTMENT, {
    variables: { id: '1' },
  });

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      refetch();
      setEditDialogOpen(false);
    },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleEditClick = useCallback(() => {
    setEditDialogOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditDialogOpen(false);
  }, []);

  const handleEditSave = useCallback(
    (input: UpdateDepartmentInput) => {
      updateDepartment({
        variables: {
          id: '1',
          input,
        },
      });
    },
    [updateDepartment]
  );

  const handleDeleteEmployee = useCallback(
    (employeeId: string) => {
      deleteEmployee({
        variables: {
          departmentId: '1',
          employeeId,
        },
      });
    },
    [deleteEmployee]
  );

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" className="mt-4">
          Error loading department: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data?.getDepartment) {
    return (
      <Container>
        <Typography className="mt-4">Department not found</Typography>
      </Container>
    );
  }

  const department = data.getDepartment;

  return (
    <Container maxWidth="lg" className="py-8">
      <Card className="mb-4">
        <CardContent>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h4" className="font-bold">
              Department Overview
            </Typography>
            <Button variant="contained" onClick={handleEditClick}>
              Edit Department
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Code
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Name (EN)
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.nameEn}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Name (AR)
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.nameAr}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Manager
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.manager}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Location
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.location}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Status
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Employees Count
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {department.employees.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Created At
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {new Date(department.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" className="mb-2 font-semibold">
        Assigned Employees
      </Typography>
      <EmployeesList
        employees={department.employees}
        onDeleteEmployee={handleDeleteEmployee}
      />

      {editDialogOpen && (
        <DepartmentEdit
          open={editDialogOpen}
          department={department}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}
    </Container>
  );
};

export default DepartmentPage;
