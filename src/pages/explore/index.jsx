import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import MovieCard from "../../components/movie-card";
import ContentWrapper from "../../components/content-wrapper";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import useFetch from "../../utils/useFetch";
import CardShimmer from "../../components/shimmer/card-shimmer";
import Header from "./head";

let filters = {};

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    //select option function
    console.log(action);
    console.log(selectedItems);
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "remove-value") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage min-h-[700px] pt-25">
      <ContentWrapper classes="flex-col">
        <Header
          onChange={onChange}
          genresData={genresData}
          sortby={sortby}
          mediaType={mediaType}
        />
        {!loading ? (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content flex flex-row flex-wrap gap-2.5 md:mb-5 mb-12.5"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<h4>loading...</h4>}
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
      </ContentWrapper>
    </div>
  );
};

export default Explore;
