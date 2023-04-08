import React from 'react'
import imagePath from '../img/Solar1.jpg';
function About() {
    
    return (
<div>
    <h1>Image Display</h1>
    <div id="imageContainer">
        <img src={imagePath} alt="Image" width="300" height="200" />
    </div>
</div>
    )
}

export default About

