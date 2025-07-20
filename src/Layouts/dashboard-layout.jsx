import { useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardSideBar from "../Components/Customs/dashboard-side-bar";
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { RiListSettingsFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import Toast from "../Components/Shared/Toast";
import { HiMenu, HiX } from "react-icons/hi";

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const dashboardItems = {
    user: [
      {
        path: "/dashboard/user",
        title: "Dashboard",
        icon: MdDashboard,
      },
      {
        path: "/dashboard/user/my-article",
        title: "My Article",
        icon: SiBlogger,
      },
      {
        path: "/dashboard/user/manage-article",
        title: "Manage Article",
        icon: RiListSettingsFill,
      },
    ],
    admin: [
      {
        path: "/dashboard/admin",
        title: "Admin Dashboard",
        icon: MdDashboard,
      },
      {
        path: "/dashboard/admin/manage-users",
        title: "Manage Users",
        icon: RiListSettingsFill,
      },
      {
        path: "/dashboard/admin/manage-articles",
        title: "Manage Articles",
        icon: SiBlogger,
      },
      {
        path: "/dashboard/admin/add-publisher",
        title: "Add Publisher",
        icon: TiUserAdd,
      },
      {
        path: "/dashboard/admin/manage-publisher",
        title: "Manage Publisher",
        icon: FaUsersCog,
      },
    ],
  };

  return (
    <>
      <Toast />

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow sticky top-0 z-50">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          The Daily Bulletin
        </h3>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <HiX className="text-3xl text-gray-800" />
          ) : (
            <HiMenu className="text-3xl text-gray-800" />
          )}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-white w-64 border-r px-4 py-8 shadow-md fixed md:static z-40`}
        >
          <div className="flex flex-col h-full">
            <Link to="/" className="hidden md:block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                The Daily Bulletin
              </h3>
            </Link>

            <div className="flex flex-col justify-between flex-1 mt-6">
              <DashboardSideBar navItems={dashboardItems?.admin} />

              {/* Avatar */}
              <a href="#" className="flex items-center px-4 mt-8">
                <img
                  className="object-cover mx-2 rounded-full h-9 w-9"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
                <span className="mx-2 font-medium text-gray-800">Admin</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-0 md:ml-64 p-4 bg-gray-50 min-h-screen transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </>
  );
}
