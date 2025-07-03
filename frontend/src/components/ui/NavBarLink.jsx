import React from "react";
import { Link } from "react-router-dom";

const NavBarLink = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link active fw-semibold" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fw-semibold" to="/shop">
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fw-semibold" to="/profile">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fw-semibold" to="/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fw-semibold" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default NavBarLink;
