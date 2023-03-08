import React from "react";

function FormContent({ title, desc, children }) {
  return (
    <section className="form-content">
      <h2 className="form-title">{title}</h2>
      <p className="form-desc">{desc}</p>
      {children}
    </section>
  );
}

export default FormContent;
