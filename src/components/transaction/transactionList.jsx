import { getTotalTxCount, getTransactions } from "../../api/api";
import { useState, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { TxTable } from "./txTable";
import { SearchBar } from "../landing/searchBar";
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
    <div className="px-[6.5vw] py-[73px] below-lg:py-[40px]">
      <SearchBar className="hidden below-lg:flex" />
      <div className="primary-box below-lg:mt-8">
        <div className="flex justify-between items-center pb-4">
          <div className="w-full">
            <h1 className=" headerExa w-full !text-2xl">Transactions</h1>
            <div className="text-pastelPink font-extralight text-sm">{`${txCount} Transactions found!`}</div>
          </div>
          <SearchBar className={"below-lg:hidden"} />
        </div>
        <TxTable transactions={transactions} loading={loading} error={error} />
        {renderPaginationButtons()}
      </div>
    </div>
  );
};
