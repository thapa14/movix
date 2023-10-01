import React from "react";
import { useSelector } from "react-redux";

function Genres({ data, classes }) {
  const genres = useSelector((state) => state.home.genres);

  return (
    <>
      <div className={`genres flex gap-1.5 ${classes}`}>
        {data?.map((genreId) => {
          if (!genres[genreId]?.name) return;
          return (
            <div
              key={genreId}
              className="genre rounded text-xs whitespace-nowrap px-[5px] py-[3px] text-white bg-pink1"
            >
              {genres[genreId]?.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Genres;
