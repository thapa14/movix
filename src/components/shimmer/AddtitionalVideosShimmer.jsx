const AdditionalVideosShimmer = () => {
  return (
    <div className="skItem w-[150px] md:w-1/4 shrink-0">
      <div className="thumb skeleton w-full aspect-video rounded-xl mb-2.5"></div>
      <div className="row skeleton h-5 w-full rounded-[10px] mb-2.5"></div>
      <div className="row2 skeleton w-3/4 h-5 rounded-[10px]"></div>
    </div>
  );
};

export default AdditionalVideosShimmer;
