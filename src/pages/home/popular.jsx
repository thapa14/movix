import { useState, memo } from "react";
import ContentWrapper from "../../components/content-wrapper";
import SwitchTabs from "../../components/switch-tabs";
import useFetch from "../../utils/hooks/useFetch";
import Carousel from "../../components/carousel";

function Popular() {
  const [endPoint, setEndPoint] = useState("movie");

  const tabChangeMethod = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  const { data, loading } = useFetch(`/${endPoint}/popular`);

  return (
    <div className="trendingWrapper relative mb-18">
      <ContentWrapper classes="justify-between mb-5">
        <h2 className="text-white text-2xl font-normal">What's Popular</h2>
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

export default memo(Popular);
