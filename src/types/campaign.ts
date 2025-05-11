export interface Rule {
  field: string;
  operator: string;
  value: string | number | boolean;
}

export interface Segment {
  rules: Rule[];
  operator: 'AND' | 'OR';
}

export interface CampaignContent {
  subject: string;
  body: string;
  callToAction: string;
  senderName: string;
  senderEmail: string;
}

export interface CampaignMetrics {
  audienceSize: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  openRate: number;
  clickRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'push';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'failed';
  createdAt: string;
  sentAt: string | null;
  audienceSize: number;
  segment?: Segment;
  content?: CampaignContent;
  metrics?: CampaignMetrics;
}