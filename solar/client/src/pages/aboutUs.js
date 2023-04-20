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
import KevinImg from '../img/Kevin.jpg'
import HabibImg from '../img/Habib.jpeg'
import '../css/aboutUs.css'

const mystyle = {
    color: "black",
    padding: "10px",
    fontFamily: "monospace",
    fontSize: "80px"
  };

const Luis = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={LuisImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Luis Ng Tang</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                            Graduate Student at Stevens Institute of Technology pursing a Masters in Software Engineering. 
                            Contributed with the frontend of this project.
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Ravi = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={RaviImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Ravi Kiran</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                            Ravi Kiran contributed to working on the backend of our project deployed on AWS. 
                            He is an Electrical Engineering graduate from IIT Bombay, pursuing a Master's in Software Engineering.
                            He is an AWS-certified cloud solutions architect with experience in Python and Javascript. 
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Kevin = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={KevinImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Yu-Cheng</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                            Hi I'm Yu-Cheng. I helped with the front end of the project.
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Habib = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={HabibImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Habib</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                        I am a M.S. Software Engineering student at Stevens Institute of Technology. 
                        Prior to joining Stevens, I worked in industry as a full-stack software engineer for a GPS tracking and telematics company. 
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

export default function AboutUs(){
    return(
        <div>
            <h1 style={mystyle}>Meet the Team!</h1>
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
                            <Kevin />
                        </MDBCol>
                        <MDBCol sm="3">
                            <Habib />
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