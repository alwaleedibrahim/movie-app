import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Button } from "react-bootstrap";

export default function Header() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <Container fluid className="p-0">
      <Navbar>
        <Container fluid>
          <NavLink to="/" className={["navbar-brand"]}>
            Movie App
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className={["nav-link"]}>
              Home
            </NavLink>
            <NavLink to="/movies" className={["nav-link"]}>
              Movies
            </NavLink>
          </Nav>
          <Button variant={theme == 'light' ? "outline-dark" :"outline-info"} onClick={toggleTheme}>
            {theme == 'light' ? <>&#127769;</> : <>&#9788;</>}
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
