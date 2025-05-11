import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { 
  ArrowLeft, Edit2, Copy, Trash2,
  CheckCircle, AlertTriangle, Clock,
  Users, BarChart, PieChart, AtSign, Activity
} from 'lucide-react';
import { fetchCampaignById, fetchCampaignDeliveryLogs } from '../services/api';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import CampaignMetrics from '../components/campaigns/CampaignMetrics';
import DeliveryLogsList from '../components/campaigns/DeliveryLogsList';

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: campaign, isLoading } = useQuery(
    ['campaign', id], 
    () => fetchCampaignById(id)
  );
  
  const { data: deliveryLogs, isLoading: logsLoading } = useQuery(
    ['campaignLogs', id], 
    () => fetchCampaignDeliveryLogs(id)
  );

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading campaign details...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Campaign not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The campaign you're looking for doesn't exist or has been deleted.
        </p>
        <div className="mt-6">
          <Link to="/campaigns" className="text-blue-600 hover:text-blue-800">
            Back to campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/campaigns" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft size={20} />
        </Link>
        <PageHeader 
          title={campaign.name}
          description={campaign.description}
          badge={getStatusBadge(campaign.status)}
          action={
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" icon={<Edit2 size={16} />}>
                Edit
              </Button>
              <Button variant="outline" size="sm" icon={<Copy size={16} />}>
                Duplicate
              </Button>
              <Button variant="danger" size="sm" icon={<Trash2 size={16} />}>
                Delete
              </Button>
            </div>
          }
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-blue-100 text-blue-700">
              <Users size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Audience Size</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.metrics.audienceSize}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-green-100 text-green-700">
              <CheckCircle size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.metrics.delivered}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-amber-100 text-amber-700">
              <AtSign size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.metrics.openRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-red-100 text-red-700">
              <Activity size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Failed</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.metrics.failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('delivery-logs')}
            className={`${
              activeTab === 'delivery-logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Delivery Logs
          </button>
          <button
            onClick={() => setActiveTab('audience')}
            className={`${
              activeTab === 'audience'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Audience
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Content
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Campaign Performance</h3>
              </div>
              <div className="p-6">
                <CampaignMetrics metrics={campaign.metrics} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Campaign Details</h3>
                </div>
                <div className="p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Campaign Type</dt>
                      <dd className="mt-1 text-sm text-gray-900">{campaign.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900">{getStatusBadge(campaign.status)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{campaign.createdAt}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Sent Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{campaign.sentAt || 'Not sent yet'}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Sender</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {campaign.content.senderName} &lt;{campaign.content.senderEmail}&gt;
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {campaign.recentActivity.map((activity, index) => (
                      <li key={index} className="flex space-x-3">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full ${
                          activity.type === 'success' ? 'bg-green-100' : 
                          activity.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        } flex items-center justify-center`}>
                          {activity.type === 'success' ? 
                            <CheckCircle size={12} className="text-green-600" /> : 
                            activity.type === 'error' ? 
                            <AlertTriangle size={12} className="text-red-600" /> :
                            <Clock size={12} className="text-blue-600" />
                          }
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'delivery-logs' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Delivery Logs</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detailed logs of all delivery attempts and their statuses
              </p>
            </div>
            <DeliveryLogsList logs={deliveryLogs || []} isLoading={logsLoading} />
          </div>
        )}
        
        {activeTab === 'audience' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Audience Segmentation</h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Segmentation Rules</h4>
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  <code className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(campaign.segment, null, 2)}
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaign.targetAudience.slice(0, 5).map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            customer.deliveryStatus === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : customer.deliveryStatus === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.deliveryStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {campaign.targetAudience.length > 5 && (
                  <div className="text-center mt-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View all {campaign.targetAudience.length} customers
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Campaign Content</h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email Subject</h4>
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                  {campaign.content.subject}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email Body</h4>
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200 prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: campaign.content.body }} />
                </div>
              </div>
              
              {campaign.content.callToAction && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Call To Action</h4>
                  <div className="inline-block">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      {campaign.content.callToAction}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetail;