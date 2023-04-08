import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

import { BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'

export default function App() {
    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <MDBContainer className='text-center text-md-start mt-3'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                Solar
                            </h6>
                            <p>
                                We are a solar company with a mission to make the planet greener, one customer at a time.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Products Info</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Solar Panels
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Installation
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Pricing
                                </a>
                            </p>
                        </MDBCol>
                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                1 Castle Point Terrace, Hoboken, NJ 07030, US
                            </p>
                            <p>
                                info@solar.com
                            </p>
                            <p> + 01 234 567 88
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </section>
            <MDBContainer className='p-4 pb-0'>
                <section className='mb-4'>
                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsFacebook />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsTwitter />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsGoogle />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsInstagram />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsLinkedin />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                        <BsGithub />
                    </MDBBtn>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright:
                <a className='text-white' href='https://mdbootstrap.com/'>
                    Solar.org
                </a>
            </div>
        </MDBFooter>
    );
}