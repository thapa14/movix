import React from "react";

function CastCardShimmer() {
  return (
    <div className="skItem ">
      <div className="circle skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 md:mb-6 "></div>
      <div className="row skeleton w-full h-5 rounded-[10px] mb-2.5"></div>
      <div className="row2 skeleton w-1/3 h-5 rounded-[10px] my-0 mx-auto "></div>
    </div>
  );
}

export default CastCardShimmer;
