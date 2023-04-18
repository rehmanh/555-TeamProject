import React from 'react';
// import { render } from "react-dom"
import 'bootstrap/dist/css/bootstrap.css';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import About from '../components/About';
import port1 from '../img/portfolio-1.jpg'
import port2 from '../img/portfolio-2.jpg'
import port3 from '../img/portfolio-3.jpg'
import port4 from '../img/portfolio-4.jpg'
export default function HomePage() {

  const toastOptions = {
    onClose: props => sessionStorage.clear()
  };

  const validateAndDisplayError = () => {
    let msg = sessionStorage.getItem('error')
    if (msg !== null && msg.length !== 0 && msg !== undefined) {
      toast.error(msg, toastOptions)
    }
  };

  return (
    <div>
      {validateAndDisplayError()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <SolarNavbar /> */}
        <MDBCarousel showControls showIndicators style={{ height:'70rem' }}>
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src= {port1}
            alt=''
            style={{ height:'70rem' }}>
            <h5>First slide</h5>
            <p>picture and description</p>
          </MDBCarouselItem>

          <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src= {port2}
            alt=''
            style={{ height:'70rem' }}>
            <h5>Second slide</h5>
            <p>picture and description</p>
          </MDBCarouselItem>

          <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src= {port3}
            alt=""
            style={{ height:'70rem' }}>
            <h5>Third slide</h5>
            <p>picture and descirption</p>
          </MDBCarouselItem>

          <MDBCarouselItem
            className='w-100 d-block'
            itemId={4}
            src= {port4}
            alt=""
            style={{ height:'70rem' }}>
            <h5>Fourth slide</h5>
            <p>picture and descirption</p>
          </MDBCarouselItem>

        </MDBCarousel>
        <About />
      </motion.div>
    </div>
  );
}