import { Link } from "react-router-dom";
import { MdOutlineReceiptLong, MdContentCopy } from "react-icons/md";
import { ReactComponent as BlockIcon } from "../../assets/blockIcon.svg";
import { useEffect, useState } from "react";
import { getBlocks } from "../../api/api";
import { timeSince } from "../common/getTimePassed";
import LoadingCard from "../common/loadingCard";

export const LatestBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch the last 10 blocks
  useEffect(() => {
    const fetchLastTenBlocks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlocks(1, 10);

        setBlocks(data);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastTenBlocks();
  }, []);

  const blockData = () => {
    if (blocks.length <= 0) return <LoadingCard />;
    const blockCards = blocks.map((block) => {
      return (
        <div key={block.hash} className="card">
          <Link
            to={`/block/${block.hash}`}
            className="flex items-center gap-6 w-1/3"
          >
            <BlockIcon
              className="text-white1 h-8 w-8 min-w-8 min-h-8
            "
            />
            <div className="flex flex-col">
              <div>{block.number}</div>
              <div className="font-thin  underline flex items-center gap-1 text-pastelPink">
                {` ${block.hash.slice(0, 6)}.......${block.hash.slice(
                  block.hash.length - 4
                )}`}
                <MdContentCopy className="text-white mt-[1px]" />
              </div>
            </div>
          </Link>
          <div className="flex flex-col font-light w-1/3">
            <div className="flex gap-1 ">Builder:</div>
            <div className="flex gap-1 ">
              <Link
                to={`/address/${block.feeRecipient}`}
                className="font-thin text-pastelPink underline flex items-center gap-1"
              >{` ${block.feeRecipient.slice(
                0,
                5
              )}.......${block.feeRecipient.slice(
                block.feeRecipient.length - 5
              )}`}</Link>
            </div>
          </div>
          <div className="button-orange text-xs min-w-[115px]">
            {timeSince(block.timestamp)} ago
          </div>
        </div>
      );
    });

    return (
      <div className="h-full gap-2 flex flex-col w-full">{blockCards}</div>
    );
  };
  return (
    <div className=" h-full primary-box w-1/2 !gap-4">
      <h1 className="headerExa pb-3 pl-[15px]">Latest Blocks</h1>
      {blockData()}
      <Link
        to={`/blocks`}
        className=" w-full !h-min !py-4 flex items-center justify-center secondary-box text-sm font-light "
      >
        View All Blocks
      </Link>
    </div>
  );
};
