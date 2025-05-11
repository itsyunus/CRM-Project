import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, AlertTriangle, CheckCircle,
  Clock, BarChart2, ChevronRight, Trash2, Copy
} from 'lucide-react';
import { fetchCampaigns } from '../services/api';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Campaign } from '../types/campaign';

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: campaigns, isLoading, refetch } = useQuery(
    ['campaigns', searchTerm], 
    () => fetchCampaigns(searchTerm)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" text="Active" icon={<CheckCircle size={12} />} />;
      case 'draft':
        return <Badge variant="gray" text="Draft" icon={<Clock size={12} />} />;
      case 'scheduled':
        return <Badge variant="blue" text="Scheduled" icon={<Clock size={12} />} />;
      case 'completed':
        return <Badge variant="purple" text="Completed" icon={<CheckCircle size={12} />} />;
      case 'failed':
        return <Badge variant="danger" text="Failed" icon={<AlertTriangle size={12} />} />;
      default:
        return <Badge variant="gray" text={status} />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Campaigns" 
        description="Create and manage your marketing campaigns"
        action={
          <Link to="/campaigns/create">
            <Button
              variant="primary"
              icon={<Plus size={16} />}
            >
              Create Campaign
            </Button>
          </Link>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {/* Campaigns list */}
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading campaigns...
            </div>
          ) : campaigns && campaigns.length > 0 ? (
            campaigns.map((campaign: Campaign) => (
              <div key={campaign.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col flex-grow mb-2 sm:mb-0">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-2">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 max-w-2xl">{campaign.description}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <BarChart2 size={14} className="mr-1" />
                        <span>Audience: {campaign.audienceSize}</span>
                      </div>
                      <div>Created: {campaign.createdAt}</div>
                      {campaign.sentAt && <div>Sent: {campaign.sentAt}</div>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                      <Copy size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded-full">
                      <Trash2 size={18} />
                    </button>
                    <Link 
                      to={`/campaigns/${campaign.id}`}
                      className="flex items-center justify-center ml-2 px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="mr-1">View</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No campaigns found. <Link to="/campaigns/create" className="text-blue-600 font-medium">Create your first campaign</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;