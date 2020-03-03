import React from "react";
import Style from "./Button.css";

export default props => {
  return (
    <div>
      <button type="submit" class="buttonPink" href="#">
        {props.buttonTxt}Botón
      </button>
    </div>
  );
};
