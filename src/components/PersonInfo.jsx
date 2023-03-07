import React, { useState } from "react";
import FormContent from "./FormContent";

function PersonInfo({ formData, setFormData }) {
  const title = "Personal info";
  const desc = "Please provide your name, email address, and phone number.";

  function handleChange(e) {
    e.preventDefault();
    const type = e.target.attributes.id.value;

    switch (type.toLowerCase()) {
      case "name": {
        setFormData((prev) => {
          const updateName = e.target.value;
          return { ...prev, name: updateName };
        });
        break;
      }
      case "email": {
        setFormData((prev) => {
          const updateEmail = e.target.value;
          return { ...prev, email: updateEmail };
        });
        break;
      }
      case "phone": {
        setFormData((prev) => {
          const updatePhone = e.target.value;
          return { ...prev, phone: updatePhone };
        });
        break;
      }

      default:
        break;
    }
  }
  return (
    <FormContent title={title} desc={desc}>
      <div className="info">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="e.g. Stephen King"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="info">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="e.g. stephenking@lorem.com"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="info">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="e.g. +1 234 567 890"
          value={formData.phone}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </FormContent>
  );
}

export default PersonInfo;
