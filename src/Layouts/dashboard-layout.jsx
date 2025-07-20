import { Link, Outlet } from "react-router";
import DashboardSideBar from "../Components/Customs/dashboard-side-bar";
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { RiListSettingsFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import Toast from "../Components/Shared/Toast";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
const mobileBreakPoint = 768;

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mbl = window.matchMedia(`(max-width: ${mobileBreakPoint - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakPoint);
    };
    mbl.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < mobileBreakPoint);
    return () => mbl.removeEventListener("change", onChange);
  }, []);

  console.log(isMobile);

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
      <div className="flex">
        {isMobile ? (
          <div className="relative">
            <div className="">
              <button
                onClick={() => setOpen(!open)}
                className={`text-2xl py-4 px-2 ${open && "hidden"}`}
              >
                <FaBars />
              </button>
            </div>
            <aside
              className={`${
                open ? "block" : "hidden"
              } absolute z-[500] w-64 px-4 py-8 bg-white min-h-screen`}
            >
              <div className="flex flex-col relative">
                <Link to="/">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    The Daily Bulletin
                  </h3>
                </Link>
                <div className="flex w-full flex-col justify-between flex-1 mt-6">
                  <DashboardSideBar navItems={dashboardItems?.admin} />
                  <a href="#" className="flex items-center px-4 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full h-9 w-9"
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                      alt="avatar"
                    />
                    <span className="mx-2 font-medium text-gray-800 dark:text-gray-200"></span>
                  </a>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className={`absolute -top-8 -right-4 text-red-600 text-2xl py-4 px-2 ${!open && "hidden"}`}
                >
                  <RxCross1 />
                </button>
              </div>
            </aside>
          </div>
        ) : (
          <aside className="w-64 px-4 py-8 bg-white border-r min-h-screen rtl:border-r-0 rtl:border-l border-gray-400">
            <div className="flex flex-col min-h-[95vh] fixed">
              <Link to="/">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  The Daily Bulletin
                </h3>
              </Link>
              <div className="flex w-full flex-col justify-between flex-1 mt-6">
                <DashboardSideBar navItems={dashboardItems?.admin} />
                <a href="#" className="flex items-center px-4 -mx-2">
                  <img
                    className="object-cover mx-2 rounded-full h-9 w-9"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    alt="avatar"
                  />
                  <span className="mx-2 font-medium text-gray-800 dark:text-gray-200"></span>
                </a>
              </div>
            </div>
          </aside>
        )}

        {/* Content */}
        <div className="flex-1 z-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
