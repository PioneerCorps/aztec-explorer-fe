import { useEffect, useState, useRef } from "react";
import { getBlocks, getLatestBlockNumber } from "../../api/api";
import { usePagination } from "../../hooks/usePagination";
import { SearchBar } from "../landing/searchBar";
import { BlockTable } from "./blockTable";
export const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [latestBlockNumber, setLatestBlockNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const blocksCache = useRef({});

  const { page, limit, renderPaginationButtons } =
    usePagination(latestBlockNumber);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      setError(null);

      const maxPages = Math.ceil(latestBlockNumber / limit);
      const lastPageItemCount = latestBlockNumber % limit;

      if (
        blocksCache.current[page] &&
        (blocksCache.current[page].length === limit ||
          (page === maxPages &&
            blocksCache.current[page].length === lastPageItemCount))
      ) {
        setBlocks(blocksCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getBlocks(page, limit);
        const latestBlockNum = await getLatestBlockNumber();

        setLatestBlockNumber(latestBlockNum?.count);

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

  useEffect(() => {
    return () => {
      blocksCache.current = {};
    };
  }, []);

  return (
    <>
      <div className="px-[6.5vw] py-[73px] below-lg:py-[40px]">
        <SearchBar className="hidden below-lg:flex" />
        <div className="primary-box below-lg:mt-8">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col w-full gap-2 pb-4">
              <h1 className="headerExa w-full !text-2xl">{`Blocks`}</h1>
              <div className="text-pastelPink font-extralight text-sm">{`${latestBlockNumber} blocks found!`}</div>
            </div>
            <SearchBar className={"below-lg:hidden"} />
          </div>
          <BlockTable blocks={blocks} loading={loading} error={error} />
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};
