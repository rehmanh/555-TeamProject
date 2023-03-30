import React from "react";
import "./TrackingStages.css";
import { useState } from "react";

export const TrackingStages = (props) => {
  // return (
  //   <>
  //     <div>{props.Tstatus}</div>
  //   </>
  // );
  const [formStepsNum, setFormStepsNum] = useState(0);

  const handleNextClick = () => {
    setFormStepsNum(formStepsNum + 1);
  };

  const handlePrevClick = () => {
    setFormStepsNum(formStepsNum - 1);
  };

  const updateProgressbar = () => {
    const progressSteps = document.querySelectorAll(".progress-step");
    const progressActive = document.querySelectorAll(".progress-step-active");

    const progress = document.getElementById("progress");
    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";

    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
  };

  const updateFormSteps = () => {
    const formSteps = document.querySelectorAll(".form-step");

    formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });

    formSteps[formStepsNum].classList.add("form-step-active");

    updateProgressbar();
  };

  return (
    <div className="form">
      <h1 className="text-center">Progress</h1>
      <div className="progressbar">
        <div className="progress" id="progress"></div>

        <div
          className={`progress-step ${
            formStepsNum === 0 && "progress-step-active"
          }`}
          data-title="Stage 1"
        ></div>
        <div
          className={`progress-step ${
            formStepsNum === 1 && "progress-step-active"
          }`}
          data-title="Stage 2"
        ></div>
        <div
          className={`progress-step ${
            formStepsNum === 2 && "progress-step-active"
          }`}
          data-title="Stage 3"
        ></div>
        <div
          className={`progress-step ${
            formStepsNum === 3 && "progress-step-active"
          }`}
          data-title="Stage 4"
        ></div>
      </div>

      <div className={`form-step ${formStepsNum === 0 && "form-step-active"}`}>
        <div className="">
          <button
            className="btn btn-next width-50 ml-auto"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>

      <div className={`form-step ${formStepsNum === 1 && "form-step-active"}`}>
        <div className="btns-group">
          <button className="btn btn-prev" onClick={handlePrevClick}>
            Previous
          </button>
          <button className="btn btn-next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>

      <div className={`form-step ${formStepsNum === 2 && "form-step-active"}`}>
        <div className="btns-group">
          <button className="btn btn-prev" onClick={handlePrevClick}>
            Previous
          </button>
          <button className="btn btn-next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>

      <div className={`form-step ${formStepsNum === 3 && "form-step-active"}`}>
        <div className="btns-group">
          <button className="btn btn-prev" onClick={handlePrevClick}>
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};
