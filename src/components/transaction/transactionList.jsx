import { getTransactions } from "../../api/api";
import { useState, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { TxTable } from "./txTable";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxPages, setMaxPages] = useState();

  const { page, limit, renderPaginationButtons } = usePagination();
  const transactionsCache = useRef({});

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      if (
        transactionsCache.current[page] &&
        transactionsCache.current[page].length == limit
      ) {
        setTransactions(transactionsCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getTransactions(page, limit);

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
    <div className="px-[82px] py-[73px]">
      <TxTable transactions={transactions} loading={loading} error={error} />
      {renderPaginationButtons()}
    </div>
  );
};
