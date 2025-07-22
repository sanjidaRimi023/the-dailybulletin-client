import React from "react";
import { FaDollarSign, FaTasks, FaUsers } from "react-icons/fa";

const AdminOverview = () => {
  return (
    <>
      <div className="p-4 md-8">
        <h3 className="text-4xl font-bold">Dashboard</h3>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Users Card */}
            <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-full text-2xl">
                <FaUsers />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm font-semibold uppercase">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-gray-900">1,254</p>
                <span className="text-green-500 text-sm">
                  +5% since last month
                </span>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
              <div className="bg-green-500 text-white p-3 rounded-full text-2xl">
                <FaDollarSign />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm font-semibold uppercase">
                  Revenue
                </h3>
                <p className="text-3xl font-bold text-gray-900">$34,560</p>
                <span className="text-green-500 text-sm">
                  +12% since last month
                </span>
              </div>
            </div>

            {/* Tasks Card */}
            <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
              <div className="bg-yellow-400 text-white p-3 rounded-full text-2xl">
                <FaTasks />
              </div>
              <div>
                <h3 className="text-gray-700 text-sm font-semibold uppercase">
                  Tasks Completed
                </h3>
                <p className="text-3xl font-bold text-gray-900">320</p>
                <span className="text-red-500 text-sm">
                  -2% since last week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
