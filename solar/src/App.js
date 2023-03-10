// import React from 'react'
// import Login from '../client/src/pages/login'
// import Navbar from '../client/src/pages/navbar'
// import Home from '../client/src/pages/home'
// import SignUp from '../client/src/pages/signUp'

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


// const App = () => {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path='/'>
//                     <Home />
//                 </Route>
//                 <Route path="/login">
//                     <Login />
//                 </Route>
//                 <Route path="/signup">
//                     <SignUp />
//                 </Route>
//             </Routes>
//         </Router>

//     )
// }

// export default App

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

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route exact path='/userHome' element={<UserHome />}/>
                    <Route exact path='/salesrep' element={<SalesRep />}/>
                </Route>
                <Route exact path='/' element={<HomePage />}/>
                <Route exact path='/login' element={<Login />}/>
                <Route exact path='/signup' element={<SignUp />}/>
                <Route exact path='/userReq' element={<UserRequestForm />}/>
                {/* <Route exact path='/nav' element={<Navbar />}/> */}
            </Routes>
        </Router>
        )
    }
}
const appDiv = document.getElementById("app")
render(<App/>, appDiv);