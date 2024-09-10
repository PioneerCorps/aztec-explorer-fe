import { getTotalTxCount, getTransactions } from "../../api/api";
import { useState, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { TxTable } from "./txTable";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [txCount, setTxCount] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { page, limit, renderPaginationButtons } = usePagination(txCount);
  const transactionsCache = useRef({});

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      const maxPages = Math.ceil(txCount / limit);
      const lastPageItemCount = txCount % limit;
      if (
        transactionsCache.current[page] &&
        (transactionsCache.current[page].length === limit ||
          (page === maxPages &&
            transactionsCache.current[page].length === lastPageItemCount))
      ) {
        setTransactions(transactionsCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getTransactions(page, limit);
        const maxTxCount = await getTotalTxCount();

        setTxCount(maxTxCount?.count);
        setTransactions(data);
        transactionsCache.current[page] = data;
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, limit]);

  useEffect(() => {
    return () => {
      transactionsCache.current = {};
    };
  }, []);

  return (
    <div className="px-[6.5vw] py-[73px]">
      <TxTable transactions={transactions} loading={loading} error={error} />
      {renderPaginationButtons()}
    </div>
  );
};
