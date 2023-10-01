import React, { memo, useState } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import SwitchTabs from "../../components/SwitchTabs";
import useFetch from "../../utils/hooks/useFetch";
import Carousel from "../../components/Carousel";

function TopRated() {
  const [endPoint, setEndPoint] = useState("movie");

  const tabChangeMethod = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  return (
    <div className="trendingWrapper relative mb-18">
      <ContentWrapper classes="justify-between mb-5">
        <h2 className="text-white text-2xl font-normal">Top Rated</h2>
        <SwitchTabs
          tabData={["Movies", "Tv Shows"]}
          tabChangeMethod={tabChangeMethod}
        />
      </ContentWrapper>
      <Carousel
        carouselData={data?.results}
        loading={loading}
        endPoint={endPoint}
      />
    </div>
  );
}

export default memo(TopRated);
