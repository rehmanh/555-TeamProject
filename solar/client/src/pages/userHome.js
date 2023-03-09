import React from 'react';
// import { render } from "react-dom"
import Navbar2 from '../pages/navbar2'
import 'bootstrap/dist/css/bootstrap.css';
// import {
//   MDBCarousel,
//   MDBCarouselItem,
// } from 'mdb-react-ui-kit';

export default function UserHome() {
  return (
    <div>
        <Navbar2 />
        <h1>
            Welcome back "name of the user"!
        </h1>
    </div>
  )
}