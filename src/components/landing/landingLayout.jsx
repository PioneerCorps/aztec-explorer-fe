import { LatestBlocks } from "./latestBlocks";
import { LatestTx } from "./latestTx";
import { Main } from "./main";

export const Landing = () => {
  return (
    <div className="relative w-screen ">
      <div className="flex flex-col w-full  ">
        <Main />
        <div className="flex  gap-11 py-[44px] px-[125px] w-full">
          <LatestBlocks />
          <LatestTx />
        </div>
      </div>
    </div>
  );
};
