import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput({ btnClass, btnValue, btnMethod, setShowSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryMethod = (event) => {
    if (event?.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      setShowSearch && setShowSearch(false);
    }
  };
  return (
    <>
      <div className="search-input flex items-center w-full ">
        <input
          type="text"
          placeholder="Search for a movie or a tv show..."
          className="w-[calc(100%-100px)] md:w-[calc(100%-150px)] h-12 md:h-15 text-sm md:text-xl py-0 px-4 md:px-8 outline-0 border-0 rounded-l-[30px]  bg-white text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchQueryMethod}
        />
        <button
          className={`btn w-100px md:w-150px h-12 md:h-15 text-base md:text-lg outline-0 border-0 rounded-r-[30px] ${btnClass}`}
          onClick={() => {
            btnValue === "Search" ? btnMethod({ query }) : setShowSearch(false);
          }}
        >
          {btnValue}
        </button>
      </div>
    </>
  );
}

export default SearchInput;
