import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_EMPLOYEES } from '../graphql/queries';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Table from '../components/Table';

export default function EmployeesList() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_EMPLOYEES);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'contact', label: 'Contact' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/employees/${row.id}`);
          }}
          className="text-primary hover:text-primary-dark font-medium"
        >
          View Profile
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Header title="Employees List" breadcrumbs={['Dashboard', 'Employees']} />

          {loading && (
            <div className="text-center py-12 text-gray">Loading employees...</div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              Error loading employees: {error.message}
            </div>
          )}

          {data && data.getEmployees && (
            <Table
              columns={columns}
              data={data.getEmployees}
              onRowClick={(row) => navigate(`/employees/${row.id}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
