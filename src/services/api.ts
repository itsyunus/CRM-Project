import axios from 'axios';

// Base API instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Mock data for development
const mockCustomers = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', orderCount: 5, lastPurchase: '2023-05-10', status: 'active' },
  { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 987-6543', orderCount: 3, lastPurchase: '2023-04-22', status: 'active' },
  { id: 'c3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1 (555) 456-7890', orderCount: 8, lastPurchase: '2023-05-15', status: 'active' },
  { id: 'c4', name: 'Lisa Brown', email: 'lisa@example.com', phone: '+1 (555) 876-5432', orderCount: 2, lastPurchase: '2023-03-18', status: 'inactive' },
  { id: 'c5', name: 'Michael Davis', email: 'michael@example.com', phone: '+1 (555) 234-5678', orderCount: 6, lastPurchase: '2023-05-05', status: 'active' },
];

const mockCampaigns = [
  { 
    id: 'camp1', 
    name: 'Spring Sale Announcement', 
    description: 'Announcing our spring sale with 20% off on all products',
    type: 'email',
    status: 'completed',
    audienceSize: 450,
    createdAt: '2023-03-15',
    sentAt: '2023-03-20',
  },
  { 
    id: 'camp2', 
    name: 'Customer Feedback Survey', 
    description: 'Requesting feedback from customers who made purchases in the last month',
    type: 'email',
    status: 'active',
    audienceSize: 220,
    createdAt: '2023-04-10',
    sentAt: '2023-04-12',
  },
  { 
    id: 'camp3', 
    name: 'New Product Launch', 
    description: 'Introducing our new summer collection to repeat customers',
    type: 'email',
    status: 'draft',
    audienceSize: 325,
    createdAt: '2023-05-05',
    sentAt: null,
  },
  { 
    id: 'camp4', 
    name: 'Abandoned Cart Reminder', 
    description: 'Reminder for customers who have items in their cart',
    type: 'email',
    status: 'scheduled',
    audienceSize: 85,
    createdAt: '2023-05-12',
    sentAt: null,
  },
  { 
    id: 'camp5', 
    name: 'Loyalty Program Update', 
    description: 'Announcing new benefits for loyalty program members',
    type: 'email',
    status: 'failed',
    audienceSize: 180,
    createdAt: '2023-04-28',
    sentAt: '2023-04-30',
  },
];

const mockCampaignDetail = {
  id: 'camp2',
  name: 'Customer Feedback Survey',
  description: 'Requesting feedback from customers who made purchases in the last month',
  type: 'email',
  status: 'active',
  createdAt: '2023-04-10',
  sentAt: '2023-04-12',
  metrics: {
    audienceSize: 220,
    delivered: 198,
    opened: 143,
    clicked: 87,
    failed: 22,
    openRate: 72,
    clickRate: 61,
  },
  segment: {
    rules: [
      { field: 'last_order_date', operator: 'greater_than', value: '2023-03-12' },
      { field: 'order_count', operator: 'greater_than', value: 1 }
    ],
    operator: 'AND'
  },
  content: {
    subject: 'We value your feedback, {{firstName}}',
    body: 'Dear {{firstName}},\n\nThank you for your recent purchase on {{orderDate}}. We hope you\'re enjoying your items!\n\nWe would love to hear your thoughts on your shopping experience. Your feedback helps us improve our service for you and all our customers.\n\nPlease take a moment to complete our short customer satisfaction survey by clicking the button below.\n\nThank you for your time!\n\nBest regards,\nThe Team',
    callToAction: 'Take the Survey',
    senderName: 'Customer Care Team',
    senderEmail: 'feedback@company.com'
  },
  targetAudience: [
    { id: 'c1', name: 'John Doe', email: 'john@example.com', deliveryStatus: 'delivered' },
    { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', deliveryStatus: 'delivered' },
    { id: 'c3', name: 'Robert Johnson', email: 'robert@example.com', deliveryStatus: 'failed' },
    { id: 'c4', name: 'Lisa Brown', email: 'lisa@example.com', deliveryStatus: 'delivered' },
    { id: 'c5', name: 'Michael Davis', email: 'michael@example.com', deliveryStatus: 'delivered' },
    { id: 'c6', name: 'Sarah Wilson', email: 'sarah@example.com', deliveryStatus: 'delivered' },
  ],
  recentActivity: [
    { type: 'success', message: 'Campaign sent to 220 recipients', timestamp: '2023-04-12 10:00 AM' },
    { type: 'error', message: 'Failed to deliver to 22 recipients', timestamp: '2023-04-12 10:05 AM' },
    { type: 'info', message: '143 opens recorded', timestamp: '2023-04-13 02:30 PM' },
    { type: 'success', message: '87 clicks on CTA button', timestamp: '2023-04-14 11:15 AM' },
  ]
};

const mockDeliveryLogs = [
  { id: 'log1', customerId: 'c1', customerName: 'John Doe', email: 'john@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:08', openedAt: '2023-04-12 11:30:22', clickedAt: '2023-04-12 11:32:45' },
  { id: 'log2', customerId: 'c2', customerName: 'Jane Smith', email: 'jane@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:10', openedAt: '2023-04-12 15:45:33', clickedAt: null },
  { id: 'log3', customerId: 'c3', customerName: 'Robert Johnson', email: 'robert@example.com', status: 'failed', sentAt: '2023-04-12 10:01:05', error: 'Invalid email address', deliveredAt: null, openedAt: null, clickedAt: null },
  { id: 'log4', customerId: 'c4', customerName: 'Lisa Brown', email: 'lisa@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:12', openedAt: '2023-04-12 18:20:11', clickedAt: '2023-04-12 18:21:30' },
  { id: 'log5', customerId: 'c5', customerName: 'Michael Davis', email: 'michael@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:07', openedAt: null, clickedAt: null },
  { id: 'log6', customerId: 'c6', customerName: 'Sarah Wilson', email: 'sarah@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:09', openedAt: '2023-04-13 09:15:40', clickedAt: '2023-04-13 09:17:22' },
  { id: 'log7', customerId: 'c7', customerName: 'David Thompson', email: 'david@example.com', status: 'failed', sentAt: '2023-04-12 10:01:05', error: 'Mailbox full', deliveredAt: null, openedAt: null, clickedAt: null },
  { id: 'log8', customerId: 'c8', customerName: 'Emily Clark', email: 'emily@example.com', status: 'delivered', sentAt: '2023-04-12 10:01:05', deliveredAt: '2023-04-12 10:01:15', openedAt: '2023-04-12 12:05:33', clickedAt: '2023-04-12 12:08:41' },
];

const mockCustomerFields = [
  { id: 'email', label: 'Email Address', type: 'string' },
  { id: 'first_name', label: 'First Name', type: 'string' },
  { id: 'last_name', label: 'Last Name', type: 'string' },
  { id: 'total_spent', label: 'Total Spent', type: 'number' },
  { id: 'order_count', label: 'Order Count', type: 'number' },
  { id: 'last_order_date', label: 'Last Order Date', type: 'date' },
  { id: 'country', label: 'Country', type: 'string' },
  { id: 'zip_code', label: 'Zip Code', type: 'string' },
  { id: 'tags', label: 'Customer Tags', type: 'array' },
];

const mockDashboardStats = {
  customerCount: 1250,
  customerGrowth: 12,
  activeCampaigns: 3,
  campaignGrowth: 50,
  deliveryRate: 92,
  deliveryRateChange: 2,
  engagementRate: 68,
  engagementChange: 5,
  campaignPerformance: [
    { name: 'Delivered', value: 92 },
    { name: 'Opened', value: 68 },
    { name: 'Clicked', value: 43 },
    { name: 'Failed', value: 8 },
  ]
};

const mockRecentCampaigns = [
  { id: 'camp1', name: 'Spring Sale Announcement', status: 'completed', sentAt: '2023-03-20', metrics: { delivered: 432, opened: 310, clicked: 189 } },
  { id: 'camp2', name: 'Customer Feedback Survey', status: 'active', sentAt: '2023-04-12', metrics: { delivered: 198, opened: 143, clicked: 87 } },
  { id: 'camp5', name: 'Loyalty Program Update', status: 'failed', sentAt: '2023-04-30', metrics: { delivered: 162, opened: 95, clicked: 52 } },
];

// API Functions
export const fetchCustomers = async (searchTerm = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (searchTerm) {
      return mockCustomers.filter(
        customer => 
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return mockCustomers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchCampaigns = async (searchTerm = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (searchTerm) {
      return mockCampaigns.filter(
        campaign => 
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return mockCampaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const fetchCampaignById = async (id?: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockCampaignDetail;
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    throw error;
  }
};

export const fetchCampaignDeliveryLogs = async (id?: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockDeliveryLogs;
  } catch (error) {
    console.error(`Error fetching delivery logs for campaign ${id}:`, error);
    throw error;
  }
};

export const createCampaign = async (campaignData: any) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: 'new-campaign-id',
      ...campaignData,
      createdAt: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const fetchCustomerFields = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCustomerFields;
  } catch (error) {
    console.error('Error fetching customer fields:', error);
    throw error;
  }
};

export const translateRuleToEnglish = async (rule: any) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return "Customers who made a purchase in the last 30 days AND spent more than $100";
  } catch (error) {
    console.error('Error translating rule:', error);
    throw error;
  }
};

export const convertEnglishToRule = async (englishRule: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (englishRule.toLowerCase().includes('last 30 days')) {
      return {
        rules: [
          { field: 'last_order_date', operator: 'greater_than', value: '2023-04-15' },
          { field: 'total_spent', operator: 'greater_than', value: 100 }
        ],
        operator: 'AND'
      };
    } else if (englishRule.toLowerCase().includes('repeat customer')) {
      return {
        rules: [
          { field: 'order_count', operator: 'greater_than', value: 1 }
        ],
        operator: 'AND'
      };
    } else {
      return {
        rules: [
          { field: 'email', operator: 'contains', value: '@example.com' }
        ],
        operator: 'AND'
      };
    }
  } catch (error) {
    console.error('Error converting English to rule:', error);
    throw error;
  }
};

export const fetchDashboardStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockDashboardStats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const fetchRecentCampaigns = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockRecentCampaigns;
  } catch (error) {
    console.error('Error fetching recent campaigns:', error);
    throw error;
  }
};