import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ImHome, ImFileText2, ImUserCheck, ImEnter, ImSun, ImInfo, ImCoinDollar, ImNewspaper } from "react-icons/im";


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
          <Navbar.Brand href="/">{<ImSun />} Solar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">{<ImHome />} Home</Nav.Link>
              <Nav.Link href="/userreq">{<ImFileText2 />} Request Form</Nav.Link>
              {
                this.state.isLoggedIn && this.state.roleId === '2'
                  ? <Nav.Link href="/salesrep">Sales Rep Dashboard</Nav.Link>
                  : <></>
              }
              <NavDropdown title="Service" id="basic-nav-dropdown">
                <NavDropdown.Item href="/userprog">{<ImInfo/>} Request Status</NavDropdown.Item>
                {/* <NavDropdown.Item href="#billinginfo/3.2">
                  Billing Info
                </NavDropdown.Item>
                <NavDropdown.Item href="#payment/3.3">{<ImCoinDollar />} Payment</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item href="/aboutUs">
                {<ImNewspaper />} About Us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

}

