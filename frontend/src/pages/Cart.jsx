import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  console.log("carttt", cart);

  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );
  const navigate = useNavigate();

  // Use item.total_price if available, otherwise fallback
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.total_price ?? item.product.price * item.quantity),
    0
  );
  const tax = 4; // Example fixed tax for demo
  const total = subtotal + tax;

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = (id) => {
    updateQuantity(id, parseInt(quantities[id]));
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Use the first product's id for demo; in real app, send all cart items
      const res = await api.post(`/orders/checkout/${cart[0].product.id}/`);
      if (res.data.url) {
        clearCart();
        window.location.href = res.data.url;
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to initiate payment, please try again later."
      );
    }
    setLoading(false);
  };

  if (cart.length === 0)
    return (
      <Alert variant="info" className="mt-5 text-center">
        Your cart is empty.
      </Alert>
    );

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <Row className="justify-content-center">
        <Col md={7}>
          <h5 className="mb-4">
            Shopping Cart: You have {cart.length} product
            {cart.length > 1 ? "s" : ""} in your cart
          </h5>
          <Card className="p-3 mb-3" style={{ background: "#f8f9fa" }}>
            {cart.map((item) => (
              <Row key={item.id} className="align-items-center mb-3">
                <Col xs={3} md={2}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Col>
                <Col xs={9} md={6}>
                  <div className="fw-bold">{item.product.name}</div>
                  <div className="text-muted">${item.product.price}</div>
                </Col>
                <Col xs={6} md={2}>
                  <Form.Control
                    type="number"
                    min={1}
                    value={quantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    style={{ width: 60, display: "inline-block" }}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Cart Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax:</span>
              <span>${tax}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <Button
              className="w-100 mt-3"
              variant="primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
            {!user && (
              <div style={{ color: "red", marginTop: 8 }}>
                You must be logged in to checkout.
              </div>
            )}
            {error && (
              <Alert variant="danger" className="mt-2">
                {error}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
