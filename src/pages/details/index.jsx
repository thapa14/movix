import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/hooks/useFetch";
import DetailsBanner from "./DetailsBanner";
import Cast from "./Cast";
import VideosSection from "./VideosSection";
import Similar from "./carousels/SimilarMovies";
import Recommendation from "./carousels/Recommendation";

function Details() {
  const { mediaType, id } = useParams();
  const { data: videos, loading: videosLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <>
      <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={videos} loading={videosLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </>
  );
}

export default Details;
