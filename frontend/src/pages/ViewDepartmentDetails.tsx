import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DEPARTMENT, DELETE_EMPLOYEE } from '../graphql/queries';
import './ViewDepartmentDetails.css';

export default function ViewDepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id: id || '1' },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      deleteEmployee({
        variables: {
          departmentId: id || '1',
          employeeId,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="main-container w-[1728px] h-[1273px] bg-[#fafafa] flex items-center justify-center">
        <div className="text-[#737791] text-lg">Loading department details...</div>
      </div>
    );
  }

  if (error || !data?.getDepartment) {
    return (
      <div className="main-container w-[1728px] h-[1273px] bg-[#fafafa] flex items-center justify-center">
        <div className="text-red-600 text-lg">Error loading department details</div>
      </div>
    );
  }

  const department = data.getDepartment;

  return (
    <div className="main-container w-[1728px] h-[1273px] bg-[#fafafa] rounded-[20px] border-solid border border-[#f8f9fa] relative shadow-[0_4px_20px_0_rgba(237,237,237,0.5)] mx-auto my-0">
      {/* Left Sidebar with Navigation Icons */}
      <div className="absolute left-0 top-0 w-[72px] h-full bg-white border-r border-[#e7eaee] flex flex-col items-center py-6 z-10">
        <div className="text-2xl font-bold text-[#0f6bbc] mb-8 cursor-pointer" onClick={() => navigate('/dashboard')}>
          HR
        </div>
        <div className="flex flex-col space-y-4">
          <button onClick={() => navigate('/dashboard')} className="w-12 h-12 flex items-center justify-center text-xl text-[#737791] hover:bg-[#f4f8fe] rounded-lg transition-colors">
            🏠
          </button>
          <button onClick={() => navigate('/employees')} className="w-12 h-12 flex items-center justify-center text-xl text-[#737791] hover:bg-[#f4f8fe] rounded-lg transition-colors">
            👥
          </button>
          <button onClick={() => navigate('/departments')} className="w-12 h-12 flex items-center justify-center text-xl bg-[#0f6bbc] text-white rounded-lg">
            🏢
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute left-[72px] top-0 right-0 h-full p-8 overflow-y-auto">
        {/* Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-[#737791] mb-2">
            <span className="cursor-pointer hover:text-[#0f6bbc]" onClick={() => navigate('/dashboard')}>Dashboard</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-[#0f6bbc]" onClick={() => navigate('/departments')}>Departments</span>
            <span>/</span>
            <span className="text-[#151d48] font-medium">View Department Details</span>
          </div>
          <h1 className="text-[32px] font-semibold text-[#151d48] font-poppins">Department Details</h1>
        </div>

        {/* Department Header Card */}
        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#0f6bbc] to-[#003fad] flex items-center justify-center text-white text-2xl font-semibold">
                💼
              </div>
              <div>
                <h2 className="text-[24px] font-semibold text-[#151d48] font-poppins">{department.name}</h2>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#16c098] bg-opacity-10 text-[#16c098] mt-1">
                  Active
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-5 py-2.5 border-2 border-[#0f6bbc] text-[#0f6bbc] rounded-lg font-medium hover:bg-[#f4f8fe] transition-colors">
                Export
              </button>
              <button 
                onClick={() => navigate(`/departments/${id}/edit`)}
                className="px-5 py-2.5 bg-[#0f6bbc] text-white rounded-lg font-medium hover:bg-[#003fad] transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Department Information Grid */}
        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6 mb-6">
          <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins mb-6">Department Information</h3>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-[#737791] block mb-2">Department Code</label>
              <p className="text-[#151d48] font-medium text-lg">{department.code}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Manager</label>
              <p className="text-[#151d48] font-medium text-lg">{department.manager}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Creation Date</label>
              <p className="text-[#151d48] font-medium text-lg">
                {new Date(department.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Name (EN)</label>
              <p className="text-[#151d48] font-medium text-lg">{department.name}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Location</label>
              <p className="text-[#151d48] font-medium text-lg">{department.location}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Description</label>
              <p className="text-[#151d48] font-medium text-lg">{department.description}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Name (AR)</label>
              <p className="text-[#151d48] font-medium text-lg" dir="rtl">{department.localization?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-[#737791] block mb-2">Employees</label>
              <p className="text-[#151d48] font-medium text-lg">{department.employeesNumber}</p>
            </div>
          </div>
        </div>

        {/* Assigned Employees Table */}
        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] overflow-hidden">
          <div className="p-6 border-b border-[#e7eaee]">
            <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Assigned Employees</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f4f8fe]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">Employee Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">Contact Information</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">KPI</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#151d48]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eaee]">
                {department.employees && department.employees.length > 0 ? (
                  department.employees.map((employee: any) => (
                    <tr key={employee.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#151d48] font-medium">{employee.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f6bbc] to-[#003fad] flex items-center justify-center text-white text-sm font-semibold">
                            {employee.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <span className="text-sm text-[#151d48] font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#737791]">{employee.role}</td>
                      <td className="px-6 py-4 text-sm text-[#737791]">{employee.contact}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <div className="w-24 h-2 bg-[#e7eaee] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#16c098] rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-[#737791] ml-2">{Math.floor(Math.random() * 40) + 60}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => navigate(`/employees/${employee.id}`)}
                            className="text-[#0f6bbc] hover:text-[#003fad] font-medium text-sm"
                          >
                            View
                          </button>
                          <span className="text-[#e7eaee]">|</span>
                          <button 
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-[#737791]">
                      No employees assigned to this department
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
