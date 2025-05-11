import React from 'react';
import { useForm } from 'react-hook-form';

type CampaignType = 'email' | 'sms' | 'push';

interface CampaignBasicInfoProps {
  data: {
    name: string;
    description: string;
    type: CampaignType;
  };
  onUpdate: (data: {
    name: string;
    description: string;
    type: CampaignType;
  }) => void;
}

const CampaignBasicInfo: React.FC<CampaignBasicInfoProps> = ({ data, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  });

  const onSubmit = (formData: any) => {
    onUpdate(formData);
  };

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Campaign Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide basic information about your campaign.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Campaign Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.name ? 'border-red-300' : ''
                }`}
                placeholder="Summer Sale Promotion"
                {...register('name', { required: 'Campaign name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message?.toString()}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={3}
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.description ? 'border-red-300' : ''
                }`}
                placeholder="Brief description of the campaign's purpose and goals"
                {...register('description', { 
                  required: 'Description is required',
                  maxLength: {
                    value: 500,
                    message: 'Description cannot exceed 500 characters'
                  }
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message?.toString()}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="radio"
                  id="type-email"
                  value="email"
                  className="sr-only"
                  {...register('type')}
                />
                <label
                  htmlFor="type-email"
                  className={`block cursor-pointer rounded-lg border ${
                    data.type === 'email'
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  } px-6 py-4 text-center`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`h-6 w-6 mx-auto ${
                      data.type === 'email' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <p className={`mt-2 font-medium ${
                    data.type === 'email' ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    Email
                  </p>
                  <p className={`text-xs ${
                    data.type === 'email' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Send to customer inboxes
                  </p>
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="radio"
                  id="type-sms"
                  value="sms"
                  className="sr-only"
                  {...register('type')}
                />
                <label
                  htmlFor="type-sms"
                  className={`block cursor-pointer rounded-lg border ${
                    data.type === 'sms'
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  } px-6 py-4 text-center`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`h-6 w-6 mx-auto ${
                      data.type === 'sms' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <p className={`mt-2 font-medium ${
                    data.type === 'sms' ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    SMS
                  </p>
                  <p className={`text-xs ${
                    data.type === 'sms' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Send text messages
                  </p>
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="radio"
                  id="type-push"
                  value="push"
                  className="sr-only"
                  {...register('type')}
                />
                <label
                  htmlFor="type-push"
                  className={`block cursor-pointer rounded-lg border ${
                    data.type === 'push'
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  } px-6 py-4 text-center`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`h-6 w-6 mx-auto ${
                      data.type === 'push' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <path d="M13.73 21a9.97 9.97 0 0 1-10.5-8.5"/>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                    <path d="M2 2v20"/>
                    <path d="M2 12h10"/>
                  </svg>
                  <p className={`mt-2 font-medium ${
                    data.type === 'push' ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    Push
                  </p>
                  <p className={`text-xs ${
                    data.type === 'push' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Send app notifications
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CampaignBasicInfo;