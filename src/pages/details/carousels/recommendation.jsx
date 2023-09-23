import React from "react";
import Carousel from "../../../components/carousel";
import useFetch from "../../../utils/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  console.log(data);
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
