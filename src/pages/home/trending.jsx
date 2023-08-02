import React, { useState } from "react";
import ContentWrapper from "../../components/content-wrapper";
import SwitchTabs from "../../components/switch-tabs";
import useFetch from "../../utils/fetchApi";
import Carousel from "../../components/carousel";

function Trending() {
  const [endPoint, setEndPoint] = useState("day");

  const tabChangeMethod = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  return (
    <div className="trendingWrapper relative mb-18">
      <ContentWrapper classes="justify-between mb-5">
        <h2 className="text-white text-2xl font-normal">Trending</h2>
        <SwitchTabs
          tabData={["Day", "Week"]}
          tabChangeMethod={tabChangeMethod}
        />
      </ContentWrapper>
      <Carousel carouselData={data?.results} loading={loading} />
    </div>
  );
}

export default Trending;
