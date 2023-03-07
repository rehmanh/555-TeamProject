import React from 'react';
// import { render } from "react-dom"
import Navbar from '../pages/navbar'
import 'bootstrap/dist/css/bootstrap.css';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function HomePage() {
  return (
  <div>
    <Navbar />
    <MDBCarousel showControls showIndicators>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src="http://www.newdawnenergy.co.uk/assets/img/portfolio/portfolio-2.jpg"
        alt=''>
        <h5>First slide</h5>
        <p>picture and description</p>
        </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src="http://www.newdawnenergy.co.uk/assets/img/portfolio/portfolio-5.jpg"
        alt=''>
        <h5>Second slide</h5>
        <p>picture and description</p>
        </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src="https://cdn.shortpixel.ai/spai/q_glossy+w_960+h_1011+to_auto+ret_img/https://onehome.org.uk/wp-content/uploads/2018/04/wedmore-green-solar-panels.jpg"
        alt="">
        <h5>Third slide</h5>
        <p>picture and descirption</p>
        </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={4}
        src="https://www.responceenergy.com/images/slider-2.jpg"
        alt="">
        <h5>Fourth slide</h5>
        <p>picture and descirption</p>
      </MDBCarouselItem>

      </MDBCarousel>
    </div>
  );
}