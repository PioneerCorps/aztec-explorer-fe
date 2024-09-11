import { SearchBar } from "./searchBar";
import { Header } from "../header/header";

export const Main = () => {
  return (
    <div className="h-[55vh] relative">
      <div className="main h-full w-full rounded-tl-[115px] below-mobile:rounded-tl-none rounded-br-[115px] flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col h-full items-center  w-full  gap-[25%] pt-[40px] pl-[6.5vw] justify-center">
          <div className="flex flex-col items-center justify-center gap-5 w-[70vw] max-w-[850px]">
            <h1 className="relative z-50 headerMega  text-nowrap text-shadow below-lg:!text-5xl below-mobile:!text-3xl">
              Explore Privacy
            </h1>
            <SearchBar />
          </div>
        </div>

        {/* <div className="w-[87vw] pb-8 h-full z-50">
          <div className="h-full primary-box !bg-opacity-80 backdrop-blur-sm rounded-lg !rounded-br-[100px]">
            dsads
          </div>
        </div> */}
      </div>
      <div className="h-full w-full radial-grad  absolute left-0 top-0 rounded-tl-[115px] below-mobile:rounded-tl-none rounded-br-[115px]  border border-pastelPurple"></div>
    </div>
  );
};
