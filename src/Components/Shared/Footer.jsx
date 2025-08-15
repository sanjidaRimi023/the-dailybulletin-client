import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  FaFacebookF,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import logo from "../../assets/nav-logo.png";
import Swal from "sweetalert2";

const Footer = () => {
  const { pathname: path } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Thank you for subscribing to our newsletter!",
      icon: "success",
      draggable: true,
      showConfirmButton: false,
      timer: 1500
    });

    e.target.reset();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-article", label: "All Articles" },
    { to: "/terms-condition", label: "Terms & Condition" },
    { to: "/contact-us", label: "Contact Us" },
 
  ];

  return (
    <>
      <footer className="bg-gray-800 text-gray-300">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  The_DailyBulletin
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Bringing you the latest news, every day, every hour. Stay
                informed. Stay ahead.
              </p>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`relative text-gray-300 hover:text-white transition-all duration-300 group ${
                        path === link.to ? "text-indigo-400 font-semibold" : ""
                      }`}
                    >
                      {link.label}
                      <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <h3 className="text-white text-lg font-semibold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest news and updates delivered straight to your
                inbox.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <hr className="my-4 border-gray-700 dark:border-gray-300" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} The Daily Bulletin. All Rights
              Reserved.
            </p>
            <div className="flex gap-4 text-xl text-gray-400">
              <Link
                to="#"
                className="hover:text-indigo-600 transition-transform duration-300 hover:scale-125"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                className="hover:text-sky-500 transition-transform duration-300 hover:scale-125"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="hover:text-pink-500 transition-transform duration-300 hover:scale-125"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                className="hover:text-white transition-transform duration-300 hover:scale-125"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
