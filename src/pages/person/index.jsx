import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/hooks/useFetch";
import DetailsShimmer from "../../components/shimmer/details-shimmer";
import ContentWrapper from "../../components/content-wrapper";
import { useSelector } from "react-redux";
import Img from "../../components/img";
import posterFallback from "../../assets/images/no-poster.png";
import TextHeading from "../../components/TextHeading";

function Person() {
  // states
  const [showButton, setShowButon] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { personId } = useParams();
  const { data, loading } = useFetch("/person/" + personId);
  const profileBasePath = useSelector((state) => state.home.url.profile);
  const contentRef = useRef();

  useEffect(() => {
    const checkOverflow = () => {
      if (
        contentRef?.current?.clientHeight < contentRef?.current?.scrollHeight
      ) {
        setShowButon(true);
      } else setShowButon(false);
    };

    checkOverflow();
  }, [data]);

  const showButtonMethod = () => {
    setShowContent(true);
    setShowButon(false);
  };

  if (loading) return <DetailsShimmer />;

  console.log(data);
  const {
    profile_path,
    name,
    biography,
    birthday,
    deathday,
    gender,
    known_for_department,
    place_of_birth,
  } = data;

  const personalDetailsArray = [
    {
      label: "known for",
      value: known_for_department,
    },

    {
      label: "known for",
      value: gender === 1 ? "female" : "male",
    },
    {
      label: "Born",
      value: birthday,
    },
    {
      label: "Died",
      value: deathday ? deathday : "-",
    },
    {
      label: "birth place",
      value: place_of_birth,
    },
  ];
  const paragraphs = biography.split("\n\n");
  return (
    <>
      {!loading && (
        <>
          <div className=" w-full min-h-[700px] pt-25 md:pt-28 mb-12.5 md:mb-0 bg-black1 text-white">
            <ContentWrapper classes="flex-col md:flex-row gap-6 md:gap-12">
              <div className="left flex flex-col items-center shrink-0 mb-6">
                <div className="profile-image md:mb-10">
                  {profile_path ? (
                    <Img
                      image={profileBasePath + profile_path}
                      classes="w-40 block rounded-xl md:w-[350px]"
                    />
                  ) : (
                    <Img
                      image={posterFallback}
                      classes="w-full block rounded-xl md:max-w-[350px]"
                    />
                  )}
                </div>

                {/* hide in medium devices */}
                <h1 className="md:hidden text-3xl mt-4 mb-6 font-medium md:text-4xl md:font-semibold md:mb-4 text-white ">
                  {name}
                </h1>

                <div className="profile-details w-full flex flex-col gap-2">
                  <h2 className="text-2xl font-normal text-start">
                    Personal Details
                  </h2>
                  <div className="w-full flex  flex-wrap md:flex-col md:justify-normal ">
                    {personalDetailsArray.map((el, index) => (
                      <div
                        key={index}
                        className="textBlock flex flex-col  gap-1 mb-2 text-white w-1/2 "
                      >
                        <span className="title text-base font-semibold capitalize opacity-90 md:text-xl  leading-6 truncate">
                          {el.label} :-
                        </span>
                        <span className="date text-base md:text-lg opacity-60  capitalize mr-4">
                          {el.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

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
                      <p
                        key={index}
                        className="text-base leading-7  tracking-wide mb-7 "
                      >
                        {paragraph}
                      </p>
                    ))}

                    {showButton ? (
                      <span
                        className="absolute bottom-0 right-0 text-orange-500 font-semibold z-10 cursor-pointer"
                        onClick={showButtonMethod}
                      >
                        Read More...
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="credits ">
                  <TextHeading heading="Credits" />
                </div>
              </div>
            </ContentWrapper>
          </div>
        </>
      )}
    </>
  );
}

export default Person;
