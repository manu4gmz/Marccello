import React from "react";
import Style from "./Input.css";

export default ({value, placeholder, onChange, search, name, type }) => {
  return (
    <div className="inputContainer">
      { search ? <img src="assets/search.svg"/> : null }
      <input onChange={onChange || null} name={name} placeholder={placeholder} className="inputClean" value={value} type={type || "text"} />
    </div>
  );
};
