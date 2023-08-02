import React from "react";
import ContentWrapper from "./content-wrapper";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const menuData = [
    { label: "Terms Of Use" },
    { label: "Privacy-Policy" },
    { label: "About" },
    { label: "Blog" },
    { label: "FAQ" },
  ];

  const iconsArrayData = [
    <FaFacebookF />,
    <FaInstagram />,
    <FaTwitter />,
    <FaLinkedin />,
  ];

  return (
    <footer className="footer py-12 relative bg-black3 text-white">
      <ContentWrapper classes="flex-col items-center">
        <ul className="menuItems flex items-center justify-center mb-5 md:mb-7 gap-4 md:gap-8  list-none ">
          {menuData.map((data, index) => (
            <li
              key={index}
              className="cursor-pointer text-xs md:text-base hover:text-pink-700 transition-all ease-in-out duration-300"
            >
              {data.label}
            </li>
          ))}
        </ul>
        <div className="infoText max-w-[800px] mb-5 md:mb-8 text-xs md:text-sm text-center leading-5 opacity-50 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons flex items-center justify-center gap-3 ">
          {iconsArrayData.map((icon, index) => (
            <span
              key={index}
              className="icon w-12 h-12 flex items-center justify-center cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:text-pink-700 bg-black1 hover:shadow-icons-shadow"
            >
              {icon}
            </span>
          ))}
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
