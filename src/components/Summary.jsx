import React from "react";
import FormContent from "./FormContent";

function Summary({ formData, setCurrent }) {
  const title = "Finishing Up";
  const desc = "Double-check everything looks OK before confirming.";
  const cycle = formData.planCycle === "monthly" ? "mo" : "yr";

  function handleClick(e) {
    e.preventDefault();
    setCurrent(2);
  }
  return (
    <FormContent title={title} desc={desc}>
      <div className="summary-container">
        <div className="summary-plan">
          <p>{`${formData.planType} (${formData.planCycle}) `}</p>
          <p className="summary-pricing">
            ${formData.planPrice}/{cycle}
          </p>
          <p className="change-plan" onClick={(e) => handleClick(e)}>
            Change
          </p>
        </div>
        <hr />
        {formData.addons.map((addon) => (
          <div className="summary-addon">
            <p>{addon.name}</p>
            <p className="summary-pricing">
              +${addon.price}/{cycle}
            </p>
          </div>
        ))}
      </div>
      <div className="summary-total">
        <p>{`Total (per ${
          formData.planCycle === "monthly" ? "month" : "year"
        })`}</p>
        <p className="total-price">$120/{cycle}</p>
      </div>
    </FormContent>
  );
}

export default Summary;
