import { useEffect, useState, useRef } from "react";
import { getBlocks, getLatestBlockNumber } from "../../api/api";
import { usePagination } from "../../hooks/usePagination";

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
    <div className="px-[6.5vw] py-[73px]">
      <BlockTable blocks={blocks} loading={loading} error={error} />
      {renderPaginationButtons()}
    </div>
  );
};
