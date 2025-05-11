import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  badge,
  action 
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {badge && <div className="ml-3">{badge}</div>}
          </div>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        
        {action && (
          <div className="mt-4 sm:mt-0">{action}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;