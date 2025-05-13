import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Rocket } from 'lucide-react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createCampaign } from '../services/api';

import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import CampaignBasicInfo from '../components/campaigns/CampaignBasicInfo';
import CampaignSegmentation from '../components/campaigns/CampaignSegmentation';
import CampaignContent from '../components/campaigns/CampaignContent';
import CampaignReview from '../components/campaigns/CampaignReview';

const STEPS = [
  { id: 'info', name: 'Basic Info' },
  { id: 'segment', name: 'Audience Segmentation' },
  { id: 'content', name: 'Campaign Content' },
  { id: 'review', name: 'Review & Launch' }
];

const CampaignCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    type: 'email',
    segment: { rules: [], operator: 'AND' },
    content: {
      subject: '',
      body: '',
      callToAction: '',
      senderName: '',
      senderEmail: ''
    }
  });

  const createMutation = useMutation(createCampaign, {
    onSuccess: (data) => {
      toast.success('Campaign created successfully!');
      // Ensure we're using the correct campaign ID from the response
      if (data && data.id) {
        navigate(`/campaigns/${data.id}`, { replace: true });
      } else {
        navigate('/campaigns');
      }
    },
    onError: (error) => {
      toast.error('Failed to create campaign. Please try again.');
      console.error('Campaign creation error:', error);
    }
  });

  const updateCampaignData = (data: Partial<typeof campaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    createMutation.mutate({ ...campaignData, status: 'draft' });
  };

  const handleLaunch = () => {
    createMutation.mutate({ ...campaignData, status: 'active' });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CampaignBasicInfo data={campaignData} onUpdate={updateCampaignData} />;
      case 1:
        return <CampaignSegmentation data={campaignData.segment} onUpdate={(segment) => updateCampaignData({ segment })} />;
      case 2:
        return <CampaignContent data={campaignData.content} onUpdate={(content) => updateCampaignData({ content })} />;
      case 3:
        return <CampaignReview data={campaignData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create Campaign" 
        description="Set up a new marketing campaign to target your audience"
        action={
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              icon={<Save size={16} />}
              disabled={createMutation.isLoading}
            >
              Save Draft
            </Button>
          </div>
        }
      />
      
      {/* Stepper */}
      <div className="py-4">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <li key={step.id} className="relative md:flex-1">
                <div className="flex items-center">
                  {index > 0 && (
                    <div className="hidden md:block w-full bg-gray-200" style={{ height: '2px' }}>
                      <div 
                        className="bg-blue-600 h-full transition-all"
                        style={{ width: currentStep >= index ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      currentStep >= index 
                        ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' 
                        : 'border-gray-300 bg-white text-gray-500'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current"></span>
                  </button>
                </div>
                <div className="mt-2 hidden md:block text-center text-sm font-medium">
                  <span className={currentStep >= index ? 'text-blue-600' : 'text-gray-500'}>
                    {step.name}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step content */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        {renderStepContent()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          icon={<ChevronLeft size={16} />}
        >
          Back
        </Button>
        
        <div className="flex space-x-3">
          {currentStep === STEPS.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleLaunch}
              disabled={createMutation.isLoading}
              icon={<Rocket size={16} />}
            >
              {createMutation.isLoading ? 'Launching...' : 'Launch Campaign'}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              icon={<ChevronRight size={16} />}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreate;