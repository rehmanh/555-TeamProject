import React, { useState, useEffect } from "react";
import { TrackingStages } from "./TrackingStages";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TrackingInfo({ trackingId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl =
        "https://7wdf6k3w65.execute-api.us-east-1.amazonaws.com/UAT";
      const requestData = { request_id: trackingId };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        if (data && data.request_status) {
          setData(data);
        } else {
          toast.error('Enter valid tracking ID');
        }
      } catch (error) {
        setError(error);
        toast.error('Error fetching data');
      }
    }
    fetchData();
  }, [trackingId]);

  if (error) {
    return (
      <div>
        <div>Error: {error.message}</div>
        <ToastContainer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    );
  }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {data.request_status && <h1><TrackingStages Tstatus = {data.request_status}/></h1>}
      <ToastContainer />
    </motion.div>
  );
}

export default TrackingInfo;
