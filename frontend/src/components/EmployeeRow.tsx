import { memo, useCallback } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Employee } from '../types';

interface EmployeeRowProps {
  employee: Employee;
  onDelete: (id: string) => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = memo(({ employee, onDelete }) => {
  const handleDelete = useCallback(() => {
    onDelete(employee.id);
  }, [employee.id, onDelete]);

  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.role}</TableCell>
      <TableCell>{employee.contactInfo}</TableCell>
      <TableCell>{employee.kpi}</TableCell>
      <TableCell>
        <IconButton size="small" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

EmployeeRow.displayName = 'EmployeeRow';

export default EmployeeRow;
