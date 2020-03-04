import React from "react";
import Style from "./Button.css";

export default props => {
  return (
    <div>
      <button type="submit" className="buttonPink">
        {props.buttonTxt}
      </button>
    </div>
  );
};
