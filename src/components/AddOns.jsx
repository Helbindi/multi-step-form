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
    // e.target vs e.currentTarget
    let type = e.currentTarget.attributes.getNamedItem("addon").value;

    if (isChecked[type] === false) {
      e.currentTarget.classList.add("selected-addon");
      setIsChecked((prev) => {
        prev[type] = true;
        return { ...prev };
      });

      let newAddon = {
        name: "",
        type: type,
        price: addons[formData.planCycle][type],
      };

      switch (type) {
        case "online": {
          newAddon.name = "Online Service";
          newAddon.id = 1;
          setFormData((prev) => {
            return { ...prev, addons: [...prev.addons, newAddon] };
          });
          break;
        }
        case "storage": {
          newAddon.name = "Large Storage";
          newAddon.id = 2;
          setFormData((prev) => {
            return { ...prev, addons: [...prev.addons, newAddon] };
          });
          break;
        }
        case "profile": {
          newAddon.name = "Customizable Profile";
          newAddon.id = 3;
          setFormData((prev) => {
            return { ...prev, addons: [...prev.addons, newAddon] };
          });
          break;
        }
        default:
          console.error(`No switch cases for type: ${type}`);
      }
    } else {
      e.currentTarget.classList.remove("selected-addon");
      setIsChecked((prev) => {
        prev[type] = false;
        return { ...prev };
      });

      setFormData((prev) => {
        const updateAddons = prev.addons.filter((item) => {
          return item.type !== type;
        });
        return { ...prev, addons: updateAddons };
      });
    }
  }

  useEffect(() => {
    if (formData.addons.length > 0) {
      setIsChecked((prev) => {
        let updateCheck = {
          online: false,
          storage: false,
          profile: false,
        };
        formData.addons.forEach((item) => {
          updateCheck[item.type] = true;
        });

        return { ...prev, ...updateCheck };
      });
    }
  }, []);

  return (
    <FormContent title={title} desc={desc}>
      <article
        className={isChecked.online === true ? "selected-addon addon" : "addon"}
        onClick={(e) => handleClick(e)}
        addon="online"
      >
        <input
          type="checkbox"
          name="online"
          id="online"
          checked={isChecked.online}
          readOnly
        />
        <div>
          <h2>Online service</h2>
          <p>Access to multiplayer games</p>
        </div>
        <p>
          +${onlineCost}/{cycle}
        </p>
      </article>

      <article
        className={
          isChecked.storage === true ? "selected-addon addon" : "addon"
        }
        onClick={(e) => handleClick(e)}
        addon="storage"
      >
        <input
          type="checkbox"
          name="storage"
          id="storage"
          checked={isChecked.storage}
          readOnly
        />
        <div>
          <h2>Larger storage</h2>
          <p>Extra 1TB of cloud save</p>
        </div>
        <p>
          +${storageCost}/{cycle}
        </p>
      </article>

      <article
        className={
          isChecked.profile === true ? "selected-addon addon" : "addon"
        }
        onClick={(e) => handleClick(e)}
        addon="profile"
      >
        <input
          type="checkbox"
          name="profile"
          id="profile"
          checked={isChecked.profile}
          readOnly
        />
        <div>
          <h2>Customizable profile</h2>
          <p>Custom theme on your profile</p>
        </div>
        <p>
          +${profileCost}/{cycle}
        </p>
      </article>
    </FormContent>
  );
}

export default AddOns;
