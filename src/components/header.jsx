import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./search-input";
import logo from "../assets/images/movix-logo.svg";

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";
import ContentWrapper from "./content-wrapper";

function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navigatorMethod = (param) => {
    navigate(`/explore/${param}`);
  };

  const menuItems = [
    {
      label: "Movies",
      method() {
        setMobileMenu(false);
        navigatorMethod("movies");
      },
    },
    {
      label: "Tv Shows",
      method() {
        setMobileMenu(false);
        navigatorMethod("tv");
      },
    },
    {
      label: <HiOutlineSearch />,
      method() {
        openSearch();
      },
    },
  ];

  // method to calculate the scroll value
  const scrollNavbar = () => {
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavbar);
    return () => window.removeEventListener("scroll", scrollNavbar);
  }, []);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  const clearSearch = (props) => {
    const { setQuery } = props;
    setQuery("");
  };

  return (
    <header
      className={`w-full h-15 flex items-center translate-y-0 transition-all duration-500 ease-in-out fixed z-10 ${
        lastScrollY > 150 ? "bg-black3" : "bg-[#00000050]"
      } ${
        mobileMenu ? "bg-black3 md:bg-[#00000050]" : "bg-[#00000050]"
      }  sm:backdrop-opacity-30`}
    >
      <ContentWrapper classes="items-center justify-between">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="h-50px" />
        </div>

        <ul
          className={`w-full sm:w-fit ${
            mobileMenu ? "flex" : "hidden"
          }  sm:flex flex-col sm:flex-row px-5 sm:px-0 items-center  absolute sm:static top-15 left-0 border-t sm:border-none border-solid border-[#ffffff1a] animate-mobileMenu sm:animate-none list-none bg-black3 sm:bg-inherit`}
        >
          {menuItems.map((data, index) => (
            <li
              key={index}
              className=" w-full sm:max-w-fit h-auto sm:h-15 flex last:hidden sm:last:flex items-start sm:items-center relative m-0 sm:mx-4 px-4 py-5 sm:p-0 text-lg sm:text-base text-white font-medium cursor-pointer hover:text-pink-700"
              onClick={data.method}
            >
              {data.label}
            </li>
          ))}
        </ul>

        <div className="mobile-menu flex sm:hidden items-center justify-center gap-5">
          {/* for search icon  */}

          {showSearch ? (
            <VscChromeClose
              className="fill-white cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <HiOutlineSearch
              className=" stroke-white cursor-pointer"
              onClick={openSearch}
            />
          )}

          {/* for hamburger icon */}
          {mobileMenu ? (
            <VscChromeClose
              className="fill-white cursor-pointer"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <SlMenu
              className=" fill-white cursor-pointer"
              onClick={openMobileMenu}
            />
          )}
        </div>

        {showSearch && (
          <div className="flex w-full absolute top-15 left-0 animate-mobileMenu bg-white">
            <ContentWrapper>
              <SearchInput
                btnValue={
                  <AiFillDelete className="fill-black cursor-pointer" />
                }
                btnClass="flex items-center justify-center"
                btnMethod={(e) => clearSearch(e)}
                setShowSearch={setShowSearch}
              />
            </ContentWrapper>
          </div>
        )}
      </ContentWrapper>
    </header>
  );
}

export default Header;
