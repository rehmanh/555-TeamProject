import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import About from '../components/About';
import Carousel from '../components/Carousel';
import ParticleBackground from '../components/particleBackground';

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
        <div style={{ position: 'relative' }}>
          
          <Carousel />
          <motion.div
            className='modiv'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className='homepageWelcome'>
              <h1 className="welcome">Welcome to Solar</h1>
            </div>
          </motion.div>
        </div>
        <About />
      </motion.div>
    </div>
  );
}