import React, { useEffect, useState, useRef } from "react";
import FormContent from "./FormContent";

function AddOns({ formData, setFormData }) {
  const [isChecked, setIsChecked] = useState({
    online: false,
    storage: false,
    profile: false,
  });
  const title = "Pick add-ons";
  const desc = "Add-ons help enhance your gaming experience.";
  const addons = {
    monthly: {
      online: 1,
      storage: 2,
      profile: 2,
    },
    yearly: {
      online: 10,
      storage: 20,
      profile: 20,
    },
  };

  const onlineCost = addons[formData.planCycle].online;
  const storageCost = addons[formData.planCycle].storage;
  const profileCost = addons[formData.planCycle].profile;
  const cycle = formData.planCycle === "monthly" ? "mo" : "yr";

  function handleClick(e) {
    let type = e.target.attributes.id.value;

    if (isChecked[type] === false) {
      e.target.parentNode.classList.add("selected-addon");
      setIsChecked((prev) => {
        prev[type] = true;
        return { ...prev };
      });

      switch (type) {
        case "online": {
          setFormData((prev) => {
            return { ...prev, online: addons[formData.planCycle][type] };
          });
          break;
        }
        case "storage": {
          setFormData((prev) => {
            return { ...prev, storage: addons[formData.planCycle][type] };
          });
          break;
        }
        case "profile": {
          setFormData((prev) => {
            return { ...prev, profile: addons[formData.planCycle][type] };
          });
          break;
        }
        default:
          console.error(`No switch cases for type: ${type}`);
      }
    } else {
      e.target.parentNode.classList.remove("selected-addon");
      setIsChecked((prev) => {
        prev[type] = false;
        return { ...prev };
      });

      switch (type) {
        case "online": {
          setFormData((prev) => {
            return { ...prev, online: 0 };
          });
          break;
        }
        case "storage": {
          setFormData((prev) => {
            return { ...prev, storage: 0 };
          });
          break;
        }
        case "profile": {
          setFormData((prev) => {
            return { ...prev, profile: 0 };
          });
          break;
        }
        default:
          console.error(`No switch cases for type: ${type}`);
      }
    }
  }

  useEffect(() => {
    setIsChecked((prev) => {
      let updateCheck = {
        online: false,
        storage: false,
        profile: false,
      };
      if (formData.online > 0) updateCheck.online = true;
      if (formData.storage > 0) updateCheck.storage = true;
      if (formData.profile > 0) updateCheck.profile = true;
      return { ...prev, ...updateCheck };
    });
  }, []);

  return (
    <FormContent title={title} desc={desc}>
      <div
        className={isChecked.online === true ? "selected-addon addon" : "addon"}
      >
        <input
          type="checkbox"
          name="online"
          id="online"
          checked={isChecked.online}
          onChange={(e) => handleClick(e)}
        />
        <div>
          <h2>Online service</h2>
          <p>Access to multiplayer games</p>
        </div>
        <p>
          +${onlineCost}/{cycle}
        </p>
      </div>
      <div
        className={
          isChecked.storage === true ? "selected-addon addon" : "addon"
        }
      >
        <input
          type="checkbox"
          name="storage"
          id="storage"
          checked={isChecked.storage}
          onChange={(e) => handleClick(e)}
        />
        <div>
          <h2>Larger storage</h2>
          <p>Extra 1TB of cloud save</p>
        </div>
        <p>
          +${storageCost}/{cycle}
        </p>
      </div>
      <div
        className={
          isChecked.profile === true ? "selected-addon addon" : "addon"
        }
      >
        <input
          type="checkbox"
          name="profile"
          id="profile"
          checked={isChecked.profile}
          onChange={(e) => handleClick(e)}
        />
        <div>
          <h2>Customizable profile</h2>
          <p>Custom theme on your profile</p>
        </div>
        <p>
          +${profileCost}/{cycle}
        </p>
      </div>
    </FormContent>
  );
}

export default AddOns;
