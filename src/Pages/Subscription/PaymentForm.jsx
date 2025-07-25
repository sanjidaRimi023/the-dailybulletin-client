import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sharebtn from "../../Components/Ui/Sharebtn";

import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentForm = ({ paymentInfo }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (paymentInfo?.price && paymentInfo.price > 0) {
      axiosSecure
        .post("/payment/create-payment-intent", {
          price: paymentInfo.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, paymentInfo?.price]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (card == null) {
      setProcessing(false);
      return;
    }

    // const { error: paymentMethodError } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // if (paymentMethodError) {
    //   console.error(paymentMethodError.message);
    //   setError(paymentMethodError.message);
    //   setProcessing(false);
    //   return;
    // }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error(confirmError.message);
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const subscriptionData = {
          durationMinutes: paymentInfo.durationMinutes,
          planName: paymentInfo.durationLabel,
          price: paymentInfo.price,
          transactionId: paymentIntent.id,
        };

        await axiosSecure.patch("/users/subscribe", subscriptionData);

        toast.success("Payment Succeeded & You are now a premium member!");

        navigate("/article");
      } catch (dbError) {
        console.error("Failed to update user status:", dbError);
        setError(
          "Payment was successful, but we couldn't update your status. Please contact support."
        );
      }
    }

    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handlePayment}>
        <CardElement
          className="border p-3 rounded-md mb-4"
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

        {error && <p className="text-red-600 my-2">{error}</p>}

        <Sharebtn
          text={processing ? "Processing..." : `Pay $${paymentInfo.price}`}
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        />
      </form>
    </>
  );
};

export default PaymentForm;
