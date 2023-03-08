import React from "react";
import FormContent from "./FormContent";
import Confirmation from "./Confirmation";

function Summary({ formData, setCurrent, isSubmitted }) {
  const title = "Finishing Up";
  const desc = "Double-check everything looks OK before confirming.";
  const cycle = formData.planCycle === "monthly" ? "mo" : "yr";
  const total = calcTotal();

  function calcTotal() {
    // Grab all Object values
    const values = Object.values(formData);
    let total = 0;
    for (let value of values) {
      // Check is Object value is a Number: dataForm.planPrice
      if (Number.isInteger(value)) {
        total += value;
      }

      // Check is Object value is Array: dataForm.addons[]
      if (Array.isArray(value)) {
        value.forEach((item) => {
          total += item.price;
        });
      }
    }

    return total;
  }

  function handleClick(e) {
    e.preventDefault();
    setCurrent(2);
  }
  return (
    <>
      {isSubmitted === false ? (
        <FormContent title={title} desc={desc}>
          <div className="summary-container">
            <div className="summary-plan">
              <p className="plan-title">{`${formData.planType} (${formData.planCycle}) `}</p>
              <p className="summary-pricing">
                ${formData.planPrice}/{cycle}
              </p>
              <p className="change-plan" onClick={(e) => handleClick(e)}>
                Change
              </p>
            </div>
            <hr />
            {formData.addons.map((addon) => (
              <div className="summary-addon" key={addon.id}>
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
            <p className="total-price">
              ${total}/{cycle}
            </p>
          </div>
        </FormContent>
      ) : (
        <Confirmation />
      )}
    </>
  );
}

export default Summary;
