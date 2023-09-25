import React from "react";
import Carousel from "../../../components/carousel";
import useFetch from "../../../utils/hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  return (
    <Carousel
      title="Recommendations"
      carouselData={data?.results}
      loading={loading}
      endPoint={mediaType}
    />
  );
};

export default Recommendation;
