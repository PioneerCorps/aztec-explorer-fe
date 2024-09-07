import { useEffect, useState, useRef } from "react";
import { getBlocks } from "../../api/api";
import { usePagination } from "../../hooks/usePagination";

import { BlockTable } from "./blockTable";
export const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const blocksCache = useRef({});

  const { page, limit, renderPaginationButtons } = usePagination();

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      setError(null);

      // Check if the data for the current page exists in the cache

      if (
        blocksCache.current[page] &&
        blocksCache.current[page].length == limit
      ) {
        setBlocks(blocksCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getBlocks(page, limit);

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
    <div className="px-[82px] py-[73px]">
      <BlockTable blocks={blocks} loading={loading} error={error} />
      {renderPaginationButtons()}
    </div>
  );
};
