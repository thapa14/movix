import React from "react";
import { useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";
import ContentWrapper from "../../components/content-wrapper";
import Img from "../../components/img";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem ">
        <div className="circle skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 md:mb-6 "></div>
        <div className="row skeleton w-full h-5 rounded-[10px] mb-2.5"></div>
        <div className="row2 skeleton w-1/3 h-5 rounded-[10px] my-0 mx-auto "></div>
      </div>
    );
  };
  return (
    <div className="castSection relative mb-12.5  ">
      <ContentWrapper classes="flex-col">
        <div className="sectionHeading text-2xl text-white mb-6">Top Cast</div>
        {!loading ? (
          <div className="listItems flex gap-5 overflow-y-hidden no-scrollbar -mx-5 md:m-0 py-0 px-5  md:p-0">
            {data?.map((item) => {
              let imgUrl = item?.profile_path
                ? url.profile + item?.profile_path
                : avatar;
              return (
                <>
                  <div
                    key={item.id}
                    className="listItem text-center text-white"
                  >
                    <div className="profileImg w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 md:mb-6 overflow-hidden">
                      <Img
                        image={imgUrl}
                        classes="w-full h-full object-cover object-center block"
                      />
                    </div>
                    <div className="name text-sm md:text-lg leading-5 md:leading-6 font-semibold">
                      {item.name}
                    </div>
                    <div className="character text-sm md:text-lg leading-5 md:leading-6 opacity-50">
                      {item.character}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton flex gap-5 overflow-y-hidden -mx-5 md:m-0 py-0 px-5 md:p-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
