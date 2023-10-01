import React from "react";
import Img from "./Img";

function BackdropImage({ imagePath, opacity }) {
  return (
    <>
      <div
        className={
          "w-full h-full absolute top-0 left-0 overflow-hidden " + opacity
        }
      >
        <Img
          image={imagePath}
          classes="w-full h-full object-cover object-center"
        />
      </div>
      <div className="opacity-layer "></div>
    </>
  );
}

export default BackdropImage;
