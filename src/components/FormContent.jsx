import React from "react";

function FormContent({ title, desc, children }) {
  return (
    <section className="form-content">
      <h2>{title}</h2>
      <p>{desc}</p>
      {children}
    </section>
  );
}

export default FormContent;
