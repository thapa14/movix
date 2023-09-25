import React, { useState } from "react";
import ContentWrapper from "../../components/content-wrapper";
import VideoPopup from "../../components/video-popup";
import Img from "../../components/img";
import { PlayIcon } from "../../components/play-icon";
import AdditionalVideosShimmer from "../../components/shimmer/addtitionalVideosShimmer";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className="videosSection relative mb-12.5">
      <ContentWrapper classes="flex-col">
        <div className="sectionHeading text-2xl text-white mb-6">
          Official Videos
        </div>
        {!loading ? (
          <div className="videos flex gap-2.5 md:gap-5 overflow-x-auto no-scrollbar -mx-5 md:m-0 py-0 px-5 md:p-0">
            {data?.results?.map((video) => {
              return (
                <div
                  key={video.id}
                  className="videoItem w-[150px] md:w-1/4 shrink-0 cursor-pointer"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}
                >
                  <div className="thumbnail mb-4 relative">
                    <Img
                      image={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      classes="w-full block rounded-xl transition-all duration-[700ms] ease-in-out hover:opacity-50"
                    />
                    <PlayIcon classes="absolute w-12.5 h-12.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="video-title text-sm md:text-base leading-5 md:leading-6 text-white">
                    {video.name}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton flex gap-2.5 md:gap-5 overflow-x-auto -mx-5 md:m-0 py-0 px-5 md:p-0">
            {[1, 2, 3, 4, 5].map((el) => (
              <AdditionalVideosShimmer key={el} />
            ))}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
