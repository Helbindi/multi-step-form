import { useEffect, useState } from "react";
import "./index.css";
import PersonInfo from "./components/PersonInfo";
import Plans from "./components/Plans";
import AddOns from "./components/AddOns";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    planCycle: "monthly",
    planType: "arcade",
    planPrice: 9,
    online: 0,
    storage: 0,
    profile: 0,
  });
  const [current, setCurrent] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleBack(e) {
    e.preventDefault();
    if (current > 1) {
      setCurrent((prev) => {
        return prev - 1;
      });
    }
  }

  function handleNext(e) {
    e.preventDefault();
    if (current < 5) {
      setCurrent((prev) => {
        return prev + 1;
      });
    }
  }

  useEffect(() => {
    // Update prices of Add-ons due to plan cycle change
    if (formData.planCycle === "yearly") {
      const updateData = {
        online: formData.online * 10,
        storage: formData.storage * 10,
        profile: formData.profile * 10,
      };

      setFormData((prev) => {
        return { ...prev, ...updateData };
      });
    } else {
      const updateData = {
        online: formData.online / 10,
        storage: formData.storage / 10,
        profile: formData.profile / 10,
      };

      setFormData((prev) => {
        return { ...prev, ...updateData };
      });
    }
  }, [formData.planCycle]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(current);
  }, [current]);
  return (
    <div className="main-container">
      {/* Track all data using Object? */}
      {/* Display all form steps and highlight current */}
      <div className="form-nav">
        <button className={current === 1 ? "active" : ""}>1</button>
        <button className={current === 2 ? "active" : ""}>2</button>
        <button className={current === 3 ? "active" : ""}>3</button>
        <button className={current === 4 ? "active" : ""}>4</button>
      </div>

      {/* 
        Display Form - 5 different States
          Form 1: Personal Info = x3 input[text]
          Form 2: Select Plan = x3 plan selectables && pricing(monthly/yearly) toggle
          Form 3: Add-ons = x3 input[radio] && pricing(monthly/yearly) 
          Form 4: Summary = Display selections and pricing
          Submit 5: Thank You! Confirmation Page
      */}

      {/* 
        Reusables? 
          1. Form itself containing all the UI = Header => Inputs
          2. Form 1-3 all contain the same input types
          3. Button for Next step and confirm
      */}

      <form onSubmit={(e) => handleSubmit(e)}>
        {current === 1 && (
          <PersonInfo formData={formData} setFormData={setFormData} />
        )}
        {current === 2 && (
          <Plans formData={formData} setFormData={setFormData} />
        )}
        {current === 3 && (
          <AddOns formData={formData} setFormData={setFormData} />
        )}
        <div className="btn-group">
          <button className="btn back" onClick={(e) => handleBack(e)}>
            Go Back
          </button>
          {current === 4 ? (
            <button className="btn">Submit</button>
          ) : (
            <button className="btn" onClick={(e) => handleNext(e)}>
              Next Step
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
