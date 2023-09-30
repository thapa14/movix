import { memo, useEffect, useState } from "react";
import useFetch from "../../utils/hooks/useFetch";
import { useSelector } from "react-redux";
import SearchInput from "../../components/search-input";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/content-wrapper";
import BackdropImage from "../../components/BackdropImage";

const HeroBanner = () => {
  const [background, setBackground] = useState(null);
  const backdropUrl = useSelector((state) => state.home.url.backdrop);
  const { data, loading } = useFetch("/trending/movie/day");
  const navigate = useNavigate();

  useEffect(() => {
    const bg =
      backdropUrl +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, backdropUrl]);

  const querySearchMethod = (props) => {
    const { query } = props;
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="hero-banner w-full h-[450px] md:h-[700px] flex items-center relative bg-[#04152d]">
      {!loading && (
        <BackdropImage imagePath={background} opacity="opacity-50" />
      )}

      <ContentWrapper classes="h-full items-center justify-center">
        <div className="hero-banner-content flex flex-col items-center text-center relative text-white mx-auto my-0 max-w-[800px]">
          <h1 className="title text-[50px] md:text-[90px] font-bold md:mb-0">
            Welcome
          </h1>
          <p className="text-lg md:text-2xl font-medium mb-10 ">
            Millions of movies, Tv shows and people to discover. Explore now.
          </p>

          <SearchInput
            btnValue="Search"
            btnClass="text-white bg-gradient-to-r from-[#f89e00] from-0.99% to-[#da2f68] to-99%"
            btnMethod={(props) => querySearchMethod(props)}
          />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default memo(HeroBanner);
