import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";




const ForbiddenPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 text-center">
    

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-red-600"
      >
        <FaBan size={120} />
      </motion.div>

      <motion.h2
        className="text-5xl font-bold mt-6 text-red-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        403 - Forbidden
      </motion.h2>

      <motion.p
        className="text-gray-600 mt-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Sorry, you don't have permission to access this page. Please contact an
        administrator or go back to the homepage.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
