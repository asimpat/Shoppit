import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useEffect } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const cityRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      cityRef.current,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "ng" }, // optional, restricts to Nigeria
      }
    );
    

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      let selectedCity = "";
      let selectedState = "";

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) {
          selectedCity = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          selectedState = component.long_name;
        }
      });

      setForm((prevForm) => ({
        ...prevForm,
        city: selectedCity,
        state: selectedState,
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setForm({ ...form, profilePicture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.username && form.email && form.password) {
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      const result = await register(formData);

      if (result.success) {
        navigate("/profile");
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : "Registration failed"
        );
      }
    } else {
      setError("Please fill in all required fields");
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
          <Card.Title className="mb-3 text-center">
            Create an account.
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture URL</Form.Label>
                  <Form.Control
                    name="profilePicture"
                    placeholder="Profile picture URL"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search your city"
                ref={cityRef}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={form.state}
                readOnly
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                placeholder="Enter your city"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                placeholder="Enter your state"
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                placeholder="Enter your address"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
