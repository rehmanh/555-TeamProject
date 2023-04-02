import React, { Component } from 'react';
import { render } from "react-dom"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from "../src/PrivateRoute"
import HomePage from '../client/src/pages/home';
import SignUp from '../client/src/pages/signUp';
import Login from '../client/src/pages/login';
import SalesRep from '../client/src/pages/salesRep';
import UserHome from '../client/src/pages/userHome';
// import { Navbar } from 'react-bootstrap';
// import Navbar from '../client/src/pages/navbar'
import UserRequestForm from '../client/src/pages/UserRequestForm';
import Userprog from '../client/src/pages/Userprog';
import { Operation } from '../client/src/pages/Operation';
import {ToastContainer, toast} from 'react-toastify'
import OpManager from '../client/src/pages/OpManager'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            closeOnClick
            />
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route exact path='/userHome' element={<UserHome />}/>
                    <Route exact path='/salesrep' element={<SalesRep />}/>
                    <Route exact path='/opManager' element={<OpManager />}/>
                </Route>
                <Route exact path='/' element={<HomePage errorMessage={''}/>}/>
                <Route exact path='/login' element={<Login />}/>
                <Route exact path='/signup' element={<SignUp />}/>
                <Route exact path='/salesrep' element={<SalesRep />}/>
                <Route exact path='/userreq' element={<UserRequestForm />}/>
                <Route exact path= '/userprog' element={<Userprog />}/>
                <Route exact path= '/oper' element={<Operation />}/>
                
                
                {/* <Route exact path='/nav' element={<Navbar />}/> */}
            </Routes>
        </Router>
        </>
        )
    }
}
const appDiv = document.getElementById("app")
render(<App/>, appDiv);