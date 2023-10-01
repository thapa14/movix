import { useEffect, lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./redux/store-slice";

import { fetchDataFromApi } from "./utils/fetchDataFromApi";

import Home from "./pages/home";
import Person from "./pages/person";

import Layout from "./components/Layout";
import ErrorComponent from "./components/ErrorComponent";

const Details = lazy(() => import("./pages/details"));
const Explore = lazy(() => import("./pages/explore"));
const Search = lazy(() => import("./pages/search"));
const Contact = lazy(() => import("./pages/contact"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    configurationApiMethod();
    getGenresMethod();
  }, []);

  const configurationApiMethod = async () => {
    const data = await fetchDataFromApi("/configuration");
    console.log(data);
    dispatch(
      getApiConfiguration({
        backdrop: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
      })
    );
  };

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorComponent />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contact",
          element: (
            <Suspense>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "/:mediaType/:id",
          element: (
            <Suspense>
              <Details />
            </Suspense>
          ),
        },
        {
          path: "/search/:searchQuery",
          element: (
            <Suspense>
              <Search />
            </Suspense>
          ),
        },
        {
          path: "/explore/:mediaType",
          element: (
            <Suspense>
              <Explore />
            </Suspense>
          ),
        },
        {
          path: "/person/:personId",
          element: <Person />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
