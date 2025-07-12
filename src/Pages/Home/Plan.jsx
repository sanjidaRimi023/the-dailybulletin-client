/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import Sharebtn from "../../Components/Ui/Sharebtn";

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const navigate = useNavigate();

  const features = [
    { label: "Access to all articles", free: true, premium: true },
    { label: "No ads or popups", free: false, premium: true },
    { label: "Daily newsletter", free: false, premium: true },
    { label: "Comment & interact", free: true, premium: true },
    { label: "Exclusive investigative reports", free: false, premium: true },
    { label: "Save & Bookmark content", free: true, premium: true },
  ];

  const handleSubscribe = () => {
    navigate("/subscription"); 
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      
        <div data-aos="fade-down" className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white relative inline-block group">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-[length:0%_3px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_3px] transition-[background-size] duration-500">
              Choose<span className="text-blue-500"> Your Plan</span>
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Whether you're a casual reader or a news addict, we've got a plan that fits your lifestyle.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Compare plans and unlock features that matter to you most.
          </p>
        </div>

     
        <div data-aos="fade-up" className="space-y-6">
        
          <div className="flex justify-center md:justify-end mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex shadow-lg">
              {["free", "premium"].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedPlan === plan
                      ? "bg-blue-600 text-white scale-105"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </button>
              ))}
            </div>
          </div>

          
          <motion.div
            key={selectedPlan}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
            className={`w-full max-w-md mx-auto p-6 rounded-lg shadow-xl transition-transform duration-300 ${
              selectedPlan === "premium"
                ? "bg-yellow-300 dark:bg-yellow-400"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-800 group relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-[background-size] duration-500">
                {selectedPlan === "free" ? "Free Plan" : "Premium Plan"}
              </span>
            </h3>

            <ul className="space-y-3">
              {features.map((feature, i) => {
                const available = selectedPlan === "free" ? feature.free : feature.premium;
                return (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-800 dark:text-gray-900"
                  >
                    {available ? (
                      <FaRegCheckCircle
                        className="text-green-600 animate-bounce-slow"
                        size={20}
                      />
                    ) : (
                      <FiXCircle className="text-red-600" size={20} />
                    )}
                    {feature.label}
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-center">
              <button onClick={handleSubscribe} className="mt-10">
                <Sharebtn text={selectedPlan === "free" ? "Get Started" : "Get Premium Access"} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
