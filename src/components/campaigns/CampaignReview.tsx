import React, { useState } from 'react';
import { Clock, Calendar, Users, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CampaignReviewProps {
  data: {
    name: string;
    description: string;
    type: string;
    segment: {
      rules: Array<{
        field: string;
        operator: string;
        value: string | number | boolean;
      }>;
      operator: 'AND' | 'OR';
    };
    content: {
      subject: string;
      body: string;
      callToAction: string;
      senderName: string;
      senderEmail: string;
    };
  };
}

const CampaignReview: React.FC<CampaignReviewProps> = ({ data }) => {
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [isScheduled, setIsScheduled] = useState(false);
  
  // Function to render segment rules in a human-readable format
  const renderSegmentRules = () => {
    if (!data.segment.rules.length) {
      return <div className="text-gray-500 italic">No segmentation rules defined</div>;
    }

    // Mapping for operator display
    const operatorDisplay: Record<string, string> = {
      equals: 'equals',
      not_equals: 'does not equal',
      contains: 'contains',
      greater_than: 'is greater than',
      less_than: 'is less than',
      in_list: 'is in',
      not_in_list: 'is not in'
    };

    // Mapping for field display - in a real app, this would come from an API
    const fieldDisplay: Record<string, string> = {
      email: 'Email',
      first_name: 'First Name',
      last_name: 'Last Name',
      total_spent: 'Total Spent',
      order_count: 'Order Count',
      last_order_date: 'Last Order Date',
      country: 'Country',
      zip_code: 'Zip Code',
      tags: 'Tags'
    };

    return (
      <div className="space-y-2">
        {data.segment.rules.map((rule, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">
              {index > 0 ? (data.segment.operator === 'AND' ? 'AND' : 'OR') : ''}
            </span>
            <div className="flex-1 py-1 px-2 bg-gray-50 rounded-md text-sm">
              <span className="font-medium">{fieldDisplay[rule.field] || rule.field}</span>
              <span className="mx-1 text-gray-500">{operatorDisplay[rule.operator] || rule.operator}</span>
              <span className="text-blue-600">{rule.value.toString()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Review Your Campaign</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review your campaign details before launching or scheduling.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-base font-medium text-gray-900">Campaign Information</h4>
              <Link to="/campaigns/create" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <Edit2 size={14} className="mr-1" />
                Edit
              </Link>
            </div>
            
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900 col-span-2">{data.name}</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="text-sm text-gray-900 col-span-2">{data.description}</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="text-sm text-gray-900 col-span-2 capitalize">{data.type}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-base font-medium text-gray-900">Audience Segmentation</h4>
              <Link to="/campaigns/create" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <Edit2 size={14} className="mr-1" />
                Edit
              </Link>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2">
                Match <span className="font-medium">{data.segment.operator === 'AND' ? 'ALL' : 'ANY'}</span> of the following conditions:
              </p>
              {renderSegmentRules()}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm">
                <Users size={16} className="mr-2 text-blue-600" />
                <span className="font-medium">Estimated audience:</span>
                <span className="ml-1 text-blue-600">243 customers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-base font-medium text-gray-900">Email Content</h4>
            <Link to="/campaigns/create" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Edit2 size={14} className="mr-1" />
              Edit
            </Link>
          </div>
          
          <dl className="divide-y divide-gray-200">
            <div className="py-3 grid grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">Sender</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {data.content.senderName} &lt;{data.content.senderEmail}&gt;
              </dd>
            </div>
            <div className="py-3 grid grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">Subject</dt>
              <dd className="text-sm text-gray-900 col-span-2">{data.content.subject}</dd>
            </div>
            <div className="py-3 grid grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">Email Body</dt>
              <dd className="text-sm text-gray-900 col-span-2 prose prose-sm max-w-none">
                <div style={{ whiteSpace: 'pre-line' }}>{data.content.body}</div>
              </dd>
            </div>
            {data.content.callToAction && (
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Call to Action</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-md">
                    {data.content.callToAction}
                  </span>
                </dd>
              </div>
            )}
          </dl>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="text-base font-medium text-gray-900 mb-4">Delivery Options</h4>
          
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex items-center h-5">
                <input
                  id="send-now"
                  name="delivery-option"
                  type="radio"
                  checked={!isScheduled}
                  onChange={() => setIsScheduled(false)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="send-now" className="font-medium text-gray-700 flex items-center">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  Send immediately
                </label>
                <p className="text-gray-500">
                  The campaign will be sent right after you launch it
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center h-5">
                <input
                  id="schedule"
                  name="delivery-option"
                  type="radio"
                  checked={isScheduled}
                  onChange={() => setIsScheduled(true)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <div className="ml-2 text-sm flex-1">
                <label htmlFor="schedule" className="font-medium text-gray-700 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  Schedule for later
                </label>
                <p className="text-gray-500 mb-3">
                  Set a specific date and time to send this campaign
                </p>
                
                {isScheduled && (
                  <div className="mt-3 sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div>
                      <label htmlFor="scheduled-date" className="sr-only">
                        Date
                      </label>
                      <input
                        type="date"
                        id="scheduled-date"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduled-time" className="sr-only">
                        Time
                      </label>
                      <input
                        type="time"
                        id="scheduled-time"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignReview;