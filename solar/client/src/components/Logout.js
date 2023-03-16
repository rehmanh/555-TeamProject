import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Logout extends Component {

    logout = () => {
        if (localStorage && localStorage.getItem("token")) {
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.withCredentials = true;

            let token = "Token " + localStorage.getItem("token");
            axios.post("/logout/", null, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response && response.status === 204) { // success 
                    const toastOptions = {
                        onClose: props => window.location.href = "/"
                    };
                    localStorage.clear();
                    toast.success('Logout Successful', toastOptions);
                }
            })
            .catch((response) => {
                toast.error('There was an issue with logging out your User. Please try again.')
            });
    
        } else {
            toast.error('There was an issue with your User session. Please try again later.')
        }
    }

    render() {
        return (
            <Nav.Link onClick={this.logout}>
                Log out
            </Nav.Link>
        )
    }
}