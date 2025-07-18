import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default PaymentSuccess;
