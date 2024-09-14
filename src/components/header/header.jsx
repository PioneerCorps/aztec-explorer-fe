import { useEffect, useState, useRef } from "react";
import React from "react";
import {
  MdOutlineDarkMode,
  MdOutlineArrowDropDown,
  MdOutlinePersonOutline,
  MdOutlineLocalGasStation,
  MdMenu,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.webp";
export const Header = () => {
  const [type, setType] = useState("main");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const sideBarRef = useRef(null);
  const tabs = ["Network", "Tokens", "Developers", "More"];
  const path = useLocation();
  const pathname = path.pathname.replace(/\//gi, "");
  const renderLandingHeader = () => {
    const header = tabs.map((tab) => {
      return (
        <div key={Math.random()} className="cursor-pointer">
          {tab}
        </div>
      );
    });

    return header;
  };

  useEffect(() => {
    if (!pathname) {
      type === "main" ? "" : setType("main");
    } else {
      type == "alt" ? "" : setType("alt");
    }
  }, [type, pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const mobileHeader = () => {
    return (
      <div
        className={`
          ${type == "main" && "absolute"}
          ${type == "alt" && "header"}
           h-[100px] py-5 flex justify-between items-center w-full z-50  text-sm px-[6.5vw]`}
      >
        <Link to="/">
          <img
            className=" h-[52px] w-[52px]  min-h-[52px] min-w-[52px]"
            src={logo}
          />
        </Link>
        <div className="cursor-pointer">
          <MdMenu
            onClick={() => setIsPanelOpen(true)}
            className="w-12 h-12 min-w-12 min-h-12 text-white "
          />
        </div>
      </div>
    );
  };

  const mobileSidePanel = () => {
    return (
      <div
        ref={sideBarRef}
        className={`
          ${!isPanelOpen && "!translate-x-full"} 
          fixed top-0 right-0  bg-bgDark2 w-[60%] h-full z-[100] px-5 py-10 flex flex-col justify-between duration-300`}
      >
        <div className="flex flex-col gap-7 text-xl text-white cursor-pointer">
          <div className=" border-b pb-3 border-bgLight1">Network</div>
          <div className=" border-b pb-3 border-bgLight1">Tokens</div>
          <div className=" border-b pb-3 border-bgLight1">Developers</div>
          <div className=" border-b pb-3 border-bgLight1">More</div>
        </div>
        <div className="flex gap-2">
          <div className="button-orange border border-purpleOp50 !rounded-[8px] w-full !p-2">
            <MdOutlinePersonOutline className=" !p-0 min-w-4 min-h-4 w-4 h-4" />
            Profile
          </div>
          <div className="button-orange border border-purpleOp50 flex items-center">
            <MdOutlineDarkMode className="  min-w-4 min-h-4 w-4 h-4" />
          </div>
        </div>
      </div>
    );
  };

  const desktopHeader = () => {
    return (
      <div
        className={` 
        ${type == "main" && "top-[30px] h-[60px] absolute"}
        ${type == "alt" && "header h-[100px] py-5"}
        flex justify-between items-center w-full z-50  text-sm pl-[6.5vw]`}
      >
        <Link className="w-1/3" to="/">
          <img
            className=" h-[52px] w-[52px]  min-h-[52px] min-w-[52px]"
            src={logo}
          />
        </Link>
        <div className="w-[50%] min-w-max h-full bg-pastelPurple flex items-center justify-between text-white font-light px-12  border border-orangeOp rounded-tl-[45px] rounded-br-[45px]">
          <div className="flex gap-8 justify-around w-full max-w-[600px] ">
            {renderLandingHeader()}
          </div>
          <div className="flex items-center"></div>
        </div>
        <div className=" w-1/3 flex justify-end items-center h-full">
          <div className=" h-full py-2 flex items-center bg-pastelPink  gap-2 px-3 border border-orangeOp rounded-tl-[45px]">
            <div className="button-orange border border-purpleOp50 !rounded-tl-[32px] !rounded-[5px]">
              <MdOutlineDarkMode className=" -mr-2 mt-[1px] min-w-4 min-h-4 w-4 h-4" />
            </div>
            <div className="button-orange border !w-full border-purpleOp50 text-nowrap  !rounded-[5px] flex !items-center !justify-center !pl-6 !pr-4 !max-w-none below-lg:hidden ">
              Aztec Devnet
              <MdOutlineArrowDropDown className="h-4 w-4 text-white mt-[2px]" />
            </div>

            <div className="button-orange border border-purpleOp50 !rounded-[8px] w-[42px] !p-2">
              <MdOutlinePersonOutline className=" !p-0 min-w-4 min-h-4 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="hidden below-mobile:block">{mobileHeader()}</div>
      <div className="below-mobile:hidden">{desktopHeader()}</div>
      {mobileSidePanel()}
    </>
  );
};
