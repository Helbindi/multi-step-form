import React, { useEffect, useState } from "react";
import FormContent from "./FormContent";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";
import Switch from "@mui/material/Switch";

function Step2() {
  const [plan, setPlan] = useState({
    cycle: "monthly",
    type: "arcade",
    price: 9,
  });
  const [isYearly, setIsYearly] = useState(false);

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

  const arcadeCost = isYearly ? plans.yearly.arcade : plans.monthly.arcade;
  const advancedCost = isYearly
    ? plans.yearly.advanced
    : plans.monthly.advanced;
  const proCost = isYearly ? plans.yearly.pro : plans.monthly.pro;

  function togglePlan(e) {
    if (e.target.checked === true) {
      setIsYearly(true);
      setPlan((prev) => {
        const updatePrice = plans.yearly[prev.type];
        return { ...prev, cycle: "yearly", price: updatePrice };
      });
    } else {
      setIsYearly(false);
      setPlan((prev) => {
        const updatePrice = plans.monthly[prev.type];
        return { ...prev, cycle: "monthly", price: updatePrice };
      });
    }
  }

  function handleSelect(e) {
    e.preventDefault();
    const updatePrice = Number(e.target.attributes.cost.value);
    const selectedPlan = e.target.attributes.plan.value;
    setPlan((prev) => {
      return { ...prev, price: updatePrice, type: selectedPlan };
    });

    e.target.classList.add("selected-plan");
    const parent = document.getElementsByClassName("select-plans");
    parent[0].childNodes.forEach((child) => {
      if (child !== e.target) {
        child.classList.remove("selected-plan");
      }
    });
  }

  useEffect(() => {
    console.log(plan);
  }, [plan]);

  return (
    <FormContent title={title} desc={desc}>
      <div className="select-plans">
        {/* Arcade Plan */}
        <div
          className="plan selected-plan"
          cost={arcadeCost}
          plan="arcade"
          onClick={(e) => handleSelect(e)}
        >
          <img src={arcade} alt="arcade-plan" />
          <article>
            <h2>Arcade</h2>
            <p>
              ${arcadeCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p>2 months free</p>}
          </article>
        </div>

        {/* Advanced Plan */}
        <div
          className="plan"
          cost={advancedCost}
          plan="advanced"
          onClick={(e) => handleSelect(e)}
        >
          <img src={advanced} alt="advanced-plan" />
          <article>
            <h2>Advanced</h2>
            <p>
              ${advancedCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p>2 months free</p>}
          </article>
        </div>

        {/* Pro Plan */}
        <div
          className="plan"
          cost={proCost}
          plan="pro"
          onClick={(e) => handleSelect(e)}
        >
          <img src={pro} alt="pro-plan" />
          <article>
            <h2>Pro</h2>
            <p>
              ${proCost}/{isYearly ? "yr" : "mo"}
            </p>
            {isYearly && <p>2 months free</p>}
          </article>
        </div>

        {/* Monthly or Yearly Plan */}
        <div className="annual-cycle">
          <p className={isYearly ? "" : "selected-cycle"}>Monthly</p>
          <Switch
            className="switch"
            onChange={(e) => togglePlan(e)}
            color="default"
          />
          <p className={isYearly ? "selected-cycle" : ""}>Yearly</p>
        </div>
      </div>
    </FormContent>
  );
}

export default Step2;
