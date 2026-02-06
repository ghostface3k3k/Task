import React from 'react';
import { BellIcon, EnvelopeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = React.memo(({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <EnvelopeIcon className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
