import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 color="danger">Payment Failed</h1>
      <p>
        Unfortunately, your payment could not be processed. Please try again or
        contact support if the issue persists.
      </p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default PaymentFailed;
