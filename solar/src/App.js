import React, { Component } from 'react';
import { render } from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoutes from "../src/PrivateRoute"
import HomePage from '../client/src/pages/home';
import SignUp from '../client/src/pages/signUp';
import Login from '../client/src/pages/login';
import SalesRep from '../client/src/pages/salesRep';
import UserHome from '../client/src/pages/userHome';
// import { Navbar } from 'react-bootstrap';
import Navbar from '../client/src/pages/navbar'
import UserRequestForm from '../client/src/pages/UserRequestForm';
import Userprog from '../client/src/pages/Userprog';
import { Operation } from '../client/src/pages/Operation';
import { ToastContainer, toast } from 'react-toastify';
import OpManager from '../client/src/pages/OpManager';
import AnimatedRoutes from '../client/src/components/AnimatedRoutes';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    closeOnClick
                />
                <Router>
                    <Navbar />
                    <AnimatedRoutes />
                </Router>
            </>
        )
    }
}
const appDiv = document.getElementById("app")
render(<App />, appDiv);