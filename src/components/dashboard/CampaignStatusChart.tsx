import React from 'react';

interface ChartData {
  name: string;
  value: number;
}

interface CampaignStatusChartProps {
  isLoading: boolean;
  data?: ChartData[];
}

const CampaignStatusChart: React.FC<CampaignStatusChartProps> = ({ isLoading, data }) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-red-500',
  ];

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="h-60">
      <div className="flex h-full items-end">
        {data.map((item, index) => (
          <div 
            key={item.name} 
            className="relative flex-1 flex flex-col justify-end mx-1"
            style={{ height: '100%' }}
          >
            <div 
              className={`${colors[index % colors.length]} rounded-t-sm`} 
              style={{ height: `${item.value}%` }}
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-white font-medium">
                {item.value}%
              </div>
            </div>
            <div className="text-xs text-center mt-2 text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignStatusChart;