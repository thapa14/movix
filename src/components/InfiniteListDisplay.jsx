import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import CardShimmer from "./shimmer/CardShimmer";

function InfiniteListDisplay(props) {
  const { loading, data, fetchNextPageData, pageNumber, mediaType } = props;
  return (
    <>
      {!loading ? (
        <>
          {data?.results?.length > 0 ? (
            <InfiniteScroll
              className="content flex flex-row flex-wrap gap-2.5 md:mb-5 mb-12.5"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNumber <= data?.total_pages}
              loader={<h4>loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {data?.results?.map((item, index) => {
                if (item.media_type === "person") return;
                return (
                  <MovieCard key={index} data={item} mediaType={mediaType} />
                );
              })}
            </InfiniteScroll>
          ) : (
            <span className="resultNotFound text-2xl text-black-light">
              Sorry, Results not found!
            </span>
          )}
        </>
      ) : (
        <div className="loadingSkeleton w-full flex gap-2.5 no-scrollbar overflow-y-hidden -mx-5 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0 ">
          {[1, 2, 3, 4, 5].map((el, index) => (
            <CardShimmer key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default InfiniteListDisplay;
