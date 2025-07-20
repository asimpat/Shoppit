import React from "react";
import { Link, useSearchParams } from "react-router-dom";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Payment Failed</h1>
      {/* <p>Product ID: {productId}</p> */}
      {/* You can use productId to show more info or retry */}
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default PaymentFailed;
