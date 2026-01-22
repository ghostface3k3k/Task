import React, { useState, useCallback, memo } from 'react';
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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteEmployeeDialog } from './DeleteEmployeeDialog';

interface Employee {
  id: number;
  name: string;
  role: string;
  contact: string;
}

interface EmployeesTableProps {
  employees: Employee[];
  departmentId: string;
  onEmployeeDeleted: () => void;
}

const EmployeeRow = memo(
  ({
    employee,
    onDelete,
  }: {
    employee: Employee;
    onDelete: (id: number) => void;
  }) => {
    const handleDelete = useCallback(() => {
      onDelete(employee.id);
    }, [employee.id, onDelete]);

    return (
      <TableRow hover className="hover:bg-blue-50">
        <TableCell className="font-medium">{employee.id}</TableCell>
        <TableCell>{employee.name}</TableCell>
        <TableCell>{employee.role}</TableCell>
        <TableCell>{employee.contact}</TableCell>
        <TableCell align="right">
          <IconButton
            color="error"
            onClick={handleDelete}
            size="small"
            aria-label="delete employee"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
);

EmployeeRow.displayName = 'EmployeeRow';

export const EmployeesTable: React.FC<EmployeesTableProps> = memo(
  ({ employees, departmentId, onEmployeeDeleted }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
      null
    );

    const handleDeleteClick = useCallback((employeeId: number) => {
      setSelectedEmployeeId(employeeId);
      setDeleteDialogOpen(true);
    }, []);

    const handleDeleteCancel = useCallback(() => {
      setDeleteDialogOpen(false);
      setSelectedEmployeeId(null);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
      setDeleteDialogOpen(false);
      setSelectedEmployeeId(null);
      onEmployeeDeleted();
    }, [onEmployeeDeleted]);

    if (!employees || employees.length === 0) {
      return (
        <Box className="p-4 text-center">
          <Typography variant="body1" className="text-gray-500">
            No employees found in this department.
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead className="bg-blue-600">
              <TableRow>
                <TableCell className="text-white font-bold">ID</TableCell>
                <TableCell className="text-white font-bold">
                  Employee Name
                </TableCell>
                <TableCell className="text-white font-bold">Role</TableCell>
                <TableCell className="text-white font-bold">
                  Contact Information
                </TableCell>
                <TableCell align="right" className="text-white font-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow
                  key={employee.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                >
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.contact}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(employee.id)}
                      size="small"
                      aria-label="delete employee"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedEmployeeId && (
          <DeleteEmployeeDialog
            open={deleteDialogOpen}
            employeeId={selectedEmployeeId.toString()}
            departmentId={departmentId}
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </>
    );
  }
);

EmployeesTable.displayName = 'EmployeesTable';
