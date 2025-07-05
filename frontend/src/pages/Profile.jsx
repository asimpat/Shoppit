import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(user || {});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await updateProfile(form);
    if (result.success) {
      setMessage("Profile updated successfully!");
      setEditing(false);
    } else {
      setMessage("Update failed.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card style={{ minWidth: 400 }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-3 text-center">My Profile</Card.Title>
          <Row className="mb-3 justify-content-center">
            <Col xs="auto">
              <Image
                src={form.profilePicture || "https://via.placeholder.com/120"}
                roundedCircle
                width={120}
                height={120}
                alt="Profile"
              />
            </Col>
          </Row>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={form.username || ""}
                disabled
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={form.email || ""}
                disabled
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={form.firstName || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={form.lastName || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={form.city || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                value={form.state || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                name="profilePicture"
                value={form.profilePicture || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>
            {message && <div className="mb-2 text-success">{message}</div>}
            {!editing ? (
              <Button variant="primary" onClick={handleEdit} className="w-100">
                Edit Profile
              </Button>
            ) : (
              <Button type="submit" variant="success" className="w-100">
                Save Changes
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
