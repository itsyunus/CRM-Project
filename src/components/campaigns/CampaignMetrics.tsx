import React from 'react';
import { BarChart, PieChart } from 'lucide-react';

interface CampaignMetricsProps {
  metrics: {
    audienceSize: number;
    delivered: number;
    opened: number;
    clicked: number;
    failed: number;
    openRate: number;
    clickRate: number;
  };
}

const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Stats */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Delivery Statistics</h4>
            <BarChart className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Delivered</span>
                <span className="text-sm font-medium text-gray-900">{metrics.delivered}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.delivered / metrics.audienceSize) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Failed</span>
                <span className="text-sm font-medium text-gray-900">{metrics.failed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.failed / metrics.audienceSize) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Engagement Metrics</h4>
            <PieChart className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Open Rate</span>
                <span className="text-sm font-medium text-gray-900">{metrics.openRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${metrics.openRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Click Rate</span>
                <span className="text-sm font-medium text-gray-900">{metrics.clickRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${metrics.clickRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Total Recipients</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{metrics.audienceSize}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Delivered</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{metrics.delivered}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Opened</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{metrics.opened}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">Clicked</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{metrics.clicked}</div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetrics;