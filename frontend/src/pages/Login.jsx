import { Card, Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(form.username, form.password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card style={{ minWidth: 350 }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Welcome Back</Card.Title>
          <Form onSubmit={handleSubmit}>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
