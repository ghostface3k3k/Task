import { memo, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { Employee } from '../types';
import EmployeeRow from './EmployeeRow';
import DeleteConfirmation from './DeleteConfirmation';

interface EmployeesListProps {
  employees: Employee[];
  onDeleteEmployee: (employeeId: string) => void;
}

const EmployeesList: React.FC<EmployeesListProps> = memo(
  ({ employees, onDeleteEmployee }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const handleDeleteClick = useCallback((id: string) => {
      const employee = employees.find((emp) => emp.id === id);
      if (employee) {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
      }
    }, [employees]);

    const handleDeleteConfirm = useCallback(() => {
      if (selectedEmployee) {
        onDeleteEmployee(selectedEmployee.id);
        setDeleteDialogOpen(false);
        setSelectedEmployee(null);
      }
    }, [selectedEmployee, onDeleteEmployee]);

    const handleDeleteCancel = useCallback(() => {
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }, []);

    return (
      <>
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact Information</TableCell>
                <TableCell>KPI</TableCell>
                <TableCell>Actions</TableCell>
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
        {selectedEmployee && (
          <DeleteConfirmation
            open={deleteDialogOpen}
            employeeName={selectedEmployee.name}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </>
    );
  }
);

EmployeesList.displayName = 'EmployeesList';

export default EmployeesList;
