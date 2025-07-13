import React from "react";
import Sharebtn from "../../Components/Ui/Sharebtn";
import AuthButton from "../../Components/Ui/auth-button";
import { Link } from "react-router";

const plans = [
  {
    name: "Starter",
    price: "$1",
    description: "Perfect for readers who want basic access.",
    features: ["Limited access", "Daily newsletter", "Email support"],
    highlighted: false,
  },
  {
    name: "Popular",
    price: "$10",
    description: "Best for regular readers and casual news lovers.",
    features: ["Unlimited articles", "Weekly magazine", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$5",
    description: "Ideal for teams or commercial users.",
    features: [
      "Multi-user access",
      "Downloadable reports",
      "Dedicated manager",
    ],
    highlighted: false,
  },
];

export default function Plan() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Stay informed. Choose a plan that fits your curiosity.
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Real news. Real value. Just the way you like it.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative px-6 py-8 rounded-3xl transition-all duration-300
              ${
                plan.highlighted
                  ? "scale-105 z-10 shadow-2xl bg-blue-100 dark:bg-gray-800 border-2 border-blue-500 transition duration-300 ease-in-out hover:scale-110"
                  : " h-auto relative z-0 rounded-3xl scale-90 duration-300 hover:scale-100 transition-shadow cursor-pointer hover:shadow-lg hover:shadow-blue-400 bg-gray-50 dark:bg-gray-800"
              }
            `}
          >
            {plan.highlighted && (
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {plan.name}
            </p>
            <h3 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              {plan.price}
              <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                {" "}
                /mo
              </span>
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 
                      7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 
                      001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/subscription">
              <AuthButton text="Subscribe Now" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
