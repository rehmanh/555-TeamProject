import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "../components/Logout";


export default class SolarNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      roleId: null,
      userId: null
    };
    
    this.state.isLoggedIn = localStorage !== null 
      && localStorage.getItem('token') !== null 
      && localStorage.getItem('roleId') !== null 
      && localStorage.getItem('userId') !== null;

    if (this.state.isLoggedIn) {
      this.state.roleId = localStorage.getItem('roleId');
      this.state.userId = localStorage.getItem('userId');
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Solar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
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
              {
              this.state.isLoggedIn
                ? <Logout />
                : <Nav.Link href="/login">Log in</Nav.Link>
              }
              {
                this.state.isLoggedIn && this.state.roleId === '1'
                  ? <Nav.Link href="/admin">Administration</Nav.Link>
                  : <></>
              }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

}

