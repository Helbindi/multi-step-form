import React from "react";
import thanks from "../assets/images/icon-thank-you.svg";

function Confirmation() {
  return (
    <section className="form-content thank-content">
      <img className="thank-img" src={thanks} alt="thank-you-image" />
      <h2 className="thank-title">Thank You!</h2>
      <p className="thank-desc">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </section>
  );
}

export default Confirmation;
