import React from "react";

const Userprog = () => {
  return (
    <div>
      <div className="container my-auto">
        <label className="form-label">Tracking ID</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="passwordHelpBlock"
        />
        <div id="passwordHelpBlock" className="form-text">
          Your Tracking Id will be 10 characters long, contain letters and
          numbers and hypens. and must not contain spaces or emoji.
        </div>
      </div>
    </div>
  );
};

export default Userprog;
