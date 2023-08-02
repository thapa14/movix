import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const headers = {
  authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios({
      baseURL: BASE_URL,
      url: url,
      headers,
      params,
    });

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
