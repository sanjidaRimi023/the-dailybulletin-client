import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Sharebtn from "../../Components/Ui/Sharebtn";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PaymentForm = ({ paymentInfo }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // backend e payment intent create kora
    if (paymentInfo?.price) {
      axiosSecure.post("/payment/create-payment-intent", {
          amount: paymentInfo?.price
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, paymentInfo?.price]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: user?.email,
      });

    if (confirmError) {
      console.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      
      // Ekhane paymentInfo diye DB te save koro (e.g., axiosSecure.post("/save-subscription", {...}))
      await axiosSecure.patch(`/users/subscribe/${user.email}`)
      toast.success("✅ Payment succeeded!");
    }
  };

  return (
    <>
      <form onSubmit={handlePayment}>
        <CardElement className="border p-3 rounded-md mb-4" />
        <Sharebtn text={`pay-${paymentInfo.price}$`} type="submit" />
      </form>
    </>
  );
};

export default PaymentForm;