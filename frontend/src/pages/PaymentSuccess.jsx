import React from "react";
import { Link, useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Payment Successful!</h1>
      {/* <p>Product ID: {productId}</p> */}
     
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}

export default PaymentSuccess;
