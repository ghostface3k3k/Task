import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-16">
        <Header title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
