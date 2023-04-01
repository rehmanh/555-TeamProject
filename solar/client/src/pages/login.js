import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../css/login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { IconContext } from "react-icons";
import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs";
import { motion } from 'framer-motion'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const json = JSON.stringify({
      email_address: this.state.email_address,
      password: this.state.password,
    });

    const toastOptions = {
      onClose: props => window.location.href = "/"
    };

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;
    axios
      .post("/api-login/", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response && response.status === 200) {
          // want to store the role and token in the localStorage
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('roleId', response.data.data.roleId);
          localStorage.setItem('userId', response.data.data.userId);
          toast.success('Login Successful', toastOptions);
        }
        this.setState({
          email_address: '',
          password: ''
        });
      })
      .catch((response) => {
        // response status code was not SUCCESS
        console.log(response)
        if (response && response.status !== 200) {
          toast.error('Incorrect Email/Password provided. Please try again.')
        }
      })
      .catch((response) => {
        // we did not receive a response; there was a request issue
        toast.error('There was an issue with your request. Please try again later.')
      });
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
    event.preventDefault();
  }

  render() {
    return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {duration: 1}}}
      exit={{opacity: 0 }}
      >
        {/* <div className="background-image"> */}
          <img
          className="background-image"
            src={
              "https://tesla-cdn.thron.com/delivery/public/image/tesla/45992f1c-a33a-4a04-b1f0-338aff182f8e/bvlatuR/std/2880x1800/_25-Hero-D"
            }
            alt="background"
          />
          <Form className="formclass centered" onSubmit={this.handleLogin}>
            {/* <center> */}
            <h1>Login</h1>
            {/* </center> */}
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                label="Email address"
                id="form1"
                name="email_address"
                value={this.state.email_address}
                onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                label="Password"
                id="form2"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-3 mb-3" controlId="formHorizontalCheck">
              <Row>
                <Col xs={6} md="auto">
                  <Form.Check
                    label="Remember me"
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                  />
                </Col>
                <Col xs={6} md="auto" className="mt-">
                  <span>
                    <a href="!#">Forgot password?</a>
                  </span>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg">
                Sign in
              </Button>
            </Form.Group>
            <Form.Group>
              <div className="text-center mt-5">
                <p>
                  Not a member? <a href="/signup">Register</a>
                </p>
                <p>or sign up with:</p>
                <Container className="w-75 mb-4">
                  <Row xs="auto" className="justify-content-md-center">
                    <Col xs>
                      <IconContext.Provider value={{ size: "2em", color: "#de5246" }}>
                        <a className="iconBtn" href="!#"><BsGoogle /></a>
                      </IconContext.Provider>
                    </Col>
                    <Col xs>
                      <IconContext.Provider value={{ size: "2em", color: "#4267B2" }}>
                        <a href="!#"><BsFacebook /></a>
                      </IconContext.Provider>
                    </Col>
                    <Col xs>
                      <IconContext.Provider value={{ size: "2em", color: "#1DA1F2" }}>
                        <a href="!#"><BsTwitter /></a>
                      </IconContext.Provider>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Form.Group>
          </Form>
        {/* </div> */}
      </motion.div>
    );
  }
}
