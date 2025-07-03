import { useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const demoProducts = [
  {
    id: 1,
    name: "HP EliteBook",
    price: 200,
    // img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 2,
    name: "Rolex Wrist",
    price: 300,
    // img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  },
  {
    id: 3,
    name: "Gucci Shoe",
    price: 250,
    // img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  },
  {
    id: 4,
    name: "Human Psycology",
    price: 100,
    // img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  },
  {
    id: 5,
    name: "Gucci Bag",
    price: 220,
    // img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 6,
    name: "Millionaire Fast Lane",
    price: 100,
    // img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  },
  {
    id: 7,
    name: "AllStars Shoe",
    price: 120,
    // img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  },
  {
    id: 8,
    name: "Nike Shoe",
    price: 150,
    // img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  },
  {
    id: 9,
    name: "Rolex Wrist",
    price: 220,
    // img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  },
  {
    id: 10,
    name: "Strawberry Parfait",
    price: 80,
    // img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 11,
    name: "Vans Hodi",
    price: 150,
    // img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  },
  {
    id: 12,
    name: "Vintage Jacket",
    price: 200,
    // img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  },
];

export default function Products() {
  const [products] = useState(demoProducts);

  return (
    <Container>
      <Row>
        {products.map((p) => (
          <Col md={3} sm={6} xs={12} key={p.id} className="mb-4">
            <Card className="h-100 shadow product-card">
              <Card.Img
                variant="top"
                src={p.img}
                style={{ height: 180, objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{p.name}</Card.Title>
                <Card.Text className="text-muted">
                  ${p.price.toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
