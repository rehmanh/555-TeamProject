import React, { useEffect } from "react";
import "../css/TrackingStages.css";
import { useState } from "react";

export const TrackingStages = (props) => {
  const [formStepsNum, setFormStepsNum] = useState(0);

  useEffect(() => {
    if (props.Tstatus === "INITIATED") {
      setFormStepsNum(0);
    } else if (props.Tstatus === "SALE-OPS") {
      setFormStepsNum(1);
    } else if (props.Tstatus === "OPS-CONST") {
      setFormStepsNum(2);
    } else if (props.Tstatus === "CONST-SITE") {
      setFormStepsNum(3);
    } else if (props.Tstatus === "SITE-CONST") {
      setFormStepsNum(4);
    } else if (props.Tstatus === "EST-DONE") {
      setFormStepsNum(5);
    } else if (props.Tstatus === "PAYMENT-DONE") {
      setFormStepsNum(6);
    } else if (props.Tstatus === "CUST-SCHEDULED") {
      setFormStepsNum(7);
    } else if (props.Tstatus === "DONE") {
      setFormStepsNum(8);
    }
  }, [props.Tstatus]);

  // Make sure that the formStepsNum variable does not go out of bounds
  const normalizedFormStepsNum = Math.min(Math.max(formStepsNum, 0), 8);

  return (
    <div className="form">
      <h1 className="text-center k">Order Progress</h1>
      {/* <div class="details">
        <div class="order">
          <h1>
            Order <span>x53423765r7</span>
          </h1>
        </div>
        <div class="date">
          <p>Expected Completion 21/12/23</p>
        </div>
      </div> */}
      <div className="progressbar">
        <div
          className="progress"
          id="progress"
          style={{ width: `${(normalizedFormStepsNum / 8) * 100}%` }}
        ></div>

        <div
          className={`progress-step ${
            normalizedFormStepsNum === 0 && "progress-step-active" || normalizedFormStepsNum === 1 && "progress-step-active"|| normalizedFormStepsNum === 2 && "progress-step-active"|| normalizedFormStepsNum === 3 && "progress-step-active"|| normalizedFormStepsNum === 4 && "progress-step-active"|| normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 1"
        > <p>{props.Tstatus === "INITIATED" ? "Order initiated" : ""}</p></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 1 && "progress-step-active" || normalizedFormStepsNum === 2 && "progress-step-active"|| normalizedFormStepsNum === 3 && "progress-step-active"|| normalizedFormStepsNum === 4 && "progress-step-active"|| normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 2"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 2 && "progress-step-active" || normalizedFormStepsNum === 3 && "progress-step-active"|| normalizedFormStepsNum === 4 && "progress-step-active"|| normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 3"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 3 && "progress-step-active"|| normalizedFormStepsNum === 4 && "progress-step-active"|| normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 4"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 4 && "progress-step-active"|| normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 5"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 5 && "progress-step-active"|| normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 6"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 6 && "progress-step-active"|| normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 7"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 7 && "progress-step-active"|| normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 8"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 8 && "progress-step-active"
          }`}
          data-title="Stage 9"
        ></div>
      </div>
      <div>
      <h1>Status: 
      <p>{formStepsNum === 0 ? "New request" : ""}</p>
      <p>{props.Tstatus === "SALE-OPS" ? "Sales rep assigned" : ""}</p>
      <p>{props.Tstatus === "OPS-CONST" ? "Construction manager assigned" : ""}</p>
      <p>{props.Tstatus === "CONST-SITE" ? "Site surveyor assigned" : ""}</p>
      <p>{props.Tstatus === "SITE-CONST" ? "Site survey finished" : ""}</p>
      <p>{props.Tstatus === "EST-DONE" ? "Estimation finished" : ""}</p>
      <p>{props.Tstatus === "PAYMENT-DONE" ? "Payment done" : ""}</p>
      <p>{props.Tstatus === "CUST-SCHEDULED" ? "Project deployment scheduled" : ""}</p>
      <p>{props.Tstatus === "DONE" ? "Project deployed" : ""}</p>
      </h1>
    </div>
    </div>
  );
};
