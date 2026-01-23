import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeesList from './pages/EmployeesList';
import DepartmentsList from './pages/DepartmentsList';
import UserProfileInformation from './pages/UserProfileInformation';
import ViewDepartmentDetails from './pages/ViewDepartmentDetails';
import EditDepartment from './pages/EditDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/:id" element={<UserProfileInformation />} />
        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="/departments/:id" element={<ViewDepartmentDetails />} />
        <Route path="/departments/:id/edit" element={<EditDepartment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
