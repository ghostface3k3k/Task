import React from 'react';

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-gray mb-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span>{crumb}</span>
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>
      )}
      <h1 className="text-3xl font-semibold text-dark font-poppins">{title}</h1>
    </div>
  );
}
