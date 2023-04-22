import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import About from '../components/About';
import Carousel from '../components/Carousel';

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
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h1>Hello, World!</h1>
          </motion.div>
        </div>
        {/* <Carousel /> */}
        <About />
      </motion.div>
    </div>
  );
}