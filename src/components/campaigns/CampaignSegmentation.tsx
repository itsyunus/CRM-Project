import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus, Trash2, HelpCircle, ArrowDown, ArrowRight } from 'lucide-react';
import * as LucideReact from 'lucide-react';
import { fetchCustomerFields, translateRuleToEnglish, convertEnglishToRule } from '../../services/api';
import Button from '../common/Button';
import { JsonViewer } from '@textea/json-viewer';

interface Rule {
  field: string;
  operator: string;
  value: string | number | boolean;
}

interface Segment {
  rules: Rule[];
  operator: 'AND' | 'OR';
}

interface CampaignSegmentationProps {
  data: Segment;
  onUpdate: (segment: Segment) => void;
}

const CampaignSegmentation: React.FC<CampaignSegmentationProps> = ({ data, onUpdate }) => {
  const [segment, setSegment] = useState<Segment>(data);
  const [englishRule, setEnglishRule] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [showRuleJson, setShowRuleJson] = useState(false);
  const [audienceEstimate, setAudienceEstimate] = useState<number | null>(null);
  
  const { data: fields, isLoading: fieldsLoading } = useQuery('customerFields', fetchCustomerFields);

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'in_list', label: 'In list' },
    { value: 'not_in_list', label: 'Not in list' },
  ];

  const addRule = () => {
    const newRules = [...segment.rules, { field: '', operator: 'equals', value: '' }];
    const newSegment = { ...segment, rules: newRules };
    setSegment(newSegment);
    onUpdate(newSegment);
  };

  const removeRule = (index: number) => {
    const newRules = segment.rules.filter((_, i) => i !== index);
    const newSegment = { ...segment, rules: newRules };
    setSegment(newSegment);
    onUpdate(newSegment);
  };

  const updateRule = (index: number, field: keyof Rule, value: any) => {
    const newRules = [...segment.rules];
    newRules[index] = { ...newRules[index], [field]: value };
    const newSegment = { ...segment, rules: newRules };
    setSegment(newSegment);
    onUpdate(newSegment);
  };

  const updateOperator = (operator: 'AND' | 'OR') => {
    const newSegment = { ...segment, operator };
    setSegment(newSegment);
    onUpdate(newSegment);
  };

  const handleEnglishRuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnglishRule(e.target.value);
  };

  const convertToRule = async () => {
    if (!englishRule.trim()) return;
    
    setIsConverting(true);
    try {
      const rule = await convertEnglishToRule(englishRule);
      setSegment(rule);
      onUpdate(rule);
      // Simulate audience estimation
      setAudienceEstimate(Math.floor(Math.random() * 1000) + 100);
    } catch (error) {
      console.error('Error converting English to rule:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Audience Segmentation</h3>
        <p className="mt-1 text-sm text-gray-500">
          Define the criteria for targeting specific customer segments.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="text-sm font-medium text-gray-700 mr-4">Natural Language Rule</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <textarea
                className="w-full h-20 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Example: Show me customers who made a purchase in the last 30 days and spent more than $100"
                value={englishRule}
                onChange={handleEnglishRuleChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={convertToRule}
                disabled={isConverting || !englishRule.trim()}
                icon={<LucideReact.Magic size={16} />}
              >
                {isConverting ? 'Converting...' : 'Convert to Rules'}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            <HelpCircle size={14} className="mr-1" />
            <span>Use plain English to describe your target audience</span>
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="mx-4">
          <ArrowDown size={20} className="text-gray-400" />
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="text-sm font-medium text-gray-700 mr-4">Rule Builder</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-700 mr-2">Match</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => updateOperator('AND')}
                className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  segment.operator === 'AND'
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ALL
              </button>
              <button
                type="button"
                onClick={() => updateOperator('OR')}
                className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  segment.operator === 'OR'
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ANY
              </button>
            </div>
            <span className="text-sm text-gray-700 ml-2">of the following conditions:</span>
          </div>
          
          <div className="space-y-3">
            {segment.rules.map((rule, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-gray-50 rounded-md">
                <div className="w-full sm:w-1/3">
                  <select
                    value={rule.field}
                    onChange={(e) => updateRule(index, 'field', e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select field</option>
                    {!fieldsLoading && fields && fields.map((field: any) => (
                      <option key={field.id} value={field.id}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-1/4">
                  <select
                    value={rule.operator}
                    onChange={(e) => updateRule(index, 'operator', e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {operatorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-1/3">
                  <input
                    type="text"
                    value={rule.value as string}
                    onChange={(e) => updateRule(index, 'value', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Value"
                  />
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <button
              type="button"
              onClick={addRule}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} className="mr-2" />
              Add Condition
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          {audienceEstimate !== null && (
            <div className="text-sm">
              <span className="font-medium">Estimated audience size:</span>{' '}
              <span className="text-blue-600 font-semibold">{audienceEstimate} customers</span>
            </div>
          )}
        </div>
        
        <div>
          <button
            type="button"
            onClick={() => setShowRuleJson(!showRuleJson)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showRuleJson ? 'Hide JSON' : 'View JSON'}
          </button>
        </div>
      </div>

      {showRuleJson && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 overflow-auto">
          <JsonViewer
            value={segment}
            rootName={null}
            defaultInspectDepth={1}
            displayDataTypes={false}
            displaySize={false}
            enableClipboard={false}
            theme="light"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      )}
    </div>
  );
};

export default CampaignSegmentation;