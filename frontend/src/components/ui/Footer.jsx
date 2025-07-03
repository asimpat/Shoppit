import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="footer mt-auto"
      style={{
        background: "#625fd6",
        color: "#fff",
        padding: "1.5rem 0 0.5rem 0",
        textAlign: "center",
        marginTop: "3rem",
      }}
    >
      <Container>
        <div>
          <a href="#" style={{ color: "#fff", margin: "0 0.5rem" }}>
            Home
          </a>{" "}
          |
          <a href="#" style={{ color: "#fff", margin: "0 0.5rem" }}>
            About
          </a>{" "}
          |
          <a href="#" style={{ color: "#fff", margin: "0 0.5rem" }}>
            Shop
          </a>{" "}
          |
          <a href="#" style={{ color: "#fff", margin: "0 0.5rem" }}>
            Contact
          </a>
        </div>
        <div className="mt-2">
          {/* Social icons can be added here if desired */}
        </div>
        <div className="mt-2">&copy; 2024 Shoppit</div>
      </Container>
    </footer>
  );
}
