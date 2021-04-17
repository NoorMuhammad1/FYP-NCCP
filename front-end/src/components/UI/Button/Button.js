import React from "react";
import "./style.css";
const Button = (props) => {
  return (
    <div
      className="ui-button"
      style={{
        backgroundColor: props.backgroundColor,
        color: "white",
      }}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

export default Button;
