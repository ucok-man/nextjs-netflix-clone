/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import AccountMenu from "./account-menut";
import MobileMenu from "./mobile-menu";
import NavbarItem from "./navbar-item";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toogleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
    setShowAccountMenu(false);
  }, []);

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const toogleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
    setShowMobileMenu(false);
  }, []);

  const [showBackground, setShowBackground] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition-all duration-500 bg-zinc-900 bg-opacity-90 ${
          showBackground ? "bg-zinc-900 opacity-90" : ""
        }`}
      >
        <img className="h-5 lg:h-7" src="/logo.png" alt="Logo" />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toogleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <div className="text-white text-sm">Browse</div>
          <BsChevronDown
            className={`text-white transition-all duration-300 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 max-sm:gap-4 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition-all">
            <BsSearch className="lg:size-5" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition-all">
            <BsBell className="lg:size-5" />
          </div>
          <div
            onClick={toogleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/default-blue.png" alt="Profiles" />
            </div>
            <BsChevronDown
              className={`text-white transition-all duration-300 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
