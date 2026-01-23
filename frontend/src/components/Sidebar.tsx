import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '🏠', path: '/dashboard', label: 'Dashboard' },
    { icon: '👥', path: '/employees', label: 'Employees' },
    { icon: '🏢', path: '/departments', label: 'Departments' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-20 bg-white border-r border-gray-light flex flex-col items-center py-6 space-y-6">
      <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>
        HR
      </div>

      <div className="flex-1 flex flex-col space-y-4 w-full">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full py-3 flex items-center justify-center text-2xl transition-colors ${
              location.pathname.startsWith(item.path)
                ? 'bg-primary text-white'
                : 'text-gray hover:bg-gray-50'
            }`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-12 h-12 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center"
        title="Logout"
      >
        🚪
      </button>
    </div>
  );
}
