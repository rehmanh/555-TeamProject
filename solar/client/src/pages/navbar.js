import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "../components/Logout";
import { getUserFullName, getUserId, getUserRole, redirectToUserDashboard } from "../utils/utils";
import Sun from '../img/sun.png'
import { ImHome, ImFileText2, ImUserCheck, ImEnter, ImSun, ImInfo, ImCoinDollar, ImStatsBars, ImNewspaper } from "react-icons/im";


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
    <Navbar bg="light" expand="md" sticky="top">
      <Container>
        <Navbar.Brand href="/">{<ImSun />}
        {/* <img
              src= {Sun}
              width="40"
              height="40"
              className="d-inline-block align-top"
              loading="lazy"
            /> */}
            Solar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              {<ImHome />} Home
              </Nav.Link>
            <Nav.Link href="/userreq">
              {<ImFileText2 />} Request Form
              </Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="/userprog">
                {<ImInfo/>} Request Status
                </NavDropdown.Item>
              <NavDropdown.Item href="#billinginfo/3.2">
                Billing Info
              </NavDropdown.Item>
              <NavDropdown.Item href="#payment/3.3">{<ImCoinDollar />} Payment</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/aboutUs">
                {<ImNewspaper />} About Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {
              userId && userFullName 
                ? (
                    <NavDropdown title={userFullName} id="basic-nav-dropdown"> 
                      <NavDropdown.Item onClick={redirectToUserDashboard}>
                        {<ImStatsBars />}
                        Your Dashboard
                      </NavDropdown.Item>
                      <Logout />
                    </NavDropdown>
                  ) 
                : <Nav.Link href="/login">{<ImEnter />} Login</Nav.Link>
            }
            {
              userId && userId === '1'
                ? <Nav.Link href="/admin">{<ImUserCheck />} Administration</Nav.Link>
                : <></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

