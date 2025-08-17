import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoInformationCircleOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoCall,
} from "react-icons/io5";

import logo from "../../assets/newlogo.png";

import NavUserDropdown from "../Customs/nav-user-dropdown";
import useAuth from "../../Hooks/useAuth";
import ThemeToggle from "../Customs/ThemeToggle";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home", icon: <IoHomeOutline size={18} /> },
    {
      to: "/all-article",
      text: "Articles",
      icon: <IoNewspaperOutline size={18} />,
    },
    {
      to: "/about-us",
      text: "About Us",
      icon: <IoInformationCircleOutline size={18} />,
    },
    {
      to: "/contact-us",
      text: "Contact",
      icon: <IoCall size={18} />,
    },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur shadow-sm px-4 py-4 lg:px-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-30" />
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
    absolute lg:static top-full right-0 
    w-1/2 lg:w-auto   // mobile এ ৫০% width
    lg:flex lg:items-center lg:gap-4
    lg:bg-transparent
    p-4 lg:p-0 shadow-lg lg:shadow-none rounded-b-lg lg:rounded-none
    transition-all duration-300 ease-in-out
    ${
      isOpen
        ? "opacity-100 translate-y-0 bg-indigo-300"
        : "opacity-0 -translate-y-5 invisible lg:visible lg:opacity-100 lg:translate-y-0"
    }
  `}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 w-fit">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`flex items-center gap-2 w-full lg:w-auto px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                pathname === link.to
                  ? "bg-blue-100 text-indigo-600"
                  : "hover:bg-blue-100 hover:text-indigo-700"
              }`}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <hr className="my-4 border-gray-200 lg:hidden" />

        <div className="flex items-center">
          {user?.email ? (
            <div className="">
              <NavUserDropdown user={user} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-full text-indigo-600 hover:bg-blue-100 transition-all duration-300 border border-indigo-200"
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
