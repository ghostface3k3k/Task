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
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { GET_ALL_DEPARTMENTS, DELETE_EMPLOYEE } from '../graphql/queries';
import AddEmployeeModal from './AddEmployeeModal';

interface Employee {
  id: string;
  name: string;
  role: string;
  contact: string;
}

interface Department {
  id: string;
  name: string;
  employees: Employee[];
}

const EmployeesSection: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_DEPARTMENTS);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = async (employeeId: string, employeeName: string) => {
    if (window.confirm(`Are you sure you want to delete employee ${employeeName}?`)) {
      try {
        await deleteEmployee({
          variables: { employeeId },
        });
      } catch (err) {
        console.error('Error deleting employee:', err);
      }
    }
  };

  const handleAddEmployee = () => {
    if (!selectedDeptId) {
      alert('Please select a department first');
      return;
    }
    setModalOpen(true);
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
        Error loading employees: {error.message}
      </Alert>
    );
  }

  const departments: Department[] = data?.getAllDepartments || [];
  const selectedDept = departments.find(d => d.id === selectedDeptId);
  const employees = selectedDept?.employees || [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          Employees
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          disabled={!selectedDeptId}
        >
          Add Employee
        </Button>
      </Box>

      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>Select Department</InputLabel>
          <Select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            label="Select Department"
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedDeptId && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No employees in this department
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>{emp.contact}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(emp.id, emp.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddEmployeeModal
        open={modalOpen}
        departmentId={selectedDeptId}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          refetch();
        }}
      />
    </Box>
  );
};

export default EmployeesSection;
