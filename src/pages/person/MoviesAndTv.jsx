import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../utils/hooks/useFetch";

import ContentWrapper from "../../components/content-wrapper";
import TextHeading from "../../components/TextHeading";
import SwitchTabs from "../../components/switch-tabs";
import InfiniteListDisplay from "../../components/infinite-list-display";

function MoviesAndTv() {
  // hooks
  const [endPoint, setEndPoint] = useState("movie_credits");
  const { personId } = useParams();

  console.log(personId);
  const { data, loading, error } = useFetch(`/person/${personId}/${endPoint}`);

  const tabChangeMethod = (tab) => {
    setEndPoint(tab === "Movies" ? "movie_credits" : "tv_credits");
  };

  return (
    <div className="credits ">
      <ContentWrapper classes="flex-col gap-4 lg:flex-row lg:justify-between mb-5">
        <TextHeading heading="Movies & TV" classes="hidden md:flex" />
        <SwitchTabs
          tabData={["Movies", "Tv Shows"]}
          tabChangeMethod={tabChangeMethod}
          classes="max-w-max"
        />
      </ContentWrapper>
      <div></div>
    </div>
  );
}

export default MoviesAndTv;

// {
//   "adult": false,
//   "backdrop_path": "/xFYpUmB01nswPgbzi8EOCT1ZYFu.jpg",
//   "genre_ids": [
//       28,
//       18,
//       12
//   ],
//   "id": 980489,
//   "original_language": "en",
//   "original_title": "Gran Turismo",
//   "overview": "The ultimate wish-fulfillment tale of a teenage Gran Turismo player whose gaming skills won him a series of Nissan competitions to become an actual professional racecar driver.",
//   "popularity": 1367.649,
//   "poster_path": "/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg",
//   "release_date": "2023-08-09",
//   "title": "Gran Turismo",
//   "video": false,
//   "vote_average": 7.923,
//   "vote_count": 562,
//   "character": "Jann Mardenborough",
//   "credit_id": "63237645226c56007cd9f92e",
//   "order": 0
// },

// {
//   "adult": false,
//   "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
//   "genre_ids": [
//       18,
//       80
//   ],
//   "id": 238,
//   "original_language": "en",
//   "original_title": "The Godfather",
//   "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
//   "popularity": 107.267,
//   "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
//   "release_date": "1972-03-14",
//   "title": "The Godfather",
//   "video": false,
//   "vote_average": 8.7,
//   "vote_count": 18679
// },
