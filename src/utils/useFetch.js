import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./fetchDataFromApi";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    console.log(url);
    fetchDataFromApi(url)
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
