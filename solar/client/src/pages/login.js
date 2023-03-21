import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import SolarNavbar from "../pages/navbar";
import { MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Form } from "../components/loginElements";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast} from 'react-toastify'

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
      <>
        <SolarNavbar />
        <div className="background-image">
          <img
            src={
              "https://tesla-cdn.thron.com/delivery/public/image/tesla/45992f1c-a33a-4a04-b1f0-338aff182f8e/bvlatuR/std/2880x1800/_25-Hero-D"
            }
            alt="background"
          />

          <div className="login-background">
            <div className="centered">
              <header>
                <center>
                  <h1>Login</h1>
                </center>
                <Form onSubmit={this.handleLogin}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="form1"
                    name="email_address"
                    type="text"
                    value={this.state.email_address}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />

                  <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Remember me"
                    />
                    <a href="!#">Forgot password?</a>
                  </div>

                  <MDBBtn type="submit" className="mb-4">
                    Sign in
                  </MDBBtn>

                  <div className="text-center">
                    <p>
                      Not a member? <a href="/signup">Register</a>
                    </p>
                    <p>or sign up with:</p>

                    <div
                      className="d-flex justify-content-between mx-auto"
                      style={{ width: "40%" }}
                    >
                      <MDBBtn
                        tag="a"
                        color="green"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                      >
                        <MDBIcon fab icon="facebook-f" size="sm" />
                      </MDBBtn>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                      >
                        <MDBIcon fab icon="twitter" size="sm" />
                      </MDBBtn>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                      >
                        <MDBIcon fab icon="google" size="sm" />
                      </MDBBtn>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "rgb(0, 255, 0)" }}
                      >
                        <MDBIcon fab icon="github" size="sm" />
                      </MDBBtn>
                    </div>
                  </div>
                </Form>
              </header>
            </div>
          </div>
        </div>
      </>
    );
  }
}
