import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

// import { Form } from '../components/loginElements'

function navbar2() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/userHome">Solar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/userHome">Home</Nav.Link>
            <Nav.Link href="/userReq">Request Form</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="#requeststatus/3.1">Request Status</NavDropdown.Item>
              <NavDropdown.Item href="#billinginfo/3.2">
                Billing Info
              </NavDropdown.Item>
              <NavDropdown.Item href="#contactus/3.3">Contact Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#aboutus/3.4">
                About Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#logout">Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar2;