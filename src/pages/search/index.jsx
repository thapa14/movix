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

  console.log(searchQuery);

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
    fetchInitialData();
  }, [searchQuery]);

  console.log(data?.results?.length);
  return (
    <>
      <div className="searchResultsPage min-h-[700px pt-25">
        {/* {true && <Spinner />} */}
        {!loading && (
          <ContentWrapper>
            {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">{`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of ${searchQuery}`}</div>
                {/* <InfiniteScroll>
                  {data.results.map((item, index) => {
                    if (item.media_type === "person") return;
                    return <MovieCard key={index} data={item} />;
                  })}
                </InfiniteScroll> */}
              </>
            ) : (
              <span className="resultNotFound">Sorry, Result not found</span>
            )}
          </ContentWrapper>
        )}
      </div>
    </>
  );
}

export default Search;
