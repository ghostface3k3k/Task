import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_EMPLOYEE } from '../graphql/queries/employees';

const EmployeeProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;
  if (!data?.employee) return <div className="p-8">Employee not found</div>;

  const employee = data.employee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Employee Profile</h1>
          <div className="space-x-4">
            <button onClick={() => navigate('/employees')} className="btn-secondary">
              Back to Employees
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-white">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-blue-100">{employee.position}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Personal Information
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(employee.dateOfBirth).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Position</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
              </div>
            </dl>
          </div>

          {/* Department Information */}
          {employee.department && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Department Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.department.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.department.code}</dd>
                </div>
                {employee.department.manager && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Manager</dt>
                    <dd className="mt-1 text-sm text-gray-900">{employee.department.manager}</dd>
                  </div>
                )}
                {employee.department.location && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{employee.department.location}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/departments/${employee.department.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Department Details →
                </button>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Additional Information
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(employee.created_at).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(employee.updated_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfilePage;
