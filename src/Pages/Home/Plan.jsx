import React, { useState } from "react";
import { Link } from "react-router";
import { FaCheckDouble, FaStar } from "react-icons/fa";



// ডেটা স্ট্রাকচার আপডেট করা হয়েছে monthly/yearly price রাখার জন্য
const plans = [
  {
    name: "Trial",
    price: {
      monthly: 1,
      yearly: 10, // বাৎসরিক প্ল্যানে ছাড়
    },
    description: "Perfect for readers who want basic access.",
    features: ["Access to 5 premium articles/month", "Daily newsletter", "Email support"],
    highlighted: false,
  },
  {
    name: "Standard",
    price: {
      monthly: 10,
      yearly: 99,
    },
    description: "Best for regular readers and news lovers.",
    features: [
      "Unlimited articles access",
      "Weekly digital magazine",
      "Ad-free experience",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Basic",
    price: {
      monthly: 5,
      yearly: 50,
    },
    description: "Ideal for teams or commercial users.",
    features: [
      "All Pro features",
      "Multi-user access (up to 5)",
      "Downloadable reports",
      "Dedicated account manager",
    ],
    highlighted: false,
  },
];

export default function Plan() {
  const [billingCycle, setBillingCycle] = useState("monthly"); 

  return (
    <section className="px-4 sm:px-6 lg:px-8 overflow-hidden pb-10">
      <div className="container mx-auto">
      
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold sm:text-4xl">
            Flexible Plans for Every Reader
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose a plan that fits your curiosity. Get more with a yearly subscription.
          </p>
        </div>

    
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 font-medium ${billingCycle === 'monthly' ? 'text-indigo-400' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${billingCycle === 'yearly' ? 'bg-indigo-700' : 'bg-gray-300'}`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
          <span className={`ml-3 font-medium ${billingCycle === 'yearly' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-2 text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">SAVE 15%</span>
          </span>
        </div>


        <div className="grid gap-8 lg:grid-cols-3 lg:items-center lg:px-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 shadow-lg transition-transform duration-300 ${plan.highlighted ? "bg-indigo-700/50 hover:scale-105" : "bg-indigo-600/50"}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
                    <FaStar className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-4">{plan.description}</p>
              
              <div className="mt-6">
                <span className="text-4xl font-extrabold">
                  ${plan.price[billingCycle]}
                </span>
                <span className="text-base font-medium">
                  /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaCheckDouble className="h-6 w-6 text-green-500" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-base ">{feature}</p>
                  </li>
                ))}
              </ul>

              <Link to="/dashboard/user/subscription" className="mt-10 block">
                <button
                  className={`w-full py-2 px-4 text-base font-semibold rounded-full transition-colors duration-300 ${plan.highlighted ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-300"}`}
                >
                  Choose Plan
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}