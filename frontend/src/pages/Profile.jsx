import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Image,
  Spinner,
} from "react-bootstrap";
import * as Icon from "react-feather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!user) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setForm(user); // Reset form
    setEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await updateProfile(form);
    if (result.success) {
      toast.success("Profile updated successfully!");
      setEditing(false);
    } else {
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-4">
          <Row>
            <Col xs={10} className="text-center mb-4">
              <Image
                src={
                  form.profilePicture
                    ? form.profilePicture.startsWith("http")
                      ? form.profilePicture
                      : form.profilePicture.startsWith("/")
                      ? `http://localhost:3000${form.profilePicture}`
                      : `http://localhost:3000/media/${form.profilePicture}`
                    : "/images/headerImage.png"
                }
                roundedCircle
                width={110}
                height={110}
                alt="Profile"
                className="mb-2"
                style={{ objectFit: "cover", border: "3px solid #ccc" }}
              />
              <h5 className="mb-0">
                {form.firstName} {form.lastName}
              </h5>
              <small className="text-muted">{form.email}</small>
            </Col>
            <Col
              xs={2}
              className="d-flex justify-content-end align-items-start"
            >
              {!editing && (
                <Icon.Edit
                  color="blue"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                  size={22}
                  title="Edit Profile"
                />
              )}
            </Col>
          </Row>

          <Form onSubmit={handleSave}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={form.city || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={form.state || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </Form.Group>

            <div className="d-flex gap-3">
              {editing ? (
                <>
                  <Button type="submit" variant="success" className="w-100">
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="w-100"
                  >
                    Cancel
                  </Button>
                </>
              ) : null}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
