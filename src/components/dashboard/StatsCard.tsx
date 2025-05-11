import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | undefined;
  change?: number | null;
  icon: React.ReactNode;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  isLoading = false,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center">
        <div className="p-2 rounded-md bg-blue-50 text-blue-700">
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <div className="h-7 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          )}
        </div>
      </div>
      
      {!isLoading && change !== null && change !== undefined && (
        <div className="mt-2 flex items-center">
          {change > 0 ? (
            <span className="text-green-600 text-sm flex items-center">
              <ArrowUpRight size={14} className="mr-1" />
              {change}%
            </span>
          ) : change < 0 ? (
            <span className="text-red-600 text-sm flex items-center">
              <ArrowDownRight size={14} className="mr-1" />
              {Math.abs(change)}%
            </span>
          ) : (
            <span className="text-gray-500 text-sm">No change</span>
          )}
          <span className="ml-1 text-gray-500 text-sm">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;