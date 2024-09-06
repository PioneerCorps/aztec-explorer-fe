import { SearchBar } from "./searchBar";

export const Main = () => {
  return (
    <div className="h-[60vh] relative">
      <div className="main h-full w-full rounded-tl-[115px] rounded-br-[115px] flex items-end">
        <div className="flex flex-col w-1/2 gap-8 pl-[125px] pb-[8%]">
          <h1 className="relative z-50 headerMega h-[140%] text-nowrap">
            Explore Privacy
          </h1>
          <SearchBar />
        </div>
      </div>
      <div className="h-full w-full radial-grad  absolute left-0 top-0 rounded-tl-[115px] rounded-br-[115px]  border border-pastelPurple"></div>
    </div>
  );
};
