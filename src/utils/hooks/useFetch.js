import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../fetchDataFromApi";

const useFetch = (url, params) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetchDataFromApi(url, params)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
