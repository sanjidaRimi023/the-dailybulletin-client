import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logoimage from "../../assets/logoimage-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-bold">Stay Updated</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter to get the latest news & updates.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
              />
              <button className="rounded px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md">
                Subscribe
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:underline hover:text-blue-500">Home</Link></li>
              <li><Link to="/about" className="hover:underline hover:text-blue-500">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-blue-500">Contact</Link></li>
              <li><Link to="/privacy" className="hover:underline hover:text-blue-500">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1234-567890</li>
              <li>✉️ contact@dailybulletin.com</li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-gray-300 dark:border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <img src={logoimage} alt="The Daily Bulletin Logo" className="w-40" />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} The Daily Bulletin. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-300">
            <Link to="#"><FaFacebookF className="hover:text-blue-600 transition" size={30} /></Link>
            <Link to="#"><FaTwitter className="hover:text-sky-500 transition" size={30}  /></Link>
            <Link to="#"><FaInstagram className="hover:text-pink-500 transition"  size={30} /></Link>
            <Link to="#"><FaGithub className="hover:text-gray-900 dark:hover:text-white transition"  size={30} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
