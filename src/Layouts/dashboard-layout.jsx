import { Link, Outlet } from "react-router";
import { useEffect, useState } from "react";
import Toast from "../Components/Shared/Toast";
import DashboardSideBar from "../Components/Customs/dashboard-side-bar";

import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { RiListSettingsFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const mobileBreakPoint = 768;

const SidebarContent = ({ navItems }) => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <Link to="/" className="inline-block">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          The Daily Bulletin
        </h3>
      </Link>
      <div className="mt-6">
        <DashboardSideBar navItems={navItems} />
      </div>
    </div>
    <div>
      <a href="#" className="flex items-center p-2 -mx-2">
        <img
          className="object-cover mx-2 rounded-full h-9 w-9"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <span className="mx-2 font-medium text-gray-800">John Doe</span>
      </a>
    </div>
  </div>
);

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileBreakPoint
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- This should come from your auth context or state management ---
  const isAdmin = false;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < mobileBreakPoint;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardItems = {
    user: [
      { path: "/dashboard/user", title: "Dashboard", icon: MdDashboard },
      {
        path: "/dashboard/user/my-article",
        title: "My Article",
        icon: SiBlogger,
      },
      {
        path: "/dashboard/user/profile",
        title: "Profile",
        icon: RiListSettingsFill,
      },
      {
        path: "/dashboard/user/subscription",
        title: "Subscriptions",
        icon: IoPricetagsOutline,
      },
    ],
    admin: [
      { path: "/dashboard/admin", title: "Admin Dashboard", icon: MdDashboard },
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

  const navItems = isAdmin ? dashboardItems.admin : dashboardItems.user;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Toast />
      <div className="relative flex min-h-screen bg-gray-50">
        {isMobile ? (
          <>
            <aside
              className={`fixed inset-y-0 left-0 z-50 w-64 px-4 py-8 bg-white border-r transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SidebarContent navItems={navItems} />
            </aside>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black opacity-50"
                onClick={toggleSidebar}
              ></div>
            )}
          </>
        ) : (
          <aside className="w-64 px-4 py-8 bg-white border-r">
            <div className="fixed w-64 h-[95vh]">
              <SidebarContent navItems={navItems} />
            </div>
          </aside>
        )}

        <main className="flex-1">
          {isMobile && (
            <header className="p-4 bg-white shadow-md">
              <button onClick={toggleSidebar} className="text-2xl">
                {isSidebarOpen ? <RxCross1 /> : <FaBars />}
              </button>
            </header>
          )}
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
