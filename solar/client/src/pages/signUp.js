// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import {
//     MDBInput,
//     MDBCheckbox,
//     MDBBtn,
//     MDBIcon
// }
//     from 'mdb-react-ui-kit';
// import {Form} from '../components/loginElements'
// import { motion } from 'framer-motion'

// function SignUp() {
//     return (
//         <motion.div
//         initial={{opacity: 0}}
//         animate={{opacity: 1, transition: {duration: 1}}}
//         exit={{opacity: 0 }}
//         >

//         {/* <SolarNavbar /> */}
//         <Form>
//             <header>
//             <center><h1>Sign Up</h1></center>
//             </header>
//             <label for="">Username</label>
//             <MDBInput wrapperClass='mb-4' id='username' type='username' required/>
//             <label for="">First name</label>
//             <MDBInput wrapperClass='mb-4' id='fname' type='name' required/>
//             <label for="">Last name</label>
//             <MDBInput wrapperClass='mb-4' id='lname' type='name' required/>
//             <label for="">Email</label>
//             <MDBInput wrapperClass='mb-4' id='email' type='email' required/>
//             <label for="">Password</label>
//             <MDBInput wrapperClass='mb-4' id='password' type='password' required/>
//             <label for="">Confirm password</label>
//             <MDBInput wrapperClass='mb-4' id='password2' type='password' required/>


//             <p><MDBBtn className="mb-4">Sign Up</MDBBtn></p>


//             <div className="text-center">
//                 <p>Already have an account? <a href="/login">Login</a></p>
//             </div>

//         </Form>
//         </motion.div>
//     );
// }

// export default SignUp;

import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export default function Registration() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
        >
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={9} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        Solar
                                    </h2>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account??{' '}
                                                <a href="{''}" className="text-primary fw-bold">
                                                    Sign In
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}
