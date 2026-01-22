import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_DEPARTMENT } from '../graphql/queries/departments';

const DepartmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_DEPARTMENT, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error.message}</div>;
  if (!data?.department) return <div className="p-8">Department not found</div>;

  const department = data.department;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Department Details</h1>
          <div className="space-x-4">
            <button onClick={() => navigate('/departments')} className="btn-secondary">
              Back to Departments
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Department Header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-green-600 to-green-800">
            <h2 className="text-2xl font-bold text-white">{department.name}</h2>
            <p className="text-green-100">Department Code: {department.code}</p>
          </div>

          {/* Department Information */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Department Information
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Department Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{department.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Department Code</dt>
                <dd className="mt-1 text-sm text-gray-900">{department.code}</dd>
              </div>
              {department.manager && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Manager</dt>
                  <dd className="mt-1 text-sm text-gray-900">{department.manager}</dd>
                </div>
              )}
              {department.location && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{department.location}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Employees</dt>
                <dd className="mt-1 text-sm text-gray-900">{department.employees?.length || 0}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(department.created_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Employees Table */}
          {department.employees && department.employees.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Department Employees
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {department.employees.map((employee: any) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => navigate(`/employees/${employee.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DepartmentDetailsPage;
