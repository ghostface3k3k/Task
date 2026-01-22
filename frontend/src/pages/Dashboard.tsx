import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_EMPLOYEES } from '../graphql/queries/employees';
import { GET_DEPARTMENTS } from '../graphql/queries/departments';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'departments'>('overview');
  const navigate = useNavigate();
  
  const { data: employeesData } = useQuery(GET_EMPLOYEES);
  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const stats = {
    totalEmployees: employeesData?.employees?.length || 0,
    totalDepartments: departmentsData?.departments?.length || 0,
    activeProjects: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HR Management System</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Employees
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'departments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Departments
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Employees</h3>
                <p className="text-4xl font-bold text-blue-600">{stats.totalEmployees}</p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Departments</h3>
                <p className="text-4xl font-bold text-green-600">{stats.totalDepartments}</p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Projects</h3>
                <p className="text-4xl font-bold text-purple-600">{stats.activeProjects}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/employees')}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                  >
                    → View All Employees
                  </button>
                  <button
                    onClick={() => navigate('/departments')}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                  >
                    → View All Departments
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• New employee added to Engineering</p>
                  <p>• Department manager updated</p>
                  <p>• 3 new projects initiated</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
              <button
                onClick={() => navigate('/employees')}
                className="btn-primary"
              >
                View All Employees
              </button>
            </div>
            <div className="card">
              <p className="text-gray-600">
                Total Employees: <span className="font-semibold">{stats.totalEmployees}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Click "View All Employees" to see the complete employee directory with search and filter options.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
              <button
                onClick={() => navigate('/departments')}
                className="btn-primary"
              >
                View All Departments
              </button>
            </div>
            <div className="card">
              <p className="text-gray-600">
                Total Departments: <span className="font-semibold">{stats.totalDepartments}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Click "View All Departments" to see the complete department directory with detailed information.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
