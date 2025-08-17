import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers, FaNewspaper, FaEye, FaStar } from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md border transition-all duration-300 flex flex-col justify-between">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-1">
          {(value || 0).toLocaleString()}
        </p>
        {change && (
          <p
            className={`text-sm mt-1 ${
              changeType === "increase" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {change}
          </p>
        )}
      </div>
      <div className="p-3 rounded-full bg-indigo-300">
        <Icon className="text-xl" />
      </div>
    </div>
  </div>
);

// Dashboard Card
const DashboardCard = ({ title, children }) => (
  <div className="p-5 md:p-6 rounded-2xl shadow-sm border">
    <h2 className="text-lg md:text-xl font-semibold mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const AdminOverView = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: overviewData = {},
    isLoading: isOverviewLoading,
    refetch: refetchOverview,
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => (await axiosSecure.get("/admin-stats")).data,
  });

  const {
    data: trendsData = [],
    isLoading: isTrendsLoading,
    refetch: refetchTrends,
  } = useQuery({
    queryKey: ["admin-trends"],
    queryFn: async () => (await axiosSecure.get("/admin/article-trends")).data,
  });

  const {
    data: todayData = {},
    isLoading: isTodayLoading,
    refetch: refetchToday,
  } = useQuery({
    queryKey: ["admin-today"],
    queryFn: async () => (await axiosSecure.get("/admin/today-stats")).data,
  });

  const {
    data: publishersData = [],
    isLoading: isPublishersLoading,
    refetch: refetchPublishers,
  } = useQuery({
    queryKey: ["admin-publishers"],
    queryFn: async () => (await axiosSecure.get("/publishers")).data,
  });

  const {
    data: recentArticlesData = [],
    isLoading: isArticlesLoading,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ["admin-recent-articles"],
    queryFn: async () => (await axiosSecure.get("/article/approved")).data,
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
  }, [
    refetchOverview,
    refetchTrends,
    refetchToday,
    refetchPublishers,
    refetchArticles,
  ]);

  const isLoading =
    isOverviewLoading ||
    isTrendsLoading ||
    isTodayLoading ||
    isPublishersLoading ||
    isArticlesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-indigo-600">
          Loading dashboard...
        </div>
      </div>
    );
  }

  const getStatusChipClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Declined":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base mt-1">
            Welcome back! Here’s a summary of today’s insights.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            change={`${(
              (overviewData?.premiumUsers / overviewData?.users) * 100 || 0
            ).toFixed(1)}% of total`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardCard title="Site Activity Trends (Last 7 Days)">
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      name="New Users"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="articles"
                      name="New Articles"
                      stroke="#4F46E5" 
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      name="Views"
                      stroke="#F59E0B"
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
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={publishersData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#4F46E5"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {publishersData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || "#4F46E5"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
        </div>

        <DashboardCard title="Recent Articles">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-4 text-left font-medium">Title</th>
                  <th className="p-4 text-left font-medium">Publisher</th>
                  <th className="p-4 text-left font-medium">Views</th>
                  <th className="p-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentArticlesData.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-indigo-300">
                    <td className="p-4 font-medium">
                      {article.title}
                    </td>
                    <td className="p-4">{article.publisher}</td>
                    <td className="p-4">
                      {(article.viewCount || 0).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusChipClass(
                          article.status
                        )}`}
                      >
                        {article.status}
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
