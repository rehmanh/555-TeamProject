import React from 'react'
import svgPath1 from '../img/Solar1.svg';
import svgPath2 from '../img/Solar2.svg';
import svgPath3 from '../img/Solar3.svg';
import svgPath4 from '../img/Solar4.svg';
import '../css/about.css'

function About() {

    return (
        <div id='about'>
            <div className='aboutContainer row'>
                <div className="col-lg-4 col-xm-12" id="imageContainer">
                    {React.createElement('img', {
                        id: "solarimg",
                        src: svgPath1,
                        alt: 'Image',
                    })}
                    <h1 className='about-heading'>
                        Request
                    </h1>
                    <p className='about-text'>
                    It starts from a simple request.
                    </p>
                </div>
                
                
                <div className="col-lg-4 col-xm-12" id="imageContainer">
                    {React.createElement('img', {
                        id: "solarimg",
                        src: svgPath3,
                        alt: 'Image',
                    })}
                    <h1 className='about-heading'>
                        Installation
                    </h1>
                    <p className='about-text'>
                    Our workers will fulfill any request!
                    </p>
                </div>
                
                
                <div className="col-lg-4 col-xm-12" id="imageContainer">
                    {React.createElement('img', {
                        id: "solarimg",
                        src: svgPath2,
                        alt: 'Image',
                    })}
                    <h1 className='about-heading'>
                        Go Green
                    </h1>
                    <p className='about-text'>
                    It is as easy as that!
                    </p>
                </div>
                
                
            </div>
        </div>
    )
}

export default About

{/* <div className='col-lg-3 col-xm-12'>
                    <h1 className='about-heading'>
                        Our mission
                    </h1>
                    <p className='about-text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div> */}
// import React from 'react';
// import { ReactComponent as Solar1 } from '../img/Solar1.svg';

// function About() {
//     return (
//         <div>
//             <h1>Image Display</h1>
//             <div id="imageContainer">
//                 {/* Render the SVG component */}
//                 <Solar1 id="solarImage" className="solarImageClass" width="300" height="200" />
//             </div>
//         </div>
//     );
// }

// export default About;
