import React from "react";
import HeroBanner from "./hero-banner";
import Trending from "./trending";
import Popular from "./popular";
import TopRated from "./top-rated";

function Home() {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
}

export default Home;
