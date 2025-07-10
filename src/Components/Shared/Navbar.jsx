import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logoimage-removebg-preview.png";


const Navbar = ({ user, userRole, darkMode, toggleTheme, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = "hover:text-blue-500 transition";

  const renderLinks = () => {
    const baseLinks = [
      { path: "/", label: "Home" },
      { path: "/articles", label: "All Articles" },
    ];
    const privateLinks = user
      ? [
          { path: "/add-article", label: "Add Article" },
          { path: "/subscription", label: "Subscription" },
          { path: "/my-articles", label: "My Articles" },
        ]
      : [{ path: "/subscription", label: "Subscription" }];

    const roleLinks = [];
    if (userRole === "admin") roleLinks.push({ path: "/dashboard", label: "Dashboard" });
    if (userRole === "premium") roleLinks.push({ path: "/premium-articles", label: "Premium Articles" });

    return [...baseLinks, ...privateLinks, ...roleLinks];
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-32" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {renderLinks().map(({ path, label }) => (
            <NavLink key={path} to={path} className={navItemClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Auth + Theme (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className={navItemClass}>Login</NavLink>
              <NavLink to="/register" className={navItemClass}>Register</NavLink>
            </>
          ) : (
            <>
              <button onClick={handleLogout} className="hover:text-red-500 transition">Logout</button>
              <Link to="/profile">
                <img
                  src={user?.photoURL || "https://i.ibb.co/LNTP7fy/default-user.png"}
                  className="w-10 h-10 rounded-full border-2"
                  alt="User"
                />
              </Link>
            </>
          )}
         
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 dark:bg-gray-800 px-4 py-4 space-y-2">
          {renderLinks().map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className="block px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login" className="block px-2 py-1" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="block px-2 py-1" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-1 hover:text-red-500"
              >
                Logout
              </button>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/LNTP7fy/default-user.png"}
                    className="w-8 h-8 rounded-full border"
                    alt="User"
                  />
                  <span>Profile</span>
                </div>
              </NavLink>
            </>
          )}

          {/* Theme Toggle */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-sm">Dark Mode</span>
            <button onClick={toggleTheme}>
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
