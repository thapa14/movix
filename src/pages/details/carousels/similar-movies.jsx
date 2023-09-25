import React from "react";
import useFetch from "../../../utils/hooks/useFetch";
import Carousel from "../../../components/carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      carouselData={data?.results}
      loading={loading}
      endPoint={mediaType}
    />
  );
};

export default Similar;
