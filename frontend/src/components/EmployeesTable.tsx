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
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DeleteEmployeeDialog } from './DeleteEmployeeDialog';

export interface Employee {
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

const EmployeeRow = memo(({ 
  employee, 
  onDelete 
}: { 
  employee: Employee; 
  onDelete: (id: number) => void;
}) => {
  return (
    <TableRow
      hover
      sx={{
        '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
        '&:nth-of-type(even)': { backgroundColor: '#f0f9ff' },
      }}
    >
      <TableCell className="font-medium">{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.role}</TableCell>
      <TableCell>{employee.contact}</TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          size="small"
          onClick={() => onDelete(employee.id)}
          aria-label="delete employee"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

EmployeeRow.displayName = 'EmployeeRow';

export const EmployeesTable: React.FC<EmployeesTableProps> = memo(({
  employees,
  departmentId,
  onEmployeeDeleted,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  const handleDeleteClick = useCallback((employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedEmployeeId(null);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    handleDeleteClose();
    onEmployeeDeleted();
  }, [handleDeleteClose, onEmployeeDeleted]);

  if (!employees || employees.length === 0) {
    return (
      <Box className="text-center py-8">
        <Typography variant="body1" className="text-gray-500">
          No employees found in this department
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-blue-600">
              <TableCell className="font-bold text-white">ID</TableCell>
              <TableCell className="font-bold text-white">Employee Name</TableCell>
              <TableCell className="font-bold text-white">Role</TableCell>
              <TableCell className="font-bold text-white">Contact Information</TableCell>
              <TableCell className="font-bold text-white" align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedEmployeeId !== null && (
        <DeleteEmployeeDialog
          open={deleteDialogOpen}
          employeeId={selectedEmployeeId}
          departmentId={departmentId}
          onClose={handleDeleteClose}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
});

EmployeesTable.displayName = 'EmployeesTable';
