import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Employees',
      description: 'Manage employee profiles and information',
      icon: '👥',
      path: '/employees',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Departments',
      description: 'View and manage departments',
      icon: '🏢',
      path: '/departments',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-dark font-poppins">Dashboard</h1>
            <p className="text-gray mt-2">Welcome to HR Management System</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.path}
                onClick={() => navigate(card.path)}
                className={`${card.bgColor} p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-2">{card.title}</h3>
                <p className="text-gray">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
