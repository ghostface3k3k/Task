import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/department/1"
          className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <UserGroupIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Department Details</h3>
              <p className="text-gray-600 mt-1">View and manage department information</p>
            </div>
          </div>
        </Link>

        <Link
          to="/employee/11557"
          className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-green-100 rounded-lg">
              <UserIcon className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Employee Profile</h3>
              <p className="text-gray-600 mt-1">View and manage employee information</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Departments</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Active Departments</p>
            <p className="text-2xl font-bold text-green-600 mt-1">2</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Average KPI</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">89.5</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
