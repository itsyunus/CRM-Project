import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContentData {
  subject: string;
  body: string;
  callToAction: string;
  senderName: string;
  senderEmail: string;
}

interface CampaignContentProps {
  data: ContentData;
  onUpdate: (data: ContentData) => void;
}

const placeholders = [
  { name: 'First Name', value: '{{firstName}}' },
  { name: 'Last Name', value: '{{lastName}}' },
  { name: 'Full Name', value: '{{fullName}}' },
  { name: 'Email', value: '{{email}}' },
  { name: 'Order Number', value: '{{orderNumber}}' },
  { name: 'Order Total', value: '{{orderTotal}}' },
  { name: 'Order Date', value: '{{orderDate}}' },
];

const CampaignContent: React.FC<CampaignContentProps> = ({ data, onUpdate }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: data
  });
  const [showPreview, setShowPreview] = useState(false);
  
  const watchedValues = watch();
  
  const onSubmit = (formData: ContentData) => {
    onUpdate(formData);
  };
  
  const insertPlaceholder = (placeholder: string, field: keyof ContentData) => {
    const currentValue = watchedValues[field] || '';
    const selectionStart = document.getElementById(field)?.['selectionStart'] || currentValue.length;
    const selectionEnd = document.getElementById(field)?.['selectionEnd'] || currentValue.length;
    
    const newValue = 
      currentValue.substring(0, selectionStart) + 
      placeholder + 
      currentValue.substring(selectionEnd);
    
    setValue(field, newValue, { shouldDirty: true });
    onUpdate({ ...watchedValues, [field]: newValue });
  };
  
  // This would be replaced with a proper email renderer in a real application
  const renderPreview = () => {
    let previewHtml = watchedValues.body;
    
    // Simple placeholder replacement with sample data
    placeholders.forEach(placeholder => {
      const sampleValue = placeholder.name.includes('Name') 
        ? 'John'
        : placeholder.name.includes('Email')
        ? 'john@example.com'
        : placeholder.name.includes('Number')
        ? '#12345'
        : placeholder.name.includes('Total')
        ? '$99.99'
        : placeholder.name.includes('Date')
        ? '2023-06-15'
        : 'Sample';
      
      previewHtml = previewHtml.replace(
        new RegExp(placeholder.value, 'g'),
        `<span class="text-green-600 font-semibold">${sampleValue}</span>`
      );
    });
    
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-md border border-gray-300 p-4">
          <div className="mb-3 border-b pb-2 border-gray-200">
            <p className="text-sm text-gray-500">From: <span className="font-medium">{watchedValues.senderName} &lt;{watchedValues.senderEmail}&gt;</span></p>
            <p className="text-sm text-gray-500">Subject: <span className="font-medium">{watchedValues.subject}</span></p>
          </div>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          
          {watchedValues.callToAction && (
            <div className="mt-4 text-center">
              <button className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {watchedValues.callToAction}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Campaign Content</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create the content that will be sent to your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
              Sender Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="senderName"
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.senderName ? 'border-red-300' : ''
                }`}
                placeholder="Your Company Name"
                {...register('senderName', { required: 'Sender name is required' })}
              />
              {errors.senderName && (
                <p className="mt-1 text-sm text-red-600">{errors.senderName.message?.toString()}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
              Sender Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="senderEmail"
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.senderEmail ? 'border-red-300' : ''
                }`}
                placeholder="marketing@yourcompany.com"
                {...register('senderEmail', { 
                  required: 'Sender email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.senderEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.senderEmail.message?.toString()}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Email Subject
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="subject"
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.subject ? 'border-red-300' : ''
                }`}
                placeholder="Your Exclusive Offer Inside"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message?.toString()}</p>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Add:</span>
              {placeholders.map(placeholder => (
                <button
                  key={placeholder.value}
                  type="button"
                  onClick={() => insertPlaceholder(placeholder.value, 'subject')}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  {placeholder.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Email Body
            </label>
            <div className="mt-1">
              <textarea
                id="body"
                rows={10}
                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.body ? 'border-red-300' : ''
                }`}
                placeholder="Hello {{firstName}},&#10;&#10;We're excited to share our latest offerings with you...&#10;&#10;Best regards,&#10;The Team"
                {...register('body', { required: 'Email body is required' })}
              />
              {errors.body && (
                <p className="mt-1 text-sm text-red-600">{errors.body.message?.toString()}</p>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Add:</span>
              {placeholders.map(placeholder => (
                <button
                  key={placeholder.value}
                  type="button"
                  onClick={() => insertPlaceholder(placeholder.value, 'body')}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  {placeholder.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="callToAction" className="block text-sm font-medium text-gray-700">
              Call To Action Button (optional)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="callToAction"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Shop Now"
                {...register('callToAction')}
              />
            </div>
          </div>
        </div>
        
        <div className="lg:border-l lg:border-gray-200 lg:pl-6">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">Preview</h4>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
            
            {showPreview ? (
              renderPreview()
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Click to show preview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CampaignContent;