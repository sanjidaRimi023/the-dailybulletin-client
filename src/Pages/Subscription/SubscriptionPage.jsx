import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router";

import PaymentForm from "../Subscription/PaymentForm";
import Sharebtn from "../../Components/Ui/Sharebtn";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    name: "Trial",
    durationLabel: "1 minute",
    durationMinutes: 1,
    price: 1,
    description: "Perfect for a quick test drive.",
    recommended: false,
  },
  {
    name: "Basic",
    durationLabel: "5 days",
    durationMinutes: 5 * 24 * 60,
    price: 5,
    description: "Ideal for short-term projects.",
    recommended: false,
  },
  {
    name: "Standard",
    durationLabel: "10 days",
    durationMinutes: 10 * 24 * 60,
    price: 10,
    description: "Best value for regular users.",
    recommended: true,
  },
];

const SubscriptionPage = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: userData } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const userType = userData?.isPremium === true;

  const [selectedPlan, setSelectedPlan] = useState(
    plans.find((p) => p.recommended) || plans[1]
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (showPaymentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPaymentModal]);

  if (userType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 py-20 text-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
            You're Already a Premium Member!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Thank you for your support. Enjoy unlimited access to all our
            premium articles and features.
          </p>
          <Link to="/all-articles">
            <Sharebtn text="Explore Premium Articles" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Pricing
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              <Typewriter
                words={[
                  "Unlock Premium Access",
                  "Read Without Limits",
                  "Support Quality Content",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the plan that's right for you and gain instant access to
            exclusive articles, in-depth analysis, and more.
          </p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan)}
                className={`rounded-3xl p-8 ring-1 transition-all duration-300 cursor-pointer hover:shadow-2xl  hover:shadow-indigo-700 hover:-translate-y-1 ${
                  selectedPlan.name === plan.name
                    ? "ring-2 ring-indigo-600 bg-indigo-50 dark:bg-indigo-900/10"
                    : "ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800/50"
                }`}
              >
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {plan.name}
                  {plan.recommended && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-900 dark:text-indigo-300 dark:ring-indigo-700">
                      Recommended
                    </span>
                  )}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
                    for {plan.durationLabel}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="rounded-md bg-indigo-600 px-4 md:px-8 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Subscribe to "{selectedPlan.name}" plan
            </button>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm"
          aria-labelledby="payment-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md transform rounded-2xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3
                  className="text-lg font-bold text-gray-900 dark:text-white"
                  id="payment-modal-title"
                >
                  Secure Payment
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white transition-colors"
                aria-label="Close payment form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="mb-6 rounded-lg bg-slate-50 dark:bg-slate-700/50 p-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  Order Summary
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Plan:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {selectedPlan.name} ({selectedPlan.durationLabel})
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Price:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ${selectedPlan.price}
                    </span>
                  </div>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  paymentInfo={{
                    email: user?.email,
                    durationMinutes: selectedPlan.durationMinutes,
                    price: selectedPlan.price,
                    durationLabel: selectedPlan.durationLabel,
                  }}
                />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionPage;
