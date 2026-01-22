import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { GET_ALL_DEPARTMENTS, UPDATE_DEPARTMENT } from '../graphql/queries';
import EditDepartmentModal from './EditDepartmentModal';

interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  manager: string;
  location: string;
  employeesNumber: number;
  status: string;
  parentDepartment?: string;
  createdAt: string;
}

const DepartmentsSection: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_DEPARTMENTS);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      // Note: delete functionality not implemented in backend
      alert('Delete functionality can be added to backend if needed');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleSave = async (updatedData: Partial<Department>) => {
    if (selectedDepartment) {
      try {
        await updateDepartment({
          variables: {
            id: selectedDepartment.id,
            input: updatedData,
          },
        });
        handleModalClose();
      } catch (err) {
        console.error('Error updating department:', err);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading departments: {error.message}
      </Alert>
    );
  }

  const departments: Department[] = data?.getAllDepartments || [];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Departments
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell>{dept.code}</TableCell>
                <TableCell>
                  <Typography variant="body1">{dept.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {dept.localization}
                  </Typography>
                </TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>{dept.manager}</TableCell>
                <TableCell>{dept.location}</TableCell>
                <TableCell>{dept.employeesNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={dept.status}
                    color={dept.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(dept)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(dept.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedDepartment && (
        <EditDepartmentModal
          open={modalOpen}
          department={selectedDepartment}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default DepartmentsSection;
