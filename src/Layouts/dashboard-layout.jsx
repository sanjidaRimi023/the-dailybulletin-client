import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { RiListSettingsFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { IoAddCircleOutline, IoPricetagsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import Toast from "../Components/Shared/Toast";
import DashboardSideBar from "../Components/Customs/dashboard-side-bar";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import useUserRole from "../Hooks/useUserRole";

const laptopBreakPoint = 1024; // 1024px = lg

const SidebarContent = ({ navItems, user, handleLogout }) => (
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
      <Link
        to="/dashboard/user/profile"
        className="flex items-center p-2 -mx-2"
      >
        <img
          className="object-cover mx-2 rounded-full h-9 w-9"
          src={
            user?.photoURL ||
            "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          alt="avatar"
        />
        <span className="mx-2 font-medium">{user?.displayName}</span>
      </Link>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  </div>
);

export default function DashboardLayout() {
  const [isLaptopOrUp, setIsLaptopOrUp] = useState(
    window.innerWidth >= laptopBreakPoint
  );
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= laptopBreakPoint);

  const { user, logOutUser } = useAuth();
  const userRole = useUserRole();

  const isAdmin = userRole?.role === "admin";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("logout successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const laptopOrUp = window.innerWidth >= laptopBreakPoint;
      setIsLaptopOrUp(laptopOrUp);

      // laptop+ হলে সবসময় open, ছোট হলে default বন্ধ
      if (laptopOrUp) {
        setSidebarOpen(true);
      } else {
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
      { path: "/dashboard/user/profile", title: "Profile", icon: FaUserCircle },
      {
        path: "/dashboard/user/subscription",
        title: "Subscriptions",
        icon: IoPricetagsOutline,
      },
      {
        path: "/dashboard/user/add-article",
        title: "Add Article",
        icon: IoAddCircleOutline,
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

  const navItems = isAdmin ? dashboardItems?.admin : dashboardItems?.user;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Toast />
      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 px-4 py-8 border-r border-gray-700 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 bg-indigo-300" : "-translate-x-full"} 
          lg:translate-x-0`}
        >
          <SidebarContent
            navItems={navItems}
            user={user}
            handleLogout={handleLogout}
          />
        </aside>

        {/* Overlay (only mobile/tablet এ) */}
        {!isLaptopOrUp && isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {!isLaptopOrUp && (
            <header className="p-4 shadow-md">
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
