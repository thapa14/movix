import React from "react";
import { sortbyData } from "../../utils/static-data/explore-page";
import Select from "react-select";

function Header(props) {
  const { mediaType, genre, genresData, onChange, sortby } = props;
  return (
    <div className="pageHeader flex flex-col md:flex-row justify-between mb-6 ">
      <div className="pageTitle text-2xl leading-8 mb-5 md:mb-0 text-white">
        {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
      </div>
      <div className="filters flex gap-2.5 flex-col md:flex-row">
        <Select
          isMulti
          name="genres"
          value={genre}
          closeMenuOnSelect={false}
          options={genresData?.genres}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          onChange={onChange}
          placeholder="Select genres"
          className="genresDD w-full md:max-w-[500px] md:min-w-[250px]"
          classNamePrefix="react-select"
        />
        <Select
          name="sortby"
          value={sortby}
          options={sortbyData}
          onChange={onChange}
          isClearable={true}
          placeholder="Sort by"
          className="react-select-container sortbyDD w-full shrink-0 md:w-[250px]"
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
}

export default Header;
