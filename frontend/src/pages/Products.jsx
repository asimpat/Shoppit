import { useState, useEffect } from "react";
import { Card, Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="my-5 text-center">
        {error}
      </Alert>
    );

  return (
    <Container>
      <Row>
        {products.map((p) => (
          <Col md={3} sm={6} xs={12} key={p.id} className="mb-4">
            <Card
              className="h-100 shadow product-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${p.slug}`)}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:3000${p.image}`}
                style={{ height: 180, objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{p.name}</Card.Title>
                <Card.Text className="text-muted">
                  ${p.price ?? "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
