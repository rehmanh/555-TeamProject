import React, { useState, useEffect } from "react";
import { TrackingStages } from "./TrackingStages";
import { motion } from 'framer-motion';
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
        //console.log(await response.json());
        //request_id: '18b005ae-ba54-442b-886d-a10d6b175376', request_status: 'STAGE-1', sales_rep_ID: 2}
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [trackingId]);

  if (error) {
    return <div>Error: {error.message}</div>;
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
      {/* <Navbar /> */}
      <h1><TrackingStages Tstatus = {"PAYMENT-DONE"}/></h1>
      {/* <h1><TrackingStages Tstatus = "Sales Rep Appointed"/></h1> */}
      {/* <h1><TrackingStages Tstatus = "Operation Manger"/></h1>
      <h1><TrackingStages Tstatus = "Contrators on the way"/></h1>
      <h1><TrackingStages Tstatus = "Completed Enjoy the Energy"/></h1> */}
    </motion.div>
  );
}

export default TrackingInfo;
