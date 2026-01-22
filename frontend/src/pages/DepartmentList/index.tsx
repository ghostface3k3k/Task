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
  Chip,
} from '@mui/material';
import { GET_DEPARTMENTS } from '../../graphql/queries';
import './DepartmentList.css';

interface Department {
  id: string;
  name: string;
  code: number;
  manager: string;
  location: string;
  employeesNumber: number;
  status: boolean;
  createdAt: string;
}

const DepartmentList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading departments: {error.message}</Alert>;
  }

  const departments: Department[] = data?.departments || [];
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id: string) => {
    navigate(`/department/${id}`);
  };

  return (
    <Box>
      <Box className="list-header">
        <Typography variant="h5" className="list-title">
          Departments
        </Typography>
        <TextField
          placeholder="Search departments..."
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
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDepartments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No departments found
                </TableCell>
              </TableRow>
            ) : (
              filteredDepartments.map((dept) => (
                <TableRow
                  key={dept.id}
                  hover
                  onClick={() => handleRowClick(dept.id)}
                  className="table-row-clickable"
                >
                  <TableCell>{dept.code}</TableCell>
                  <TableCell className="font-semibold">{dept.name}</TableCell>
                  <TableCell>{dept.manager}</TableCell>
                  <TableCell>{dept.location}</TableCell>
                  <TableCell>{dept.employeesNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={dept.status ? 'Active' : 'Inactive'}
                      color={dept.status ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(dept.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DepartmentList;
