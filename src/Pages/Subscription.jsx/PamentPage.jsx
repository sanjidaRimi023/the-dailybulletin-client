import { Elements } from '@stripe/react-stripe-js';
import React from 'react';

const PamentPage = () => {
    return (
        <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
    );
};

export default PamentPage;