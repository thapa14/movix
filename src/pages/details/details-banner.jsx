import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../components/content-wrapper";
import useFetch from "../../utils/fetchApi";
import Img from "../../components/img";
import posterFallback from "../../assets/images/no-poster.png";
import Genres from "../../components/genres";
import CircleRating from "../../components/circle-rating";
import { PlayIcon } from "../../components/play-icon";
import VideoPopup from "../../components/video-popup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const rowStyle =
    "w-full h-[25px] mb-5 rounded-[50px] [&:nth-child(2)]:w-1/3 [&:nth-child(2)]:mb-12.5 [&:nth-child(5)]:w-1/2 [&:nth-child(5)]:mb-12.5";

  const infoItem = "mr-2.5 flex flex-row flex-wrap";
  const textStyle = "mr-2.5 opacity-50 leading-6";
  const textBold = "font-bold";
  const infoStyle = " py-4 px-0 flex border-b border-solid border-[#ffffff1a]";

  return (
    <div className="detailsBanner w-full min-h-[700px] pt-25 md:pt-[120px] mb-12.5 md:mb-0 bg-black1">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdropImage w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden ">
                <Img
                  image={url.backdrop + data.backdrop_path}
                  classes="w-full h-full object-cover object-center"
                />
              </div>
              <div className="opacity-layer "></div>

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
                    <div className="title text-[28px] md:text-[34px] leading-10 md:leading-[44px]">
                      {`${data?.name || data?.title} ${dayjs(
                        data?.release_date
                      ).format("YYYY")}`}
                    </div>

                    <div className="subtitle text-base md:text-xl  leading-6 md:leading-7 mb-4 italic opacity-50">
                      {data.tagline}
                    </div>

                    <Genres data={_genres} />

                    <div className={`flex items-center gap-6 mb-6`}>
                      <CircleRating
                        rating={data?.vote_average?.toFixed(1)}
                        classes="max-w-[70px] md:max-w-[90px] bg-black2 "
                      />
                      <div
                        className="playBtn flex items-center gap-5 cursor-pointer"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon classes="w-15 md:w-20 stroke-white" />
                        <span className="text text-xl transition-all ease-in-out duration-700">
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    <div className="overview mb-6">
                      <div className="heading mb-2.5 text-2xl">Overview</div>
                      <div className="description leading-6 md:pr-25">
                        {data.overview}
                      </div>
                    </div>

                    <div className={`${infoStyle}`}>
                      {data.status && (
                        <div className={`${infoItem}`}>
                          <span className={`${textStyle} ${textBold} `}>
                            Status:{" "}
                          </span>
                          <span className={`${textStyle}`}>{data.status} </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className={`${infoItem}`}>
                          <span className={`${textStyle} ${textBold} `}>
                            Release Date:{" "}
                          </span>
                          <span className={`${textStyle}`}>
                            {dayjs(data.release_date).format(" MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className={`${infoItem}`}>
                          <span className={`${textStyle} ${textBold} `}>
                            Release Date:{" "}
                          </span>
                          <span className={`${textStyle}`}>
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className={`${infoStyle}`}>
                        <span className={`${textStyle} ${textBold} `}>
                          Director:{" "}
                        </span>
                        <span className={`${textStyle}`}>
                          {director.map((d, i) => (
                            <span key={i}>
                              {d.name} {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className={`${infoStyle}`}>
                        <span className={`${textStyle} ${textBold} `}>
                          Writer:{" "}
                        </span>
                        <span className={`${textStyle}`}>
                          {writer.map((d, i) => (
                            <span key={i}>
                              {d.name} {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className={`${infoStyle}`}>
                        <span className={`${textStyle} ${textBold} `}>
                          Created By:{" "}
                        </span>
                        <span className={`${textStyle}`}>
                          {data?.created_by.map((d, i) => (
                            <span key={i}>
                              {d.name}{" "}
                              {data?.created_by?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
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
        <div className="detailsBannerSkeleton flex flex-col md:flex-row gap-6 md:gap-12.5 relative ">
          <ContentWrapper classes="gap-12.5">
            <div className="left skeleton w-full md:max-w-[350px] block shrink-0 rounded-xl  aspect-[1/1.5]"></div>
            <div className="right w-full">
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
              <div className={`${rowStyle} skeleton`}></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
