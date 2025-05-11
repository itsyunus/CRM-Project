import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, Megaphone, PieChart, BarChart3, ArrowRight } from 'lucide-react';
import { fetchDashboardStats, fetchRecentCampaigns } from '../services/api';
import DashboardCard from '../components/dashboard/DashboardCard';
import StatsCard from '../components/dashboard/StatsCard';
import CampaignStatusChart from '../components/dashboard/CampaignStatusChart';
import RecentCampaignsList from '../components/dashboard/RecentCampaignsList';
import PageHeader from '../components/common/PageHeader';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery('dashboardStats', fetchDashboardStats);
  const { data: recentCampaigns, isLoading: campaignsLoading } = useQuery('recentCampaigns', fetchRecentCampaigns);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your CRM activities."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Customers"
          value={statsLoading ? "Loading..." : stats?.customerCount.toString()}
          change={statsLoading ? null : stats?.customerGrowth}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Active Campaigns"
          value={statsLoading ? "Loading..." : stats?.activeCampaigns.toString()}
          change={statsLoading ? null : stats?.campaignGrowth}
          icon={<Megaphone className="h-6 w-6 text-teal-600" />}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Delivery Rate"
          value={statsLoading ? "Loading..." : `${stats?.deliveryRate}%`}
          change={statsLoading ? null : stats?.deliveryRateChange}
          icon={<BarChart3 className="h-6 w-6 text-amber-600" />}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Engagement"
          value={statsLoading ? "Loading..." : `${stats?.engagementRate}%`}
          change={statsLoading ? null : stats?.engagementChange}
          icon={<PieChart className="h-6 w-6 text-purple-600" />}
          isLoading={statsLoading}
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Campaign Performance">
          <CampaignStatusChart isLoading={statsLoading} data={stats?.campaignPerformance} />
        </DashboardCard>
        
        <DashboardCard title="Recent Campaigns">
          <RecentCampaignsList 
            campaigns={recentCampaigns || []} 
            isLoading={campaignsLoading} 
          />
          <div className="mt-4 text-right">
            <Link 
              to="/campaigns" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View all campaigns
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <DashboardCard title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/campaigns/create" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-md">
              <Megaphone className="h-5 w-5 text-blue-700" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Create Campaign</h3>
              <p className="text-sm text-gray-500">Set up a new marketing campaign</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-blue-600" />
          </Link>
          
          <Link to="/customers" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <div className="p-2 bg-teal-100 rounded-md">
              <Users className="h-5 w-5 text-teal-700" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Manage Customers</h3>
              <p className="text-sm text-gray-500">View and manage your customer base</p>
            </div>
            <ArrowUpRight className="ml-auto h-5 w-5 text-teal-600" />
          </Link>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Dashboard;