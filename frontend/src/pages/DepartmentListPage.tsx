import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_DEPARTMENTS } from '../graphql/queries/departments';

interface Department {
  id: string;
  name: string;
  code: string;
  manager: string | null;
  location: string | null;
  employees: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}

const DepartmentListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_DEPARTMENTS);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;

  const departments: Department[] = data?.departments || [];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Department Directory</h1>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field max-w-md"
          />
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/departments/${department.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {department.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">Code: {department.code}</p>
                </div>
              </div>

              {department.manager && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Manager:</span> {department.manager}
                  </p>
                </div>
              )}

              {department.location && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {department.location}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{department.employees?.length || 0}</span> Employees
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/departments/${department.id}`);
                }}
                className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No departments found matching your criteria.
          </div>
        )}
      </main>
    </div>
  );
};

export default DepartmentListPage;
