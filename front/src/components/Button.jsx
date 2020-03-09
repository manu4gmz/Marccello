import React from "react";
import Style from "./Button.css";

export default props => {
  return (
    
  <button type="submit" className={props.buttonClass || "buttonPink"} onClick={props.onClick || null}>
    {props.buttonTxt}
  </button>
  );
};
