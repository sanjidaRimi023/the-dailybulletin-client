import { toast } from 'react-toastify';
import { auth } from '../../Firebase/firebase.config';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";


export default function NavUserDropdown({ user }) {
    const [open, setOpen] = useState(false)
    const { logOutUser } = useAuth()
    const handleLogout = () => {
        logOutUser(auth)
            .then(() => {
                toast.success("logout successfully")
            })
    }



    return (
        <div class="relative inline-block ">
            <button onClick={() => setOpen(!open)} class="cursor-pointer">
                <img class="flex-shrink-0 object-cover mx-1 rounded-full size-12" src={user?.photoURL || "https://imgs.search.brave.com/FJYFJtWbPjTkNkUiTXl2UH0N-zFAzi250TdKJjX0BZ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVBORy1CYWNr/Z3JvdW5kLnBuZw"} alt="jane avatar" />
            </button>

            <div class={`${open ? "absolute" : "hidden"} right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800`}
            >
                <a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src={user?.photoURL || "https://imgs.search.brave.com/FJYFJtWbPjTkNkUiTXl2UH0N-zFAzi250TdKJjX0BZ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVBORy1CYWNr/Z3JvdW5kLnBuZw"} alt="jane avatar" />
                    <div class="mx-1">
                        <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">{user?.displayName || "User"}</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                </a>

                <hr class="border-gray-200 dark:border-gray-700 " />

                <Link to="/profile" class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaUser />
                    <span class="mx-1">
                        view profile
                    </span>
                </Link>

                <Link to={`/dashboard`} class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <MdDashboard />
                    <span class="mx-1">
                        Dashboard
                    </span>
                </Link>

                <button onClick={handleLogout} class="flex w-full items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <VscSignOut />
                    <span class="mx-1">
                        Sign Out
                    </span>
                </button>
            </div>
        </div >
    )
}
