// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React from "react";
// import Sharebtn from "../../Components/Ui/Sharebtn";
// import useAuth from "../../Hooks/useAuth";

// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const PaymentForm = () => {
//   const { user } = useAuth();
//   console.log(user);
//   const stripe = useStripe();
//   const element = useElements();
//   const axiosSecure = useAxiosSecure();

//   const handlePayment =async (e) => {
//     e.preventDefault();
//     const res=await axiosSecure.post("/payment/create-payment-intent")
//   };
//   return (
//     <>
//       <form onSubmit={handlePayment}>
//         <CardElement></CardElement>
//         <Sharebtn text="Get Access" type="Submit"></Sharebtn>
//       </form>
//     </>
//   );
// };

// export default PaymentForm;
