import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { fetchDataFromApi } from "./utils/fetchDataFromApi";
import { getApiConfiguration, getGenres } from "./redux/store-slice";
import Home from "./pages/home";

const Details = lazy(() => import("./pages/details"));
const Explore = lazy(() => import("./pages/explore"));
const Search = lazy(() => import("./pages/search"));
const Contact = lazy(() => import("./pages/contact"));

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
  }, []);

  const getGenresMethod = async () => {
    const promises = [];
    const allEndpoints = ["tv", "movie"];
    const allGenres = {};

    allEndpoints.forEach((endpoint) => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    });

    const genreData = await Promise.all(promises);

    genreData.forEach(({ genres }) => {
      return genres.forEach((item) => (allGenres[item.id] = item)); // set allGenres as {id: genre,}
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contact"
          element={
            <Suspense>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/search/:searchQuery"
          element={
            <Suspense>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/:mediaType/:id"
          element={
            <Suspense>
              <Details />
            </Suspense>
          }
        />
        <Route
          path="/explore/:mediaType"
          element={
            <Suspense>
              <Explore />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
