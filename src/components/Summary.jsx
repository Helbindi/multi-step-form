import React from "react";
import FormContent from "./FormContent";

function Summary({ formData, setCurrent }) {
  const title = "Finishing Up";
  const desc = "Double-check everything looks OK before confirming.";

  function handleClick(e) {
    e.preventDefault();
    setCurrent(2);
  }
  return (
    <FormContent title={title} desc={desc}>
      <div className="summary">
        <div className="summary-plan">
          <p>{`${formData.planType} (${formData.planCycle}) `}</p>
          <p>
            ${formData.planPrice}/
            {formData.planCycle === "monthly" ? "mo" : "yr"}
          </p>
          <p className="change-plan" onClick={(e) => handleClick(e)}>
            Change
          </p>
        </div>
      </div>
    </FormContent>
  );
}

export default Summary;
