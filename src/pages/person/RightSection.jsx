import React from "react";
import TextHeading from "../../components/TextHeading";
import MoviesAndTv from "./MoviesAndTv";

function RightSection({
  name,
  showContent,
  contentRef,
  paragraphs,
  showReadButton,
  readMoreButtonMethod,
}) {
  return (
    <div className="right">
      <div className="about flex flex-col gap-2 text-white mb-10 ">
        <h1 className="text-3xl font-medium md:text-4xl md:font-semibold md:mb-4 hidden md:block text-white ">
          {name}
        </h1>
        <TextHeading heading="Biography" />

        <div
          className={` relative lg:mr-12   ${
            showContent
              ? "min-h-[336px]"
              : "max-h-[336px] overflow-hidden after:content-['']  after:h-6 after:w-full after:absolute after:bottom-0 after:right-0 after:bg-gradient-to-r after:from-[#04152d00] after:from-0.99% after:to-[#04152d] after:to-80%"
          }`}
          ref={contentRef}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-7  tracking-wide mb-7 ">
              {paragraph}
            </p>
          ))}

          {showReadButton ? (
            <span
              className="absolute bottom-0 right-0 text-orange-500 font-semibold z-10 cursor-pointer"
              onClick={readMoreButtonMethod}
            >
              Read More...
            </span>
          ) : null}
        </div>
      </div>
      <MoviesAndTv />
    </div>
  );
}

export default RightSection;
