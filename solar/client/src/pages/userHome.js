import React from 'react';
import Navbar from '../pages/navbar'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";
import { getUserFullName } from '../utils/utils';

export default function UserHome() {
  const [fullUserName, setFullUserName] = useState('');

  useEffect(() => {
    setFullUserName(getUserFullName)
  }, []);
  
  return (
    <div>
        <Navbar />
        <h1>
            Welcome back 
        </h1>
    </div>
  )
}