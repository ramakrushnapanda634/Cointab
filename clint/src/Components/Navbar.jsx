import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="light" style={{ height: "50px" }}>
        <Container>
          <NavLink
            to="/"
            className="text-decoration-none text-light mx-2 text-align:center"
          >
            CoinTab
          </NavLink>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
