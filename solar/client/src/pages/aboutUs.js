import React from 'react';
// import { render } from "react-dom"
import {
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
import VamsiImg from '../img/Vamsi.jpg'
import HarrisonImg from '../img/Harrison.jpg'
import JayanthImg from '../img/Jayanth.JPG'
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

const Vamsi = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={VamsiImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Vamsi</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                        Hey! I'm an M.S. student in Computer Science at Stevens Institute of Technology. 
                        I helped out with the frontend of this cool project. 
                        Fun fact - I used to be a civil engineer before I decided to switch things up!
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}
const Jayanth = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={JayanthImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Jayanth Dannana</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                        I helped out with the frontend part of the project. I am a Chemical Engineer Graduate from IIT Ropar, decided to follow my dream of becoming a Software Developer.
                        I'm pursing Master's in Computer Science at Stevens Institute of Technology. 
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Harrison = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem"}} className='Usercard mb-3 border-dark'>
                    <MDBCardImage
                        src={HarrisonImg}
                        position="top"
                        className="image"
                    />
                    <MDBCardBody className='d-flex flex-column'>
                        <MDBCardTitle className='fontTitle'>Harrison</MDBCardTitle>
                        <MDBCardText className='fontBody'>
                            Harrison is a M.S. Computer Science student at Stevens Institute of Technology. 
                            His background is interdisciplinary with Biomedical Engineering and Machine Learning, and he is also interested in AI with software engineering. 
                            He has two dogs, whose name is Haru and Aki, they are very cute and always accompany their dad when dad was working.
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
                            <Vamsi />
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Harrison />
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Jayanth />
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