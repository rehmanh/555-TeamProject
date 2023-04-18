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


const Luis = () => {
    return(
        <MDBCard style={{ maxWidth: "18rem" }}>
                    <MDBCardImage
                        src={LuisImg}
                        position="top"
                    />
                    <MDBCardBody>
                        <MDBCardTitle>Luis</MDBCardTitle>
                        <MDBCardText>
                            Graduate Student at Stevens Institute of Tecnology pursing a Masters in Software Engineering
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
    )
}

const Habib = () => {
    return(
        <h1>Habib</h1>
    )
}

const Ravi = () => {
    return(
        <h1>Ravi</h1>
    )
}

const Harrison = () => {
    return(
        <h1>Harrison</h1>
    )
}

const Kevin = () => {
    return(
        <h1>Kevin</h1>
    )
}

const Vamsi = () => {
    return(
        <h1>Vamsi</h1>
    )
}

const Jayanth = () => {
    return(
        <h1>Jayanth</h1>
    )
}

export default function AboutUs(){
    return(
        <div>
            <h1>THE TEAM</h1>
            <MDBContainer>
            <br />
                <center>
                    <MDBRow className="mt-4">
                        <MDBCol sm='3'>
                            <Luis />
                        </MDBCol>
                        <MDBCol sm='3'>
                            <Luis />
                        </MDBCol>
                        <MDBCol sm='3'>
                            <Luis />
                        </MDBCol>
                        <MDBCol sm='3'>
                            <Luis />
                        </MDBCol>
                    </MDBRow>
                </center>
                <br />
                <center>
                    <MDBRow className="mt-4">
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
        </div>
    )
}