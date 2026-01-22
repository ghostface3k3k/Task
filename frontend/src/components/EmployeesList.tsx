import React, { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Department {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  departmentId?: string;
  salary?: number;
  hireDate?: string;
  status: string;
  department?: Department;
}

interface EmployeesListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

/**
 * EmployeesList component to display employees in a table
 * Shows employee information with delete action
 */
export const EmployeesList: React.FC<EmployeesListProps> = React.memo(
  ({ employees, onDelete, loading = false }) => {
    const handleDelete = useCallback(
      (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
          onDelete(id);
        }
      },
      [onDelete]
    );

    if (employees.length === 0) {
      return (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            No employees found
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {employee.firstName} {employee.lastName}
                  </Typography>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  {employee.department ? employee.department.name : 'N/A'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    size="small"
                    color={employee.status === 'ACTIVE' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(employee.id)}
                    disabled={loading}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

EmployeesList.displayName = 'EmployeesList';
