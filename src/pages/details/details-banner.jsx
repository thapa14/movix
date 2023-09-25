import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../components/content-wrapper";
import useFetch from "../../utils/hooks/useFetch";
import Img from "../../components/img";
import posterFallback from "../../assets/images/no-poster.png";
import Genres from "../../components/genres";
import CircleRating from "../../components/circle-rating";
import { PlayIcon } from "../../components/play-icon";
import VideoPopup from "../../components/video-popup";
import DetailsShimmer from "../../components/shimmer/details-shimmer";
import BackdropImage from "../../components/BackdropImage";
import FeatureCard from "../../components/FeatureCard";
import { extractData, toHoursAndMinutes } from "../../utils/helperFunctions";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const movieAbout = [
    {
      label: "Status",
      labelData: data?.status ? [data?.status] : [],
    },
    {
      label: "Release Date",
      labelData: data?.release_date ? [data?.release_date] : [],
    },
    {
      label: "Run Time",
      labelData: data?.runtime ? [toHoursAndMinutes(data?.runtime)] : [],
    },
  ];

  const supportCast = [
    {
      label: "Director",
      labelData: director ? extractData(director, "name") : [],
    },
    {
      label: "Writer",
      labelData: writer ? extractData(writer, "name") : [],
    },
    {
      label: "Created By",
      labelData: data?.created_by ? extractData(data?.created_by, "name") : [],
    },
  ];

  return (
    <div className="detailsBanner w-full min-h-[700px] pt-25 md:pt-[120px] mb-12.5 md:mb-0 bg-black1">
      {!loading ? (
        <>
          {!!data && (
            <>
              <BackdropImage
                imagePath={url.backdrop + data.backdrop_path}
                opacity="opacity-10"
              />

              <ContentWrapper>
                <div className="content flex flex-col md:flex-row gap-6 md:gap-12.5 relative ">
                  <div className="left shrink-0">
                    {data.backdrop_path ? (
                      <Img
                        image={url.backdrop + data.poster_path}
                        classes="w-full block rounded-xl md:max-w-[350px] "
                      />
                    ) : (
                      <Img
                        image={posterFallback}
                        classes="w-full block rounded-xl md:max-w-[350px] "
                      />
                    )}
                  </div>
                  <div className="right text-white">
                    <div className="title text-[28px] md:text-3xl  lg:text-[34px] leading-10 lg:leading-[44px]">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>

                    <div className="subtitle text-base md:text-lg   leading-6 md:leading-7 mb-4 italic opacity-50">
                      {data.tagline}
                    </div>

                    <Genres data={_genres} />

                    {/* rating and play button */}
                    <div className={`flex items-center gap-6 mb-6`}>
                      <CircleRating
                        rating={data?.vote_average?.toFixed(1)}
                        classes="max-w-[70px] md:max-w-[80px] bg-black2 "
                      />
                      <div
                        className="playBtn flex items-center gap-5 cursor-pointer"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon classes="w-15 md:w-16 stroke-white" />
                        <span className="text text-xl transition-all ease-in-out duration-700">
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    <div className="overview mb-3 md:mb-1 lg:mb-6">
                      <div className="heading mb-2.5 text-2xl">Overview</div>
                      <div className="description  leading-6  lg:pr-25">
                        {data.overview}
                      </div>
                    </div>

                    {/* release date runtime etc.. */}
                    <div className=" py-4 px-0 flex border-b border-solid border-[#ffffff1a]">
                      {movieAbout.map((el, index) => {
                        return (
                          <FeatureCard
                            key={index}
                            cardData={el}
                            classes="mr-2.5 flex flex-row flex-wrap"
                          />
                        );
                      })}
                    </div>

                    {supportCast.map((el, index) => {
                      return (
                        <FeatureCard
                          key={index}
                          cardData={el}
                          classes="py-4 px-0 flex border-b border-solid border-[#ffffff1a]"
                        />
                      );
                    })}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <DetailsShimmer />
      )}
    </div>
  );
};

export default DetailsBanner;
