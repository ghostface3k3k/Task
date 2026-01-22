import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GET_DEPARTMENT } from '../graphql/queries';
import { DepartmentEditModal } from '../components/DepartmentEditModal';
import { EmployeesTable } from '../components/EmployeesTable';

export const DepartmentPage: React.FC = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const departmentId = '1'; // Default department ID

  const { data, loading, error, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId },
  });

  const department = useMemo(() => data?.department, [data]);

  const handleEditClick = useCallback(() => {
    setEditModalOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleEditSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEmployeeDeleted = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleExport = useCallback(() => {
    if (department) {
      const dataStr = JSON.stringify(department, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `department-${department.id}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }, [department]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container className="mt-8">
        <Alert severity="error">Error loading department: {error.message}</Alert>
      </Container>
    );
  }

  if (!department) {
    return (
      <Container className="mt-8">
        <Alert severity="warning">Department not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-8 font-poppins">
      {/* Department Header */}
      <Paper elevation={3} className="p-6 mb-6">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h4" className="font-bold text-gray-800">
            Department Details
          </Typography>
          <Box className="flex gap-2">
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              className="text-blue-600 border-blue-600"
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
              className="bg-blue-600"
            >
              Edit
            </Button>
          </Box>
        </Box>

        <Divider className="mb-4" />

        {/* Department Information Grid */}
        <Grid container spacing={3}>
          {/* English Name */}
          <Grid item xs={12} md={6}>
            <Box className="bg-blue-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Department Name (English)
              </Typography>
              <Typography variant="h6" className="text-gray-900 capitalize">
                {department.name}
              </Typography>
            </Box>
          </Grid>

          {/* Arabic Name */}
          <Grid item xs={12} md={6}>
            <Box className="bg-blue-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Department Name (Arabic)
              </Typography>
              <Typography variant="h6" className="text-gray-900" dir="rtl">
                {department.localization?.name}
              </Typography>
            </Box>
          </Grid>

          {/* Code */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Department Code
              </Typography>
              <Typography variant="body1" className="text-gray-900 font-mono">
                {department.code}
              </Typography>
            </Box>
          </Grid>

          {/* Manager */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Manager
              </Typography>
              <Typography variant="body1" className="text-gray-900 capitalize">
                {department.manager}
              </Typography>
            </Box>
          </Grid>

          {/* Location */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Location
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {department.location}
              </Typography>
            </Box>
          </Grid>

          {/* Description English */}
          <Grid item xs={12} md={6}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Description (English)
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {department.description}
              </Typography>
            </Box>
          </Grid>

          {/* Description Arabic */}
          <Grid item xs={12} md={6}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Description (Arabic)
              </Typography>
              <Typography variant="body1" className="text-gray-900" dir="rtl">
                {department.localization?.description}
              </Typography>
            </Box>
          </Grid>

          {/* Employees Number */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Number of Employees
              </Typography>
              <Typography variant="h6" className="text-gray-900">
                {department.employeesNumber}
              </Typography>
            </Box>
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Status
              </Typography>
              <Box className="mt-1">
                <Chip
                  label={department.status ? 'Active' : 'Inactive'}
                  color={department.status ? 'success' : 'error'}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>

          {/* Created At */}
          <Grid item xs={12} md={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 font-semibold">
                Created At
              </Typography>
              <Typography variant="body1" className="text-gray-900">
                {new Date(department.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>

          {/* Parent Department */}
          {department.parentDepartment && (
            <Grid item xs={12}>
              <Box className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="caption" className="text-gray-600 font-semibold">
                  Parent Department
                </Typography>
                <Typography variant="body1" className="text-gray-900">
                  {department.parentDepartment.name}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Employees Table */}
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" className="font-bold text-gray-800 mb-4">
          Assigned Employees
        </Typography>
        <EmployeesTable
          employees={department.employees || []}
          departmentId={departmentId}
          onEmployeeDeleted={handleEmployeeDeleted}
        />
      </Paper>

      {/* Edit Modal */}
      {editModalOpen && (
        <DepartmentEditModal
          open={editModalOpen}
          onClose={handleEditClose}
          department={department}
          onSuccess={handleEditSuccess}
        />
      )}
    </Container>
  );
};
