import React, { useEffect, useState } from "react";
import FormContent from "./FormContent";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";
import Switch from "@mui/material/Switch";

function Plans({ formData, setFormData }) {
  const [isYearly, setIsYearly] = useState(
    formData.planCycle === "monthly" ? false : true
  );

  const title = "Select your plan";
  const desc = "You have the option of monthly or yearly billing";
  const plans = {
    monthly: {
      arcade: 9,
      advanced: 12,
      pro: 15,
    },
    yearly: {
      arcade: 90,
      advanced: 120,
      pro: 150,
    },
  };

  // Change cost of plan based on cycle plan
  const arcadeCost = isYearly ? plans.yearly.arcade : plans.monthly.arcade;
  const advancedCost = isYearly
    ? plans.yearly.advanced
    : plans.monthly.advanced;
  const proCost = isYearly ? plans.yearly.pro : plans.monthly.pro;

  // Handle when user clicks on a plan
  function handleSelect(e) {
    e.preventDefault();
    const updatePrice = Number(
      e.currentTarget.attributes.getNamedItem("cost").value
    );
    const selectedPlan = e.currentTarget.attributes.getNamedItem("plan").value;

    if (formData.planType.toLowerCase() !== selectedPlan.toLowerCase()) {
      // Change only if different plan is selected
      setFormData((prev) => {
        return { ...prev, planPrice: updatePrice, planType: selectedPlan };
      });

      // Apply and remove styling for changing selected plan
      e.currentTarget.classList.add("selected-plan");
      const allPlans = document.getElementsByClassName("plan");
      for (const plan of allPlans) {
        if (plan !== e.currentTarget) {
          plan.classList.remove("selected-plan");
        }
      }
    }
  }

  // Toggle between monthly and yearly plan
  function toggleCycle(e) {
    if (e.target.checked === true) {
      setIsYearly(true);

      // Update plan prices based on cycle change
      setFormData((prev) => {
        const updatePrice = plans.yearly[prev.planType];
        return { ...prev, planCycle: "yearly", planPrice: updatePrice };
      });
    } else {
      setIsYearly(false);

      // Update plan prices based on cycle change
      setFormData((prev) => {
        const updatePrice = plans.monthly[prev.planType];
        return { ...prev, planCycle: "monthly", planPrice: updatePrice };
      });
    }
  }

  useEffect(() => {
    const getPlans = document.getElementsByClassName("plan");
    for (const plan of getPlans) {
      if (plan.attributes.getNamedItem("plan").value == formData.planType) {
        plan.classList.add("selected-plan");
      }
    }
  }, []);

  return (
    <FormContent title={title} desc={desc}>
      <div className="select-plans">
        {/* Arcade Plan */}
        <article
          className="plan"
          cost={arcadeCost}
          plan="arcade"
          onClickCapture={(e) => handleSelect(e)}
        >
          <img src={arcade} alt="arcade-plan" />
          <div>
            <h2>Arcade</h2>
            <p>
              ${arcadeCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p>2 months free</p>}
          </div>
        </article>

        {/* Advanced Plan */}
        <article
          className="plan"
          cost={advancedCost}
          plan="advanced"
          onClickCapture={(e) => handleSelect(e)}
        >
          <img src={advanced} alt="advanced-plan" />
          <div>
            <h2>Advanced</h2>
            <p>
              ${advancedCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p className="yearly-plan">2 months free</p>}
          </div>
        </article>

        {/* Pro Plan */}
        <article
          className="plan"
          cost={proCost}
          plan="pro"
          onClickCapture={(e) => handleSelect(e)}
        >
          <img src={pro} alt="pro-plan" />
          <div>
            <h2>Pro</h2>
            <p>
              ${proCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p className="yearly-plan">2 months free</p>}
          </div>
        </article>
      </div>
      {/* Monthly or Yearly Plan */}
      <div className="annual-cycle">
        <p className={isYearly ? "" : "selected-cycle"}>Monthly</p>
        <Switch
          className="switch"
          onChange={(e) => toggleCycle(e)}
          color="default"
          checked={formData.planCycle === "monthly" ? false : true}
        />
        <p className={isYearly ? "selected-cycle" : ""}>Yearly</p>
      </div>
    </FormContent>
  );
}

export default Plans;
