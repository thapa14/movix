import React from "react";

function ContentWrapper({ classes, children }) {
  return <div className={`container mx-auto flex ${classes}`}>{children}</div>;
}

export default ContentWrapper;
