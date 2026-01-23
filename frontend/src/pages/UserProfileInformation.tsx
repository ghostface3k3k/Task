import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileInformation.css';

export default function UserProfileInformation() {
  const navigate = useNavigate();

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
          <button onClick={() => navigate('/employees')} className="w-12 h-12 flex items-center justify-center text-xl bg-[#0f6bbc] text-white rounded-lg">
            👥
          </button>
          <button onClick={() => navigate('/departments')} className="w-12 h-12 flex items-center justify-center text-xl text-[#737791] hover:bg-[#f4f8fe] rounded-lg transition-colors">
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
            <span className="cursor-pointer hover:text-[#0f6bbc]" onClick={() => navigate('/employees')}>Employees</span>
            <span>/</span>
            <span className="text-[#151d48] font-medium">John Smith Profile</span>
          </div>
          <h1 className="text-[32px] font-semibold text-[#151d48] font-poppins">Employee Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-8 mb-6">
          <div className="flex items-start space-x-6 mb-6">
            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#0f6bbc] to-[#003fad] flex items-center justify-center text-white text-5xl font-semibold">
              JS
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-[28px] font-semibold text-[#151d48] font-poppins mb-2">John Smith</h2>
              <p className="text-[18px] text-[#737791] mb-4">Software Engineer</p>
              
              {/* Tabs */}
              <div className="flex space-x-6 border-b border-[#e7eaee]">
                <button className="pb-3 border-b-2 border-[#0f6bbc] text-[#0f6bbc] font-medium">
                  Information
                </button>
                <button className="pb-3 text-[#737791] hover:text-[#0f6bbc]">
                  Documents
                </button>
                <button className="pb-3 text-[#737791] hover:text-[#0f6bbc]">
                  Activity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Sections Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Basic Information</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">Full Name</label>
                <p className="text-[#151d48] font-medium">John Smith</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Employee ID</label>
                <p className="text-[#151d48] font-medium">EMP-11557</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Date of Birth</label>
                <p className="text-[#151d48] font-medium">15 March 1990</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Gender</label>
                <p className="text-[#151d48] font-medium">Male</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Nationality</label>
                <p className="text-[#151d48] font-medium">American</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Contact Information</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">Phone Number</label>
                <p className="text-[#151d48] font-medium">+1 555 123 4567</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Email Address</label>
                <p className="text-[#151d48] font-medium">john.smith@company.com</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Alternative Phone</label>
                <p className="text-[#151d48] font-medium">+1 555 987 6543</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">LinkedIn</label>
                <p className="text-[#0f6bbc] font-medium cursor-pointer hover:underline">linkedin.com/in/johnsmith</p>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Emergency Contacts</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">Contact Name</label>
                <p className="text-[#151d48] font-medium">Jane Smith</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Relationship</label>
                <p className="text-[#151d48] font-medium">Spouse</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Phone Number</label>
                <p className="text-[#151d48] font-medium">+1 555 234 5678</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Email</label>
                <p className="text-[#151d48] font-medium">jane.smith@email.com</p>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Address Details</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">Street Address</label>
                <p className="text-[#151d48] font-medium">123 Main Street, Apt 4B</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">City</label>
                <p className="text-[#151d48] font-medium">New York</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">State/Province</label>
                <p className="text-[#151d48] font-medium">NY</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Postal Code</label>
                <p className="text-[#151d48] font-medium">10001</p>
              </div>
            </div>
          </div>

          {/* Driving License Details */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Driving License Details</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">License Number</label>
                <p className="text-[#151d48] font-medium">DL-123456789</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">License Type</label>
                <p className="text-[#151d48] font-medium">Class C</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Issue Date</label>
                <p className="text-[#151d48] font-medium">10 January 2020</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Expiry Date</label>
                <p className="text-[#151d48] font-medium">10 January 2028</p>
              </div>
            </div>
          </div>

          {/* Military Status */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_0_rgba(238,238,238,0.5)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-[#151d48] font-poppins">Military Status</h3>
              <button className="px-4 py-2 text-[#0f6bbc] hover:bg-[#f4f8fe] rounded-lg font-medium text-sm transition-colors">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#737791] block mb-1">Service Status</label>
                <p className="text-[#151d48] font-medium">Completed</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Branch</label>
                <p className="text-[#151d48] font-medium">Army</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Service Period</label>
                <p className="text-[#151d48] font-medium">2008 - 2012</p>
              </div>
              <div>
                <label className="text-sm text-[#737791] block mb-1">Rank</label>
                <p className="text-[#151d48] font-medium">Sergeant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
