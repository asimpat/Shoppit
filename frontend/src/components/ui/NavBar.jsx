import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import NavBarLink from "./NavBarLink";

export default function NavBar() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 stickyNavbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
          SHOPPIT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Button
                  variant="outline-dark"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            <Button variant="dark" className="ms-3 rounded-circle">
              <span role="img" aria-label="cart">
                🛒
              </span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
