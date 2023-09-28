import React from "react";
import { useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";
import ContentWrapper from "../../components/content-wrapper";
import Img from "../../components/img";
import CastCardShimmer from "../../components/shimmer/CastCardShimmer";
import { useNavigate } from "react-router-dom";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigateToPersonDetails = (personId) => {
    navigate(`/person/${personId}`);
  };

  return (
    <div className="castSection relative mb-12.5  ">
      <ContentWrapper classes="flex-col">
        <div className="sectionHeading text-2xl text-white mb-6">Top Cast</div>
        {!loading ? (
          <div className="listItems flex gap-5 overflow-y-hidden no-scrollbar -mx-5 md:m-0 py-0 px-5  md:p-0">
            {data?.map((item) => {
              let imgUrl = item?.profile_path
                ? url.profile + item?.profile_path
                : avatar;
              return (
                <div
                  key={item.id}
                  className="listItem text-center text-white cursor-pointer"
                  onClick={() => navigateToPersonDetails(item.id)}
                >
                  <div className="profileImg w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 md:mb-6 overflow-hidden">
                    <Img
                      image={imgUrl}
                      classes="w-full h-full object-cover object-center block"
                    />
                  </div>
                  <div className="name text-sm md:text-lg leading-5 md:leading-6 font-semibold">
                    {item.name}
                  </div>
                  <div className="character text-sm md:text-lg leading-5 md:leading-6 opacity-50">
                    {item.character}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton flex gap-5 overflow-y-hidden -mx-5 md:m-0 py-0 px-5 md:p-0">
            {[1, 2, 3, 4, 5].map((el) => (
              <CastCardShimmer key={el} />
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;

// {
//   "adult": false,
//   "also_known_as": [
//     "Mel Columcille Gerard Gibson",
//     "梅尔·吉布森",
//     "Мэл Гибсон",
//     "Mel Colm-Cille Gerard Gibson, AO",
//     "Μελ Κόλμ-Σίλε Τζέραρντ Γκίμπσον",
//     "Μελ Γκίμπσον",
//     "멜 깁슨"
//   ],
//   "biography": "Mel Columcille Gerard Gibson (born January 3, 1956) is an actor, film director, producer and screenwriter. Born in Peekskill, New York, Gibson moved with his parents to Sydney, Australia when he was 12 years old and later studied acting at the Australian National Institute of Dramatic Art. After appearing in the \"Mad Max\" and \"Lethal Weapon\" series, Gibson went on to direct and star in the Academy Award-winning \"Braveheart\" (1995). In 2004, he directed and produced \"The Passion of the Christ,\" a controversial yet successful film portraying the last hours in the life of Jesus Christ.",
//   "birthday": "1956-01-03",
//   "deathday": null,
//   "gender": 2,
//   "homepage": null,
//   "id": 2461,
//   "imdb_id": "nm0000154",
//   "known_for_department": "Acting",
//   "name": "Mel Gibson",
//   "place_of_birth": "Peekskill, New York, USA",
//   "popularity": 108.212,
//   "profile_path": "/jnqHMaOslt8cef2atSmOpGRvNla.jpg"
// }
