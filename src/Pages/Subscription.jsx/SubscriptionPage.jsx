import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { Typewriter } from "react-simple-typewriter";
import Sharebtn from "../../Components/Ui/Sharebtn";

const plans = [
  {
    name: "Trial",
    durationLabel: "1 minute",
    durationMinutes: 1,
    price: 1,
    description: "Perfect for testing and preview.",
  },
  {
    name: "Basic",
    durationLabel: "5 days",
    durationMinutes: 5 * 24 * 60,
    price: 5,
    description: "Best for short-term premium access.",
  },
  {
    name: "Standard",
    durationLabel: "10 days",
    durationMinutes: 10 * 24 * 60,
    price: 10,
    description: "Recommended for regular users.",
  },
];

const SubscriptionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(plans[0]); // Default Trial

  const handlePlanChange = (e) => {
    const selected = plans.find(
      (plan) => plan.durationLabel === e.target.value
    );
    setSelectedPlan(selected);
  };

  const handleSubscribe = () => {
    navigate("/payment", {
      state: {
        email: user?.email,
        durationMinutes: selectedPlan.durationMinutes,
        price: selectedPlan.price,
        durationLabel: selectedPlan.durationLabel,
      },
    });
  };

  return (
    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
      {/* Left Side */}
      <div data-aos="fade-down" className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              <Typewriter
                words={[
                  "Unlock Premium Access",
                  "Read Articles Without Limits",
                  "Support Quality Journalism",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Subscribe Now & Enjoy the Benefits
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose a subscription plan that fits your needs. Instantly upgrade
              to premium and explore exclusive articles, features, and insights
              with no limitations.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {/* Dropdown */}
            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Choose Subscription Plan:
              </label>
              <select
                value={selectedPlan.durationLabel}
                onChange={handlePlanChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              >
                {plans.map((plan) => (
                  <option key={plan.durationLabel} value={plan.durationLabel}>
                    {plan.durationLabel} - ${plan.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Display */}
            <p className="text-lg mt-2 font-medium text-blue-700">
              Price: ${selectedPlan.price}
            </p>

            {/* Subscribe Button */}
            <button onClick={handleSubscribe}>
              <Sharebtn text="Get Access" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div
        data-aos="fade-up"
        className="flex items-center justify-center w-full h-96 lg:w-1/2"
      >
        <img
          className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
          src="https://i.ibb.co/20tnXmMj/old-texture-newspapers-stack-arrangement.jpg"
          alt="subscription banner"
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
