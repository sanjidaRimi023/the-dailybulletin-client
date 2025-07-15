import React from "react";
import { Link, useLocation } from "react-router";
import { FaFacebookF, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/nav-logo.png";
import { Typewriter } from "react-simple-typewriter";

const Footer = () => {
  const { pathname: path } = useLocation();
  return (
    <footer className="bg-gray-800">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              The_Daily_Bulletin
            </span>
            
          </div>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                path === "/" ? "text-blue-500" : "text-white"
              }`}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/all-article"
              className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                path === "/all-article" ? "text-blue-500" : "text-white"
              }`}
            >
              All Article
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/subscription"
              className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                path === "/subscription" ? "text-blue-500" : "text-white"
              }`}
            >
              Subscriptions
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact-us"
              className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                path === "/contact-us" ? "text-blue-500" : "text-white"
              }`}
            >
              Contact Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about-us"
              className={`block px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                path === "/about-us" ? "text-blue-500" : "text-white"
              }`}
            >
              About Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-10">
          <p className="text-lg text-gray-300">
            Copyright: Any unauthorized use or reproduction of{" "}
            <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">The Daily Bulletin</span> content for commercial purposes{" "}
            <br /> is strictly prohibited and constitutes copyright infringement
            liable to legal action.
          </p>

          <div className="flex gap-4 text-xl text-gray-300">
            <Link to="#">
              <FaFacebookF
                className="hover:text-blue-600 transition"
                size={30}
              />
            </Link>
            <Link to="#">
              <FaTwitter className="hover:text-sky-500 transition" size={30} />
            </Link>
            <Link to="#">
              <FaInstagram
                className="hover:text-pink-500 transition"
                size={30}
              />
            </Link>
            <Link to="#">
              <FaGithub
                className="hover:text-gray-900 dark:hover:text-white transition"
                size={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
