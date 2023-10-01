import ContentWrapper from "../ContentWrapper";

const rowStyle =
  "w-full h-[25px] mb-5 rounded-[50px] [&:nth-child(2)]:w-1/3 [&:nth-child(2)]:mb-12.5 [&:nth-child(5)]:w-1/2 [&:nth-child(5)]:mb-12.5";

function DetailsShimmer() {
  return (
    <div className="detailsBannerSkeleton flex flex-col md:flex-row gap-6 md:gap-12.5 relative ">
      <ContentWrapper classes="gap-12.5">
        <div className="left skeleton w-full md:max-w-[350px] block shrink-0 rounded-xl  aspect-[1/1.5]"></div>
        <div className="right w-full">
          {[1, 2, 3, 4, 5, 6, 7].map((el) => {
            return <div key={el} className={`${rowStyle} skeleton`}></div>;
          })}
        </div>
      </ContentWrapper>
    </div>
  );
}

export default DetailsShimmer;
