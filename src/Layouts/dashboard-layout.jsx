import logo from "../assets/logoimage-removebg-preview.png"
import DashboardSideBar from "../Components/Customs/dashboard-side-bar"
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { Link, Outlet } from "react-router";
export default function DashboardLayout() {

    const dashboardItems = {
        user: [
            {
                path: "/dashboard/user",
                title: "Dashboard",
                icon: MdDashboard
            },
            {
                path: "/dashboard/user/my-article",
                title: "My Article",
                icon: SiBlogger
            },
            {
                path: "/dashboard/user/add-article",
                title: "Add Article",
                icon: IoMdAdd
            }
        ]
    }


    return (
        <div className="flex">
            <aside className="w-64 px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l border-gray-400">
                <div className="flex flex-col min-h-[95vh] fixed">
                    <Link to="/">
                        <img className="w-auto h-10 sm:h-7" src={logo} alt="" />
                    </Link>

                    <div className="flex w-full flex-col justify-between flex-1 mt-6">
                        <DashboardSideBar navItems={dashboardItems?.user} />
                        <a href="#" className="flex items-center px-4 -mx-2">
                            <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">John Doe</span>
                        </a>
                    </div>
                </div>
            </aside>

            <div className="min-h-[150vh] z-50">
                <Outlet />
            </div>
        </div>
    )
}
