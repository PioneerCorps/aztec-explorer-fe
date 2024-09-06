import { getTransactions } from "../../api/api";
import { useState, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { page, limit, renderPaginationButtons } = usePagination();

  // Cache to store transactions for each page
  const transactionsCache = useRef({});

  const renderFields = () => {
    return (
      <div className="flex px-[16px] pb-6 font-medium justify-between gap-5">
        <div className="w-[18%]">Hash</div>
        <div className="w-[18%]">Block</div>
        <div className="w-[18%]">Age</div>
        <div className="w-[10%]">Tx Count</div>
        <div className="w-[18%]">Fee Recipient</div>
        <div className="w-[10%]">Fee</div>
      </div>
    );
  };

  const renderTxList = () => {
    const txCards = transactions.map((tx) => {
      return (
        <div key={Math.random()} className="card font-light">
          <div className="w-[18%] underline text-pastelPink">
            {` ${tx.hash.slice(0, 7)}..........${tx.hash.slice(
              tx.hash.length - 9
            )}`}
          </div>
          <div className="w-[18%]">
            <div className="button-purple w-min px-5 py-2 h-full">
              {tx.blockNumber}
            </div>
          </div>
          <div className="w-[18%]">timestamp</div>
          <div className="w-[10%]">count</div>
          <div className="w-[18%] underline text-pastelPink">TX VALUE</div>
          <div className="w-[10%] button-orange !max-w-none">
            {tx.transactionFee}
          </div>
        </div>
      );
    });

    useEffect(() => {
      const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        // Check if the data for the current page exists in the cache
        if (transactionsCache.current[page]) {
          setTransactions(transactionsCache.current[page]);
          setLoading(false);
          return;
        }

        try {
          const data = await getTransactions(page, limit);
          console.log(data);

          // Update state and cache the result for the current page
          setTransactions(data);
          transactionsCache.current[page] = data;
        } catch (err) {
          console.error("Failed to fetch blocks:", err);
          setError("Failed to fetch blocks. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }, [page, limit]);

    // Cleanup function to clear cache when component unmounts
    useEffect(() => {
      return () => {
        transactionsCache.current = {}; // Clear cache on unmount
      };
    }, []);

    return (
      <div className="flex flex-col w-full gap-4 secondary-box">
        {renderFields()}
        {txCards}
        {renderPaginationButtons()}
      </div>
    );
  };

  return (
    <div className="px-[82px] py-[73px]">
      <div>{renderTxList()}</div>
    </div>
  );
};
