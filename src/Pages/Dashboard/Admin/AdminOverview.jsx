import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { FaUsers, FaNewspaper, FaEye, FaStar } from 'react-icons/fa'; 



// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      <div className="bg-gray-100 p-2 rounded-lg">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
    </div>
    <div>
      <p className="text-4xl font-bold text-gray-800 mt-2">{(value || 0).toLocaleString()}</p>
      {change && (
        <p className={`text-sm mt-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      )}
    </div>
  </div>
);

const DashboardCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);



const AdminOverView = () => {
  const axiosSecure = useAxiosSecure();

  const { data: overviewData = {}, isLoading: isOverviewLoading, refetch: refetchOverview } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => (await axiosSecure.get("/admin-stats")).data,
  });

  const { data: trendsData = [], isLoading: isTrendsLoading, refetch: refetchTrends } = useQuery({
    queryKey: ["admin-trends"],
    queryFn: async () => (await axiosSecure.get("/admin/article-trends")).data,
  });

  const { data: todayData = {}, isLoading: isTodayLoading, refetch: refetchToday } = useQuery({
    queryKey: ["admin-today"],
    queryFn: async () => (await axiosSecure.get("/admin/today-stats")).data,
  });

  const { data: publishersData = [], isLoading: isPublishersLoading, refetch: refetchPublishers } = useQuery({
    queryKey: ["admin-publishers"],
    queryFn: async () => (await axiosSecure.get("/admin/publisher-distribution")).data,
  });

  const { data: recentArticlesData = [], isLoading: isArticlesLoading, refetch: refetchArticles } = useQuery({
    queryKey: ["admin-recent-articles"],
    queryFn: async () => (await axiosSecure.get("/admin/recent-articles")).data,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchOverview();
      refetchTrends();
      refetchToday();
      refetchPublishers();
      refetchArticles();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetchOverview, refetchTrends, refetchToday, refetchPublishers, refetchArticles]);

  const isLoading = isOverviewLoading || isTrendsLoading || isTodayLoading || isPublishersLoading || isArticlesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const getStatusChipClass = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusInEnglish = (status) => {
    switch (status) {
      case 'Approved': return 'Approved';
      case 'Pending': return 'Pending';
      case 'Declined': return 'Declined';
      default: return status;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's a quick overview of your platform.
          </p>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={overviewData?.users}
            icon={FaUsers}
            change={`+${todayData?.newUsers || 0} today`}
            changeType="increase"
          />
          <StatCard
            title="Total Articles"
            value={overviewData?.articles}
            icon={FaNewspaper}
            change={`+${todayData?.newArticles || 0} today`}
            changeType="increase"
          />
          <StatCard
            title="Total Views"
            value={overviewData?.views}
            icon={FaEye}
            change={`+${todayData?.newViews || 0} today`}
            changeType="increase"
          />
          <StatCard
            title="Premium Users"
            value={overviewData?.premiumUsers}
            icon={FaStar}
            change={`${((overviewData?.premiumUsers / overviewData?.users) * 100 || 0).toFixed(1)}% of total`}
          />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      
          <div className="lg:col-span-2">
            <DashboardCard title="Article Publishing Trend (Last 7 Days)">
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={trendsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis allowDecimals={false} stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.75rem' }}/>
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="New Articles"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>

      
          <div>
            <DashboardCard title="Articles by Publisher">
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={publishersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {publishersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} layout="vertical" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
        </div>


        <DashboardCard title="Recent Articles">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-100">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-500">Title</th>
                  <th className="p-4 text-sm font-semibold text-gray-500">Publisher</th>
                  <th className="p-4 text-sm font-semibold text-gray-500">Views</th>
                  <th className="p-4 text-sm font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentArticlesData.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{article.title}</td>
                    <td className="p-4 text-gray-600">{article.publisher}</td>
                    <td className="p-4 text-gray-600">{(article.views || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(article.status)}`}>
                        {getStatusInEnglish(article.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default AdminOverView;
