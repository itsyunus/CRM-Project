import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Clock, PieChart, AlertTriangle, 
  ChevronRight
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  sentAt: string | null;
  metrics: {
    delivered: number;
    opened: number;
    clicked: number;
  };
}

interface RecentCampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const RecentCampaignsList: React.FC<RecentCampaignsListProps> = ({ 
  campaigns, 
  isLoading 
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'scheduled':
      case 'draft':
        return <Clock size={16} className="text-blue-500" />;
      case 'failed':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 h-16 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No campaigns found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Link 
          key={campaign.id} 
          to={`/campaigns/${campaign.id}`}
          className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-150"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(campaign.status)}
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">{campaign.name}</h4>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span className="capitalize">{campaign.status}</span>
                  {campaign.sentAt && (
                    <>
                      <span className="mx-1">•</span>
                      <span>Sent on {campaign.sentAt}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="hidden md:flex items-center mr-4 space-x-4 text-xs">
                <div className="flex items-center text-gray-600">
                  <PieChart size={12} className="mr-1 text-blue-600" />
                  <span>{campaign.metrics.opened} opens</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentCampaignsList;