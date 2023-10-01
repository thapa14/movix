import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/hooks/useFetch";
import DetailsShimmer from "../../components/shimmer/DetailsShimmer";
import ContentWrapper from "../../components/ContentWrapper";
import Img from "../../components/Img";
import TextHeading from "../../components/TextHeading";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function Person() {
  // states
  const [showReadButton, setShowReadButon] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { personId } = useParams();
  const contentRef = useRef();

  // custom hooks
  const { data, loading } = useFetch("/person/" + personId);

  console.log(personId);
  useEffect(() => {
    const checkOverflow = () => {
      if (
        contentRef?.current?.clientHeight < contentRef?.current?.scrollHeight
      ) {
        setShowReadButon(true);
      } else setShowReadButon(false);
    };

    checkOverflow();
  }, [data]);

  const readMoreButtonMethod = () => {
    setShowContent(true);
    setShowReadButon(false);
  };

  if (loading) return <DetailsShimmer />;

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
              <LeftSection
                personalDetailsArray={personalDetailsArray}
                profile_path={profile_path}
                name={name}
              />

              <RightSection
                showContent={showContent}
                name={name}
                contentRef={contentRef}
                paragraphs={paragraphs}
                readMoreButtonMethod={readMoreButtonMethod}
                showReadButton={showReadButton}
              />
            </ContentWrapper>
          </div>
        </>
      )}
    </>
  );
}

export default Person;
