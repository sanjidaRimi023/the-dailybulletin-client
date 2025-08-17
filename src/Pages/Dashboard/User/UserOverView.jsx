import useUserStats from "../../../Hooks/useUserStats";

import {
  FaCheckCircle,
  FaClock,
  FaEye,
  FaTimesCircle,
  FaFileAlt,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import LoadSpinner from "../../../Components/Ui/LoadSpinner";
import useAuth from "../../../Hooks/useAuth";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const UserOverView = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useUserStats();

  if (isLoading) {
    return <LoadSpinner />;
  }

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
  ];

  const StatCard = ({ icon, label, value, colorClass }) => (
    <div className="shadow-lg rounded-xl p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300 ease-in-out border">
      <div className={`p-3 rounded-full ${colorClass.bg}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium">
          {label}
        </p>
        <p className="text-2xl font-bold">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.displayName}!
          </h1>
          <p className="mt-1">
            Here's a summary of your activity.
          </p>
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
          <div className="lg:col-span-1 space-y-8">

            <div className="shadow-lg rounded-xl p-6 text-center">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-offset-2 ring-indigo-500"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">
                  {user?.displayName}
                </h2>
                <p className="text-sm">
                  {user?.email}
                </p>
                <p className="mt-2 text-sm font-semibold  px-3 py-1 bg-indigo-500 rounded-full inline-block">
                  {user?.role || "Reader"}
                </p>
              </div>
            </div>

    
            <div className="space-y-4">
              <StatCard
                icon={<FaFileAlt className="text-blue-500 text-2xl" />}
                label="Total Articles"
                value={stats.total}
                colorClass={{ bg: "bg-blue-100 dark:bg-blue-900" }}
              />
              <StatCard
                icon={<FaEye className="text-purple-500 text-2xl" />}
                label="Total Views"
                value={stats.totalViews}
                colorClass={{ bg: "bg-purple-100 dark:bg-purple-900" }}
              />
            </div>
          </div>


          <div className="lg:col-span-2 space-y-8">
    
            <div className=" shadow-lg rounded-xl p-6 border">
              <h3 className="text-lg font-bold mb-6">
                Article Status Overview
              </h3>
              <div style={{ height: "350px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={140}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(31, 41, 55, 0.8)",
                        borderColor: "#4B5563",
                        borderRadius: "0.75rem",
                        color: "#ffffff",
                      }}
                    />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DETAILED STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<FaCheckCircle className="text-green-500 text-2xl" />}
                label="Approved"
                value={stats.approved}
                colorClass={{ bg: "bg-green-100 dark:bg-green-900" }}
              />
              <StatCard
                icon={<FaClock className="text-yellow-500 text-2xl" />}
                label="Pending"
                value={stats.pending}
                colorClass={{ bg: "bg-yellow-100 dark:bg-yellow-900" }}
              />
              <StatCard
                icon={<FaTimesCircle className="text-red-500 text-2xl" />}
                label="Rejected"
                value={stats.rejected}
                colorClass={{ bg: "bg-red-100 dark:bg-red-900" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverView;
