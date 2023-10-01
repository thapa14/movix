import React from "react";

const Spinner = ({ initial }) => {
  return (
    <div
      className={`loadingSpinner  w-full h-150px relative flex items-center justify-center ${
        initial ? "h-[700px]" : ""
      }`}
    >
      <svg
        className="spinner animate-spin z-20 w-12.5 h-12.5"
        viewBox="0 0 50 50"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
