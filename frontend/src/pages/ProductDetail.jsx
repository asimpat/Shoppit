import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${slug}/`);
        setProduct(response.data);
        if (response.data.category) {
          const relRes = await api.get(
            `/products/?category=${response.data.category}`
          );
          setRelated(relRes.data.filter((p) => p.slug !== slug));
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart");
  };

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
  if (!product)
    return (
      <Alert variant="warning" className="my-5 text-center">
        Product not found
      </Alert>
    );

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              style={{ height: 400, objectFit: "cover" }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <div className="mb-2 text-muted">
            SKU: {product.slug.toUpperCase()}
          </div>
          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="mb-3">${product.price ?? "N/A"}</h4>
          <p>{product.description}</p>
          <Button variant="outline-dark" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Col>
      </Row>
      <h3 className="mt-5 mb-3">Related products</h3>
      <Row>
        {related.map((p) => (
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
