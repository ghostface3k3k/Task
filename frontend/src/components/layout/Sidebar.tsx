import React from 'react';
import { HomeIcon, UserGroupIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Departments', href: '/department/1', icon: UserGroupIcon },
  { name: 'Employees', href: '/employee/11557', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export const Sidebar: React.FC = React.memo(() => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-16 bg-gray-900 flex flex-col items-center py-4">
      <div className="mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
      </div>
      <nav className="flex-1 flex flex-col space-y-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={item.name}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
