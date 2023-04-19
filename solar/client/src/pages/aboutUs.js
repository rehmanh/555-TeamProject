import React from 'react';
// import { render } from "react-dom"
import {
    MDBFooter,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCardImage,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import LuisImg from '../img/Luis.jpg'
import RaviImg from '../img/Ravi.png'
import '../css/style.css'


const Luis = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='card mb-3 border-dark'>
                    <MDBCardImage
                        src={LuisImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle>Luis</MDBCardTitle>
                        <MDBCardText>
                            Graduate Student at Stevens Institute of Tecnology pursing a Masters in Software Engineering. 
                            Contributed with the frontend of this project.
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Ravi = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='card mb-3 border-dark'>
                    <MDBCardImage
                        src={RaviImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle>Ravi Kiran</MDBCardTitle>
                        <MDBCardText>
                           Description
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

export default function AboutUs(){
    return(
        <div>
            <h1>MEET THE TEAM!</h1>
            <br />
            <MDBContainer>
            <br />
                <center>
                    <MDBRow className="mb-3 d-flex align-items-stretch">
                        <MDBCol sm="3">
                            <Luis />
                        </MDBCol>
                        <MDBCol sm="3">
                            <Ravi />
                        </MDBCol>
                        <MDBCol sm="3">
                            <Luis />
                        </MDBCol>
                        <MDBCol sm="3">
                            <Luis />
                        </MDBCol>
                    </MDBRow>
                </center>
                <br />
                <center>
                    <MDBRow className="mt-4 d-flex align-items-stretch">
                        <MDBCol sm='4'>
                            <Luis />
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Luis />
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Luis />
                        </MDBCol>
                    </MDBRow>
                </center>
                <br />
            </MDBContainer>
            <br/>
            <br/>
        </div>
    )
}