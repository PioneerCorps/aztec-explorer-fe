import { useEffect, useState } from "react";
import {
  MdOutlineDarkMode,
  MdOutlineArrowDropDown,
  MdOutlinePersonOutline,
  MdOutlineLocalGasStation,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
export const Header = () => {
  const [type, setType] = useState("main");
  const tabs = ["Network", "Tokens", "Developers", "More"];
  const path = useLocation();
  const pathname = path.pathname.replace(/\//gi, "");
  const renderLandingHeader = () => {
    const header = tabs.map((tab) => {
      return (
        <div key={Math.random()} className="">
          {tab}
        </div>
      );
    });

    return header;
  };

  useEffect(() => {
    if (!pathname) {
      type === "main" ? "" : setType("main");
    }
    //ADD MOBILE HEADER
    else {
      type == "alt" ? "" : setType("alt");
    }
  }, [type, pathname]);

  return (
    <div
      className={` ${
        type == "main"
          ? "absolute top-[30px] h-[5vh]"
          : type == "alt"
          ? "header h-[8vh] py-5"
          : ""
      }  flex justify-between items-center w-full z-50 pl-[125px] text-sm  `}
    >
      <Link to="/">
        <img className=" h-[52px] w-[52px]" src={logo} />
      </Link>
      <div className="w-[50%] h-full bg-pastelPurple flex items-center justify-between text-white font-light px-12  border border-orangeOp rounded-tl-[45px] rounded-br-[45px]">
        <div className="flex gap-8 justify-between w-1/3">
          {renderLandingHeader()}
        </div>
        <div className="flex items-center">
          <MdOutlineLocalGasStation className="mr-1" />
          Gas: 0.4890 AZT
        </div>
      </div>
      <div className="h-full py-2 flex items-center bg-pastelPink  gap-3 px-3 border border-orangeOp rounded-tl-[45px]">
        <div className="button-orange border border-purpleOp50 !rounded-tl-[32px] !rounded-[5px]">
          <MdOutlineDarkMode className=" -mr-1" />
        </div>
        <div className="button-orange border !w-full border-purpleOp50 text-nowrap !rounded-[5px] flex !items-center !justify-center !pl-9 !pr-7 !max-w-none ">
          Aztec Devnet
          <MdOutlineArrowDropDown className="h-4 w-4 text-white mt-[2px]" />
        </div>

        <p className="w-[1px]  bg-pastelPurple opacity-50"></p>
        <div className="button-orange border border-purpleOp50 !rounded-[8px] w-[47px] !p-2">
          <MdOutlinePersonOutline className=" !p-0" />
        </div>
      </div>
    </div>
  );
};
