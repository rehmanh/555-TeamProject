import TrackingInfo from "./TrackingInfo";
import React, { useState } from "react";
import { motion } from 'framer-motion'

function Userprog() {
  const [showTracking, setShowTracking] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior
    const id = event.target.elements.trackingId.value;
    setTrackingId(id); //store the tracking Id in state
    setShowTracking(true); // set state to show the Tracking component
  }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {showTracking ? (
        <TrackingInfo trackingId={trackingId} />
      ) : (
        <div className="track">
          <form style={{ margin: '50px auto', marginTop:'15rem' }} onSubmit={handleSubmit}>
            <div className="container my-auto">
              <label className="form-label">Tracking ID</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                name="trackingId"
                required
              />
              <div id="passwordHelpBlock" className="form-text">
                Your Tracking Id will be 10 characters long, contain letters and
                numbers and hypens. and must not contain spaces or emoji.
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.div>
  );
}

export default Userprog;
