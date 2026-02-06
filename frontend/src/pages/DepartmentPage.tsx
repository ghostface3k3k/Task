import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { GET_DEPARTMENT, DELETE_EMPLOYEE } from '../graphql/queries';
import type { Department as DepartmentType, Employee } from '../utils/types';
import { PencilIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<{ department: DepartmentType }>(GET_DEPARTMENT, {
    variables: { id },
  });

  const [deleteEmployee, { loading: deleteLoading }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setDeleteModalOpen(false);
      setSelectedEmployeeId(null);
      refetch();
    },
  });

  const handleDeleteClick = useCallback((employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedEmployeeId && id) {
      deleteEmployee({
        variables: {
          departmentId: id,
          employeeId: selectedEmployeeId,
        },
      });
    }
  }, [selectedEmployeeId, id, deleteEmployee]);

  if (loading) {
    return (
      <Layout title="Department Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.department) {
    return (
      <Layout title="Department Details">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading department data</p>
        </div>
      </Layout>
    );
  }

  const department = data.department;

  return (
    <Layout title="Department Details">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Departments', href: '/departments' },
          { label: department.name },
        ]}
      />

      {/* Department Overview Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-semibold text-gray-900">{department.name}</h2>
            {department.status && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <PencilIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Code</p>
            <p className="text-base font-medium text-gray-900">{department.code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Name (EN)</p>
            <p className="text-base font-medium text-gray-900">{department.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Name (AR)</p>
            <p className="text-base font-medium text-gray-900">{department.localization.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Manager</p>
            <p className="text-base font-medium text-gray-900">{department.manager}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <p className="text-base font-medium text-gray-900">{department.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Number of Employees</p>
            <p className="text-base font-medium text-gray-900">{department.employeesNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="text-base font-medium text-gray-900">
              {department.status ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Created At</p>
            <p className="text-base font-medium text-gray-900">
              {new Date(department.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Description (EN)</p>
          <p className="text-base text-gray-700">{department.description}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Description (AR)</p>
          <p className="text-base text-gray-700">{department.localization.description}</p>
        </div>
      </div>

      {/* Assigned Employees Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Employees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {department.employees?.map((employee: Employee, index: number) => (
                <tr
                  key={employee.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="font-medium">{employee.kpi || 'N/A'}</span>
                      {employee.kpi && (
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${employee.kpi}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-700">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteLoading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DepartmentPage;
