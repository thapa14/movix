import React from "react";

function CardShimmer() {
  return (
    <div className="skeletonItem w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] cursor-pointer shrink-0">
      <div className="posterBlock skeleton w-full rounded-[12px] mb-7.5 aspect-[1/1.5] "></div>
      <div className="textBlock flex flex-col">
        <div className="title skeleton w-full h-5 mb-2.5"></div>
        <div className="date skeleton w-3/4 h-5"></div>
      </div>
    </div>
  );
}

export default CardShimmer;
