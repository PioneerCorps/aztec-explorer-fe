import { useEffect, useState, useRef } from "react";
import { getBlocks } from "../../api/api";
import { usePagination } from "../../hooks/usePagination";
import { Link } from "react-router-dom";

export const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { page, limit, renderPaginationButtons } = usePagination();

  // Cache to store blocks for each page
  const blocksCache = useRef({});

  const renderFields = () => {
    return (
      <div className="flex px-[16px] pb-6 font-medium justify-between gap-5">
        <div className="w-[18%]">Block Number</div>
        <div className="w-[18%]">Hash</div>
        <div className="w-[18%]">Age</div>
        <div className="w-[10%]">Tx Count</div>
        <div className="w-[18%]">Fee Recipient</div>
        <div className="w-[10%]">Fee</div>
      </div>
    );
  };

  const renderBlockList = () => {
    const blockCards = blocks.map((block) => {
      return (
        <div key={Math.random()} className="card font-light">
          <div className="w-[18%]">
            <div className="button-purple w-min px-5 py-2 h-full">
              {block.number}
            </div>
          </div>
          <Link
            to={`/block/${block.hash}`}
            className="w-[18%] underline text-pastelPink"
          >
            {` ${block.hash.slice(0, 7)}..........${block.hash.slice(
              block.hash.length - 9
            )}`}
          </Link>
          <div className="w-[18%]">{block.timestamp}</div>
          <div className="w-[10%]">{block.txCount}</div>
          <div className="w-[18%] underline text-pastelPink">
            {` ${block.feeRecipient.slice(
              0,
              7
            )}..........${block.feeRecipient.slice(
              block.feeRecipient.length - 9
            )}`}
          </div>
          <div className="w-[10%] button-orange !max-w-none">
            {block.totalFees}
          </div>
        </div>
      );
    });

    useEffect(() => {
      const fetchBlocks = async () => {
        setLoading(true);
        setError(null);

        // Check if the data for the current page exists in the cache
        if (blocksCache.current[page]) {
          setBlocks(blocksCache.current[page]);
          setLoading(false);
          return;
        }

        try {
          console.log(page, limit);
          const data = await getBlocks(page, limit);
          console.log(data);
          // Update state and cache the result for the current page
          setBlocks(data);
          blocksCache.current[page] = data;
        } catch (err) {
          console.error("Failed to fetch blocks:", err);
          setError("Failed to fetch blocks. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchBlocks();
    }, [page, limit]);

    // Cleanup function to clear cache when component unmounts
    useEffect(() => {
      return () => {
        blocksCache.current = {}; // Clear cache on unmount
      };
    }, []);

    return (
      <div className="flex flex-col w-full gap-4 secondary-box">
        {renderFields()}
        {blockCards}
        {renderPaginationButtons()}
      </div>
    );
  };

  return (
    <div className="px-[82px] py-[73px]">
      <div>{renderBlockList()}</div>
    </div>
  );
};
