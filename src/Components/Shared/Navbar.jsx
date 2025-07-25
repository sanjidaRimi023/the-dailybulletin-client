import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoAddCircleOutline,
  IoInformationCircleOutline,
  IoLogInOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

import logo from "../../assets/nav-logo.png";
import useAuth from "../../Hooks/useAuth";
import NavUserDropdown from "../Customs/nav-user-dropdown";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home", icon: <IoHomeOutline size={18} /> },
    { to: "/all-article", text: "All Articles", icon: <IoNewspaperOutline size={18} /> },
    { to: "/add-article", text: "Add Article", icon: <IoAddCircleOutline size={18} /> },
    { to: "/about-us", text: "About Us", icon: <IoInformationCircleOutline size={18} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 shadow-sm px-4 py-4 lg:px-20 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10" />
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={["The_Daily_Bulletin"]}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </Link>
      </div>

  
      <button
        className="lg:hidden text-3xl text-indigo-600 z-10" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

 
      <div
        className={`
          absolute lg:static top-full left-0 w-full lg:w-auto
          lg:flex lg:items-center lg:gap-4
          bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent
          p-4 lg:p-0 shadow-lg lg:shadow-none rounded-b-lg lg:rounded-none
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 invisible lg:visible lg:opacity-100 lg:translate-y-0"}
        `}
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`flex items-center gap-2 w-full lg:w-auto px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                pathname === link.to
                  ? "bg-blue-100 text-indigo-600 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-indigo-700 dark:hover:bg-gray-800"
              }`}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}
        </div>

       
        <hr className="my-4 border-gray-200 dark:border-gray-700 lg:hidden" />

        <div className="flex items-center">
          {user?.email ? (
            <div className="w-full flex justify-end">
              <NavUserDropdown user={user} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-full text-indigo-600 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 border border-indigo-200 dark:border-gray-700"
              >
                <IoLogInOutline size={18} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
              >
                <IoPersonAddOutline size={18} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;