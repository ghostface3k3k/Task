import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { GET_EMPLOYEE } from '../graphql/queries';
import type { EmployeeProfile as EmployeeProfileType, EmergencyContact } from '../utils/types';
import { PencilIcon } from '@heroicons/react/24/outline';

const EmployeeProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('profile');

  const { data, loading, error } = useQuery<{ employee: EmployeeProfileType }>(GET_EMPLOYEE, {
    variables: { id },
  });

  if (loading) {
    return (
      <Layout title="Employee Profile">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.employee) {
    return (
      <Layout title="Employee Profile">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading employee data</p>
        </div>
      </Layout>
    );
  }

  const employee = data.employee;

  return (
    <Layout title="Employee Profile">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Employees', href: '/employees' },
          { label: `${employee.firstName} ${employee.lastName}` },
        ]}
      />

      <div className="flex gap-6">
        {/* Profile Card Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {employee.title} {employee.firstName} {employee.middleName} {employee.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{employee.role}</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'documents'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
              </nav>
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                <p className="text-sm text-gray-900">{employee.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Mobile</p>
                <p className="text-sm text-gray-900">{employee.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Department</p>
                <p className="text-sm text-gray-900">Department {employee.departmentId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">National ID</p>
                <p className="text-base font-medium text-gray-900">{employee.nationalId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Title</p>
                <p className="text-base font-medium text-gray-900">{employee.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">First Name</p>
                <p className="text-base font-medium text-gray-900">{employee.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Middle Name</p>
                <p className="text-base font-medium text-gray-900">{employee.middleName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Name</p>
                <p className="text-base font-medium text-gray-900">{employee.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(employee.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-base font-medium text-gray-900">{employee.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Nationality</p>
                <p className="text-base font-medium text-gray-900">{employee.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Passport Number</p>
                <p className="text-base font-medium text-gray-900">{employee.passportNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                <p className="text-base font-medium text-gray-900">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-base font-medium text-gray-900">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                <p className="text-base font-medium text-gray-900">{employee.mobile}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div className="space-y-4">
              {employee.emergencyContacts.map((contact: EmergencyContact, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4 border-b last:border-b-0">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-base font-medium text-gray-900">{contact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Relationship</p>
                    <p className="text-base font-medium text-gray-900">{contact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-base font-medium text-gray-900">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Address Details</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Street</p>
                <p className="text-base font-medium text-gray-900">{employee.address.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">City</p>
                <p className="text-base font-medium text-gray-900">{employee.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <p className="text-base font-medium text-gray-900">{employee.address.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Postal Code</p>
                <p className="text-base font-medium text-gray-900">{employee.address.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Driving License Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Driving License Details</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">License Number</p>
                <p className="text-base font-medium text-gray-900">{employee.drivingLicense.number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(employee.drivingLicense.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Military Status Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Military Status</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <p className="text-base font-medium text-gray-900">{employee.militaryStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeProfilePage;
