import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_DEPARTMENTS } from '../graphql/queries';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DepartmentsList() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Header title="Departments List" breadcrumbs={['Dashboard', 'Departments']} />

          {loading && (
            <div className="text-center py-12 text-gray">Loading departments...</div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              Error loading departments: {error.message}
            </div>
          )}

          {data && data.getDepartments && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.getDepartments.map((dept: any) => (
                <div
                  key={dept.id}
                  onClick={() => navigate(`/departments/${dept.id}`)}
                  className="bg-white p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-dark">{dept.name}</h3>
                      <p className="text-sm text-gray mt-1">Code: {dept.code}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dept.status
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {dept.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray">
                    <p>
                      <span className="font-medium text-dark">Manager:</span> {dept.manager}
                    </p>
                    <p>
                      <span className="font-medium text-dark">Location:</span> {dept.location}
                    </p>
                    <p>
                      <span className="font-medium text-dark">Employees:</span>{' '}
                      {dept.employeesNumber}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-light">
                    <p className="text-sm text-gray line-clamp-2">{dept.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
