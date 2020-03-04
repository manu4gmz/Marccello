import React from "react";
import Style from "./Input.css";

export default ({value, placeholder}) => {
  return (
    <div className="inputContainer">
      <img src="assets/search.svg"/>
      <input placeholder={placeholder} type="text" className="inputClean" value={value}/>
    </div>
  );
};
