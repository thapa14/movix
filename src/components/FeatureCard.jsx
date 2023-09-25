import React from "react";

function FeatureCard({ cardData, classes }) {
  const { label, labelData } = cardData;
  return labelData.length > 0 ? (
    <div className={classes}>
      <span className="mr-2.5 opacity-50 leading-6 font-bold">{label}: </span>
      <span className="mr-2.5 opacity-50 leading-6">
        {labelData.join(" , ")}
      </span>
    </div>
  ) : (
    <></>
  );
}

export default FeatureCard;
