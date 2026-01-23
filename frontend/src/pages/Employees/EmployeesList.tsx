import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { GET_EMPLOYEES } from '../../lib/graphql/queries';
import { Employee } from '../../types';

const EmployeesList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading employees: {error.message}</Alert>;
  }

  const employees: Employee[] = data?.getEmployees || [];

  return (
    <Box>
      <Typography variant="h4" className="font-poppins font-semibold mb-6" sx={{ color: '#151d48' }}>
        Employees
      </Typography>
      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(237, 237, 237, 0.5)' }}>
        <CardContent className="p-6">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Employee Name</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Contact Information</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>KPI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.id}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.role}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>{employee.contact}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <Chip
                        label={employee.kpi || 'N/A'}
                        size="small"
                        sx={{
                          backgroundColor: '#16c098',
                          color: 'white',
                          fontFamily: 'Poppins',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeesList;
