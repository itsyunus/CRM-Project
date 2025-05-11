import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, action }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default DashboardCard;