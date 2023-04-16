import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "../components/Logout";
import { getUserFullName, getUserId, getUserRole, redirectToUserDashboard } from "../utils/utils";


export default function SolarNavbar() {
  const [userFullName, setUserFullName] = useState('')
  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    setUserFullName(getUserFullName)
    setUserId(getUserId)
    setUserRole(getUserRole)
  }, [])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Solar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/userreq">Request Form</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="/userprog">Request Status</NavDropdown.Item>
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
            {
              userId && userFullName
                ? (
                    <NavDropdown title={userFullName} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={redirectToUserDashboard}>
                        Your Dashboard
                      </NavDropdown.Item>
                      <Logout />
                    </NavDropdown>
                  ) 
                : <Nav.Link href="/login">Log in</Nav.Link>
            }
            {
              userId && userId === '1'
                ? <Nav.Link href="/admin">Administration</Nav.Link>
                : <></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

