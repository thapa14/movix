import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import ContentWrapper from "../../components/content-wrapper";
import InfiniteListDisplay from "../../components/infinite-list-display";

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
    setPageNumber(1);
    fetchInitialData();
  }, [searchQuery]);

  return (
    <>
      <div className="searchResultsPage min-h-[700px] pt-25">
        <ContentWrapper classes="flex-col">
          {!loading && data?.results?.length > 0 && (
            <div className="pageTitle text-2xl leading-[34px] text-white mb-6">{`Search ${
              data.total_results > 1 ? "results" : "result"
            } of ${searchQuery}`}</div>
          )}
          <InfiniteListDisplay
            loading={loading}
            data={data}
            fetchNextPageData={fetchNextPageData}
            pageNumber={pageNumber}
          />
        </ContentWrapper>
      </div>
    </>
  );
}

export default Search;
