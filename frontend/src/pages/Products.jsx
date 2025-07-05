import { useState, useEffect } from "react";
import { Card, Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import api, { BASE_URL } from "../api/axios";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        console.log("resss", response.data);
        
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
    <Container className="mt-5">
      <h3 className="text-center mb-4">Our Products</h3>
      <Row>
        {products.map((p) => (
          <Col md={3} sm={6} xs={12} key={p.id} className="mb-4">
            <Card className="h-100 shadow product-card">
              <Card.Img
                variant="top"
                src={`${BASE_URL}${p.image}`}
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
