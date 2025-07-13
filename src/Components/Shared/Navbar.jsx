import { Link, useLocation } from "react-router";
import logo from "../../assets/nav-logo.png";
import useAuth from "../../Hooks/useAuth";
import NavUserDropdown from "../Customs/nav-user-dropdown";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Sharebtn from "../Ui/Sharebtn";


const Navbar = () => {
  const { pathname: path } = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 shadow-sm px-4 py-4 lg:px-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10" />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Typewriter
            words={["The_Daily_Bulletin"]}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </div>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden text-3xl text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      {/* Nav Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:space-x-5 absolute lg:static top-full left-0 w-full lg:w-auto bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent px-4 py-4 lg:p-0`}
      >
        <Link
          to="/"
          className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
            path === "/" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          <span className="relative z-10">Home</span>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/all-article"
          className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
            path === "/all-article" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          All Article
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/subscription"
          className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
            path === "/subscription" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          Subscriptions
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Auth Buttons */}
        <div>
          {user?.email ? (
            <div className="flex justify-end">
              <NavUserDropdown user={user} />
            </div>
        ) : (
          <div className="space-y-2 md:flex lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0">
            <Link to="/login">
              <Sharebtn text="Login"/>
            </Link>
            <Link to="/register">
              <Sharebtn text="Register"/>
            </Link>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
