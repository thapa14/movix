import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "./img";
import CircleRating from "./circle-rating";
import Genres from "./genres";
import PosterFallback from "../assets/images/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <div
      className="movieCard w-[calc(50%-15px)]  md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] mb-6 cursor-pointer shrink-0 "
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock w-full flex items-end justify-between p-2.5 mb-7.5 relative bg-center bg-cover aspect-[1/1.5] transition-all ease-in-out duration-500">
        <Img
          //   className="posterImg"
          image={posterUrl}
          classes="w-full h-full object-cover object-center"
        />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating
              rating={data.vote_average.toFixed(1)}
              classes="w-10 md:w-12.5 h-10 md:h-12.5 relative top-7.5 bg-white shrink-0 "
            />
            <Genres
              data={data.genre_ids.slice(0, 2)}
              classes="relative md:flex md:flex-row md:flex-wrap md:justify-end"
            />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock text-white flex flex-col">
        <span className="title text-base md:text-xl mb-2.5 leading-6">
          {data.title || data.name}
        </span>
        <span className="date text-sm opacity-50">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
