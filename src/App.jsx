import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { fetchDataFromApi } from "./utils/api";
import { Contact, Details, Home, Search } from "./pages";
import { getApiConfiguration, getGenres } from "./redux/store-slice";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const dispatch = useDispatch();

  const configurationApiMethod = async () => {
    const data = await fetchDataFromApi("/configuration");

    dispatch(
      getApiConfiguration({
        backdrop: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
      })
    );
  };

  useEffect(() => {
    configurationApiMethod();
    getGenresMethod();
  });

  const getGenresMethod = async () => {
    const promises = [];
    const allEndpoints = ["tv", "movie"];
    const allGenres = {};

    allEndpoints.forEach((endpoint) => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    });
    console.log(promises);

    const genreData = await Promise.all(promises);
    console.log(genreData);

    genreData.forEach(({ genres }) => {
      return genres.forEach((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/:mediaType/:id" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
