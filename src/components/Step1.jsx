import React from "react";
import FormContent from "./FormContent";

function Step1() {
  const title = "Personal info";
  const desc = "Please provide your name, email address, and phone number.";
  return (
    <FormContent title={title} desc={desc}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" placeholder="enter name" />
      <label htmlFor="email">Email Address</label>
      <input type="text" name="email" id="email" placeholder="enter email" />
      <label htmlFor="phone">Phone Number</label>
      <input type="text" name="phone" id="phone" placeholder="enter phone #" />
    </FormContent>
  );
}

export default Step1;
