import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div
      className={`videoPopup w-full h-full flex justify-center items-center fixed top-0 left-0  z-10 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }
      `}
    >
      <div
        className={`w-full h-full absolute top-0 left-0  backdrop-blur-sm transition-opacity duration-[400ms] bg-[#00000040] ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={hidePopup}
      ></div>
      <div
        className={`videoPlayer w-[800px] aspect-video ${
          show ? "scale-100" : "scale-[0.2]"
        } transition-transform duration[250ms]  bg-white `}
      >
        <span
          className="closeBtn absolute -top-5 right-0 text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
