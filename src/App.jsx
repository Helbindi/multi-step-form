import { useEffect, useState } from "react";
import "./index.css";
import PersonInfo from "./components/PersonInfo";
import Plans from "./components/Plans";
import AddOns from "./components/AddOns";
import Summary from "./components/Summary";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    planCycle: "monthly",
    planType: "arcade",
    planPrice: 9,
    addons: [],
  });
  const [current, setCurrent] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
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

    // Check is any of the input[text] fields are empty
    let emptyKeys = [];
    const keys = Object.keys(formData);
    for (const key of keys) {
      if (formData[key] === "") {
        emptyKeys.push(key);
      }
    }

    // If any empty text fields, stay on info form and display error msg
    if (current === 1 && emptyKeys.length > 0) {
      const inputs = document.getElementsByClassName("info-input");
      for (const input of inputs) {
        for (const key of emptyKeys) {
          if (input.attributes.getNamedItem("id").value === key) {
            input.classList.add("txt-missing");
            input.previousSibling.style.display = "block";
            setTimeout(() => {
              input.classList.remove("txt-missing");
              input.previousSibling.style.display = "none";
            }, 1500);
          }
        }
      }
    } else {
      if (current < 5) {
        setCurrent((prev) => {
          return prev + 1;
        });
        // Remove keyboard focus after clicking button
        e.target.blur();
      }
    }
  }

  // Update prices of Add-ons due to plan cycle change
  useEffect(() => {
    if (formData.planCycle === "yearly") {
      setFormData((prev) => {
        const updatedAddons = prev.addons.map((item) => {
          return { ...item, price: item.price * 10 };
        });

        return { ...prev, addons: updatedAddons };
      });
    } else {
      setFormData((prev) => {
        const updatedAddons = prev.addons.map((item) => {
          return { ...item, price: item.price / 10 };
        });

        return { ...prev, addons: updatedAddons };
      });
    }
  }, [formData.planCycle]);

  // Sort all add-ons
  useEffect(() => {
    if (formData.addons.length > 1) {
      setFormData((prev) => {
        prev.addons.sort((a, b) => a.id - b.id);
        return { ...prev };
      });
    }
  }, [formData.addons]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  return (
    <div className="main-container">
      {/* Display all form steps and highlight current */}
      <div className="form-nav">
        <div className="steps">
          <button className={current === 1 ? "active" : ""}>1</button>
          <div className="step">
            <h3>Step 1</h3>
            <p>Your Info</p>
          </div>
        </div>
        <div className="steps">
          <button className={current === 2 ? "active" : ""}>2</button>
          <div className="step">
            <h3>Step 2</h3>
            <p>Select Plan</p>
          </div>
        </div>
        <div className="steps">
          <button className={current === 3 ? "active" : ""}>3</button>
          <div className="step">
            <h3>Step 3</h3>
            <p>Add-Ons</p>
          </div>
        </div>
        <div className="steps">
          <button className={current === 4 ? "active" : ""}>4</button>
          <div className="step">
            <h3>Step 4</h3>
            <p>Summary</p>
          </div>
        </div>
      </div>

      {/* Display Form */}
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
        {current === 4 && (
          <Summary
            formData={formData}
            setCurrent={setCurrent}
            isSubmitted={isSubmitted}
          />
        )}

        {/* Form Buttons */}
        {!isSubmitted && (
          <div className="btn-group">
            {current > 1 && !isSubmitted && (
              <button className="btn back" onClick={(e) => handleBack(e)}>
                Go Back
              </button>
            )}
            {current === 4 && !isSubmitted && (
              <input
                id="submit-btn"
                className="btn"
                type="submit"
                value="Confirm"
              />
            )}
            {current !== 4 && !isSubmitted && (
              <button className="btn" onClick={(e) => handleNext(e)}>
                Next Step
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
