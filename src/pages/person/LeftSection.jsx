import React, { memo } from "react";
import { useSelector } from "react-redux";
import posterFallback from "../../assets/images/no-poster.png";
import Img from "../../components/img";

function LeftSection({ personalDetailsArray, profile_path, name }) {
  // hooks
  const profileBasePath = useSelector((state) => state.home.url.profile);

  return (
    <div className="left flex flex-col items-center md:items-start shrink-0 mb-6">
      <div className="profile-image md:mb-10 md:w-[350px] md:h-[500px]">
        {profile_path ? (
          <Img
            image={profileBasePath + profile_path}
            classes="w-40 block rounded-xl md:w-[350px]"
          />
        ) : (
          <Img
            image={posterFallback}
            classes="w-full block rounded-xl md:max-w-[350px]"
          />
        )}
      </div>

      {/* hide in medium devices */}
      <h1 className="md:hidden text-3xl mt-4 mb-6 font-medium md:text-4xl md:font-semibold md:mb-4 text-white ">
        {name}
      </h1>

      <div className="profile-details w-full flex flex-col gap-2">
        <h2 className="text-2xl font-normal text-start">Personal Details</h2>
        <div className="w-full flex  flex-wrap md:flex-col md:justify-normal ">
          {personalDetailsArray.map((el, index) => (
            <div
              key={index}
              className="textBlock flex flex-col  gap-1 mb-2 text-white w-1/2 "
            >
              <span className="title text-base font-semibold capitalize opacity-90 md:text-xl  leading-6 truncate">
                {el.label} :-
              </span>
              <span className="date text-base md:text-lg opacity-60  capitalize mr-4">
                {el.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LeftSection);
