import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Header.css"


export default function Header() {
  return (
    <Container fluid className="p-0">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <NavLink to="/" className={["navbar-brand"]}>Movie App</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className={["nav-link"]}>Home</NavLink>
            <NavLink to="/movies" className={["nav-link"]}>Movies</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}
