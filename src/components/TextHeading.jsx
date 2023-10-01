import React from "react";

function TextHeading({ classes, heading }) {
  return <h2 className={"text-2xl font-normal " + classes}>{heading}</h2>;
}

export default TextHeading;
