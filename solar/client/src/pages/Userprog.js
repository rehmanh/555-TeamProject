import TrackingInfo from "./TrackingInfo";
import Navbar from "./navbar.js";
import React, { useState } from "react";

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
    <div>
      {showTracking ? (
        <TrackingInfo trackingId={trackingId} />
      ) : (
        <>
          <Navbar />
          <form onSubmit={handleSubmit}>
            <div className="container my-auto">
              <label className="form-label">Tracking ID</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                name="trackingId"
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
        </>
      )}
    </div>
  );
}

export default Userprog;
