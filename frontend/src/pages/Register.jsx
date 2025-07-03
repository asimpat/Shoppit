import { Card, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.username && form.password) {
      navigate('/login');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "70vh"}}>
      <Card style={{minWidth: 350}} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Create an account.</Card.Title>
          <Form onSubmit={handleSubmit}>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" placeholder="Enter your username" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Create account</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
