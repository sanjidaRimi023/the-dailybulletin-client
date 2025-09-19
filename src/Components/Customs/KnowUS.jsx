import React from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const features = [
  {
    icon: <CheckCircleIcon />,
    title: "Verified & Unbiased News",
    description: "Our team of dedicated journalists ensures every story is fact-checked and presented without bias, giving you the truth you can trust.",
  },
  {
    icon: <ClockIcon />,
    title: "24/7 Real-Time Updates",
    description: "Stay ahead with breaking news and live updates. We cover the most important events as they happen, around the clock.",
  },
  {
    icon: <GlobeIcon />,
    title: "In-Depth Global Coverage",
    description: "From local happenings to international affairs, our extensive network provides comprehensive coverage on a global scale.",
  },
];


const KnowUS = () => {
  return (
    <section className="py-20">
      <div
        className="container mx-auto px-6 text-center"
       
      >
       
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-4"
          
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            The Daily Bulletin
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-3xl mx-auto mb-12"
         
        >
          Your trusted source for breaking news, in-depth analysis, and exclusive reports from around the world. We cut through the noise to bring you clarity.
        </motion.p>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl shadow-lg border border-indigo-700 flex flex-col items-center"
       
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      
        <div>
          <Link
            to="/all-article"
            className="inline-block bg-indigo-600 text-white font-bold text-lg px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KnowUS;
