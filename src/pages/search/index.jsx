import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner";
import ContentWrapper from "../../components/content-wrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movie-card";

function Search() {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { searchQuery } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/search/multi?query=${searchQuery}&page=${pageNumber}`
    ).then((res) => {
      setdata(res);
      setPageNumber((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    console.log("next page function");
    fetchDataFromApi(
      `/search/multi?query=${searchQuery}&page=${pageNumber}`
    ).then((res) => {
      if (data.results) {
        setdata({ ...data, results: [...data?.results, ...res.results] });
      } else {
        setdata(res);
      }
      setPageNumber((prev) => prev + 1);
    });
  };

  useEffect(() => {
    console.log("useEffect");
    setPageNumber(1);
    fetchInitialData();
  }, [searchQuery]);

  return (
    <>
      <div className="searchResultsPage min-h-[700px] pt-25">
        {/* {true && <Spinner />} */}
        {!loading && (
          <ContentWrapper classes="flex-col">
            {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle text-2xl leading-[34px] text-white mb-6">{`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of ${searchQuery}`}</div>

                <InfiniteScroll
                  className="content flex flex-row flex-wrap gap-2.5 md:gap-5 mb-12.5 "
                  dataLength={data?.results?.length}
                  hasMore={pageNumber <= data?.total_pages}
                  next={fetchNextPageData}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {data?.results?.map((item, index) => {
                    if (item?.media_type === "person") return;
                    return <MovieCard key={index} data={item} />;
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className="resultNotFound text-2xl text-black1">
                Sorry, Result not found
              </span>
            )}
          </ContentWrapper>
        )}
      </div>
    </>
  );
}

export default Search;
