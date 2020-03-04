import React from "react";
import Style from "./Input.css";

export default ({value, placeholder, onChange, search, name }) => {
  return (
    <div className="inputContainer">
      { search ? <img src="assets/search.svg"/> : null }
      <input onChange={onChange || null} name={name} placeholder={placeholder} type="text" className="inputClean" value={value}/>
    </div>
  );
};
