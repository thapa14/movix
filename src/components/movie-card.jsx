import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "./img";
import CircleRating from "./circle-rating";
import Genres from "./genres";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard w-[calc(50% - 5px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] mb-6 cursor-pointer shrink-0 "
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock w-full flex items-end justify-between p-2.5 mb-7.5 relative bg-center bg-cover aspect-[1/1.5]">
        <Img
          className="posterImg"
          src={posterUrl}
          classes="w-full h-full object-cover object-center"
        />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
