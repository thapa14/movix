import React, { useRef } from "react";
import ContentWrapper from "./content-wrapper";
import Img from "./img";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import noPosterDefault from "../assets/images/no-poster.png";
import dayjs from "dayjs";
import CircleRating from "./circle-rating";
import Genres from "./genres";

function Carousel({ carouselData, loading, endPoint, title }) {
  // useState

  const carouselContainer = useRef();
  const posterUrl = useSelector((state) => state.home.url.poster);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  const ArrowClasses =
    "hidden md:block text-3xl text-black absolute top-[44%] cursor-pointer opacity-60 hover:opacity-80 transition-opacity ease-in-out duration-150 z-[10]  translate-y-[-50%]  fill-white";

  const skItem = () => {
    return (
      <div className="skeletonItem w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] cursor-pointer shrink-0">
        <div className="posterBlock skeleton w-full rounded-[12px] mb-7.5 aspect-[1/1.5] "></div>
        <div className="textBlock flex flex-col">
          <div className="title skeleton w-full h-5 mb-2.5"></div>
          <div className="date skeleton w-3/4 h-5"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-12.5">
      <ContentWrapper classes="relative flex-col">
        {title && (
          <div className="text-2xl text-white mb-5 font-normal">{title}</div>
        )}

        {!loading ? (
          <>
            {carouselData?.length > 0 && (
              <>
                <BsFillArrowLeftCircleFill
                  className={`${ArrowClasses} left-8`}
                  onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                  className={`${ArrowClasses} right-8`}
                  onClick={() => navigation("right")}
                />
              </>
            )}

            <div
              className="carouselItems flex gap-2.5 -mx-5 px-5 overflow-y-hidden no-scrollbar md:gap-5 md:overflow-hidden m-0 p-0"
              ref={carouselContainer}
            >
              {carouselData?.map((item) => {
                const fullPosterUrl = item.poster_path
                  ? posterUrl + item.poster_path
                  : noPosterDefault;
                return (
                  <div
                    key={item.id}
                    className="carouselItem w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] cursor-pointer shrink-0"
                    onClick={() =>
                      navigate(`/${item.media_type || endPoint}/${item.id}`)
                    }
                  >
                    <div className="posterBlock w-full flex items-end justify-between p-2.5 mb-7.5 relative bg-center bg-cover aspect-[1/1.5]">
                      <Img
                        image={fullPosterUrl}
                        classes="w-full h-full object-cover object-center"
                      />
                      <CircleRating
                        rating={item?.vote_average?.toFixed(1)}
                        classes="w-10 md:w-12.5 h-10 md:h-12.5 relative top-7.5 bg-white shrink-0"
                      />
                      <Genres data={item?.genre_ids?.slice(0, 2)} />
                    </div>
                    <div className="textBlock flex flex-col text-white">
                      <span className="title text-base md:text-xl mb-2.5 leading-6">
                        {item.title || item.name}
                      </span>
                      <span className="date opacity-50 text-sm">
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="loadingSkeleton w-full flex gap-2.5 no-scrollbar overflow-y-hidden -mx-5 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0 ">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
