import { useState, useRef, useEffect } from "react";
import { Link } from "react-router"; 
import { toast } from "react-toastify";
import { auth } from "../../Firebase/firebase.config";
import useAuth from "../../Hooks/useAuth";


import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";

export default function NavUserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logOutUser } = useAuth();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOutUser(auth).then(() => {
      toast.success("Logout successful!");
      setIsOpen(false); 
    });
  };

  const closeDropdown = () => setIsOpen(false);


  const fallbackAvatar = "https://i.ibb.co/6RJ4Mh5/avatar.png";
  const userAvatar = user?.photoURL || fallbackAvatar;

  return (
    <div className="relative" ref={dropdownRef}>

      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer block">
        <img
          className="object-cover border-2 border-indigo-500 rounded-full size-12"
          src={userAvatar}
          alt="User avatar"
        />
      </button>

      <div
        className={`
          absolute right-0 z-20 w-64 py-2 mt-2 overflow-hidden origin-top-right
          bg-white dark:bg-gray-800 rounded-md shadow-xl
          transition-all duration-200 ease-out
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >

        <div className="flex items-center p-3">
          <img
            className="flex-shrink-0 object-cover mx-1 rounded-full size-10"
            src={userAvatar}
            alt="User avatar"
          />
          <div className="mx-1 overflow-hidden">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
              {user?.displayName || "User"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="py-1">
          <Link
            to="/profile"
            onClick={closeDropdown}
            className="flex items-center gap-3 p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <FaUser className="text-gray-500" size={16} />
            <span>View Profile</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={closeDropdown}
            className="flex items-center gap-3 p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <MdDashboard className="text-gray-500" size={18} />
            <span>Dashboard</span>
          </Link>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />


        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 text-sm text-red-500 capitalize transition-colors duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-red-400"
        >
          <VscSignOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}