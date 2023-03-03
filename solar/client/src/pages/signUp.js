// import React, { Component } from 'react';
// // // import { render } from "react-dom"

// export default class SignUp extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <h1>Sign Up!</h1>
//     }
// }

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../pages/navbar'
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import {Form} from '../components/loginElements'


function SignUp() {
    return (
        <div>

        <Navbar />
        <Form>
            <header>
            <center><h1>Sign Up</h1></center>
            </header>
            <label for="">Username</label>
            <MDBInput wrapperClass='mb-4' id='username' type='username' required/>
            <label for="">First name</label>
            <MDBInput wrapperClass='mb-4' id='fname' type='name' required/>
            <label for="">Last name</label>
            <MDBInput wrapperClass='mb-4' id='lname' type='name' required/>
            <label for="">Email</label>
            <MDBInput wrapperClass='mb-4' id='email' type='email' required/>
            <label for="">Password</label>
            <MDBInput wrapperClass='mb-4' id='password' type='password' required/>
            <label for="">Confirm password</label>
            <MDBInput wrapperClass='mb-4' id='password2' type='password' required/>


            <p><MDBBtn className="mb-4">Sign Up</MDBBtn></p>
            

            <div className="text-center">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>

        </Form>
        </div>
    );
}

export default SignUp;