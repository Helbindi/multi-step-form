import React from "react";

function MultiForm({ children }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }
  return <form onSubmit={(e) => handleSubmit(e)}>{children}</form>;
}

export default MultiForm;
