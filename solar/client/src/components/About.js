import React from 'react'
import svgPath1  from '../img/Solar1.svg';
import '../css/about.css'

function About() {

    return (
        <div>
            <h1>Image Display</h1>
            <div id="imageContainer">
                {React.createElement('img', {
                        id:"solarimg",
                        src: svgPath1,
                        alt: 'Image',
                    })}


            </div>
        </div>
    )
}

export default About
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
