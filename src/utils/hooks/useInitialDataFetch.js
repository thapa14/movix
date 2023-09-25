import { useEffect, useState } from "react";

const useInitalDataFetch = (searchQuery) => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  setLoading(true);

  useEffect(() => {
    fetchDataFromApi(`/search/multi?query=${searchQuery}&page=1`).then(
      (res) => {
        setData(res);
        setPageNumber((prev) => prev + 1);
        setLoading(false);
      }
    );
  }, [searchQuery]);
  return { data, pageNumber, loading };
};
export { useInitalDataFetch };
