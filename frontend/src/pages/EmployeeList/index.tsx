import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { GET_EMPLOYEES } from '../../graphql/queries';
import './EmployeeList.css';

interface Employee {
  id: string;
  name: string;
  role: string;
  contact: string;
  departmentId: string;
}

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading employees: {error.message}</Alert>;
  }

  const employees: Employee[] = data?.employees || [];
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.contact.includes(searchTerm)
  );

  const handleRowClick = (id: string) => {
    navigate(`/employee/${id}`);
  };

  return (
    <Box>
      <Box className="list-header">
        <Typography variant="h5" className="list-title">
          Employees
        </Typography>
        <TextField
          placeholder="Search employees..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-field"
        />
      </Box>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-head-row">
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow
                  key={emp.id}
                  hover
                  onClick={() => handleRowClick(emp.id)}
                  className="table-row-clickable"
                >
                  <TableCell>{emp.id}</TableCell>
                  <TableCell className="font-semibold">{emp.name}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>{emp.contact}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
