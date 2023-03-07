import { useState } from "react";
import "./index.css";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

function App() {
  const [data, setData] = useState({});

  return (
    <div className="App">
      {/* Track all data using Object? */}
      {/* Display all form steps and highlight current */}
      <div className="form-nav">
        <button className="active">1</button>
        <button className="">2</button>
        <button className="">3</button>
        <button className="">4</button>
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

      <Step1 />
      <Step2 />
    </div>
  );
}

export default App;
