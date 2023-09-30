import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/content-wrapper";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import useFetch from "../../utils/hooks/useFetch";
import Header from "./head";
import InfiniteListDisplay from "../../components/infinite-list-display";

const Explore = () => {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortby, setSortby] = useState(null);

  const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  let filters = {};

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNumber((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNumber}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNumber((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNumber(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    //select option function
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
    setPageNumber(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage min-h-[700px] pt-25">
      <ContentWrapper classes="flex-col">
        <Header
          genre={genre}
          onChange={onChange}
          genresData={genresData}
          sortby={sortby}
          mediaType={mediaType}
        />
        <InfiniteListDisplay
          loading={loading}
          data={data}
          fetchNextPageData={fetchNextPageData}
          pageNumber={pageNumber}
          mediaType={mediaType}
        />
      </ContentWrapper>
    </div>
  );
};

export default memo(Explore);
