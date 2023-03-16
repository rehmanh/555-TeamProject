import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export const TrackingStages = (props) => {
  return (
    <div className="container">
      <h2>{props.Tstatus}</h2>
      {props.Tstatus === "INITIATED" ? (
        <ProgressBar animated now={20} />
      ) : props.Tstatus === "Sales Rep Appointed" ? (
        <ProgressBar animated now={40} />
      ) : props.Tstatus === "Operation Manger" ? (
        <ProgressBar animated now={60} />
      ) : props.Tstatus === "Contrators on the way" ? (
        <ProgressBar animated now={80} />
      ) : props.Tstatus === "Completed Enjoy the Energy" ? (
        <ProgressBar animated now={100} />
      ) : (
        <ProgressBar animated now={0} />
      )}
    </div>
  );
};
