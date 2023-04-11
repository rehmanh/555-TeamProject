import React, { Component } from 'react';
import { render } from "react-dom"
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Navbar from '../client/src/pages/navbar'
import { ToastContainer } from 'react-toastify';
import AnimatedRoutes from '../client/src/components/AnimatedRoutes';
import UserNav from "../client/src/pages/navBarUser"
import Footer from '../client/src/components/Footer'

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
                {location.pathname === '/userprog' || location.pathname === '/userreq' ? <UserNav /> : <Navbar />}
                <Router>
                    <AnimatedRoutes />
                    <Footer />
                </Router>
            </>
        )
    }
}
const appDiv = document.getElementById("app")
render(<App />, appDiv);