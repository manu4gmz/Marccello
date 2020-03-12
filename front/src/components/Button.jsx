import React from "react";

export default props => {
  return (
    <button
      type="submit"
      className={props.buttonClass || "buttonPink"}
      onClick={props.onClick || null}
    >
      {props.buttonTxt}
    </button>
  );
};
