import React, { useEffect } from "react";
import "../css/TrackingStages.css";
import { useState } from "react";

export const TrackingStages = (props) => {
  const [formStepsNum, setFormStepsNum] = useState(0);

  useEffect(() => {
    if (props.Tstatus === "Stage 1") {
      setFormStepsNum(0);
    } else if (props.Tstatus === "Stage 2") {
      setFormStepsNum(1);
    }
  }, [props.Tstatus]);

  // Make sure that the formStepsNum variable does not go out of bounds
  const normalizedFormStepsNum = Math.min(Math.max(formStepsNum, 0), 3);

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
          style={{ width: `${(normalizedFormStepsNum / 3) * 100}%` }}
        ></div>

        <div
          className={`progress-step ${
            normalizedFormStepsNum === 0 && "progress-step-active" || normalizedFormStepsNum === 1 && "progress-step-active"|| normalizedFormStepsNum === 2 && "progress-step-active"|| normalizedFormStepsNum === 3 && "progress-step-active"
          }`}
          data-title="Stage 1"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 1 && "progress-step-active" || normalizedFormStepsNum === 2 && "progress-step-active"|| normalizedFormStepsNum === 3 && "progress-step-active"
          }`}
          data-title="Stage 2"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 2 && "progress-step-active" || normalizedFormStepsNum === 3 && "progress-step-active"
          }`}
          data-title="Stage 3"
        ></div>
        <div
          className={`progress-step ${
            normalizedFormStepsNum === 3 && "progress-step-active"
          }`}
          data-title="Stage 4"
        ></div>
      </div>
    </div>
  );
};
