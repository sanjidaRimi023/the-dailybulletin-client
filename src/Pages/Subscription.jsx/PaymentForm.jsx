import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
    const plan = location.state?.plan;
    const axiosInstance= useAxios()

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      // 🔐 Create a payment method
      const { paymentMethod, error: paymentError } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentError) {
        setError(paymentError.message);
        setProcessing(false);
        return;
      }

      // ⚠️ Normally you would call your backend to create a PaymentIntent here

      // ✅ Payment Successful (Simulated)
      setSuccess("Payment successful!");

      // 🕒 Get current time
      const currentTimestamp = new Date().toISOString();

      // 🔄 Update user subscription in DB (via API)
      await axiosInstance.patch("/users/premium", {
    email: user?.email,
    premiumTaken: currentTimestamp,
    durationMinutes: plan.durationMinutes,
});


      // ✅ Navigate or show success
      navigate("/profile");
    } catch (err) {
        console.log(err);
      setError("Something went wrong!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Subscribe to: {plan?.durationLabel}</h2>
      <p className="text-gray-700 mb-4">Pay ${plan?.price} to activate your subscription</p>

      <form onSubmit={handleSubmit}>
        <CardElement
          className="p-4 border rounded-md mb-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};
export default PaymentForm;