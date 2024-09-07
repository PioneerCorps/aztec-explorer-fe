import { Link } from "react-router-dom";
import { MdOutlineReceiptLong, MdContentCopy } from "react-icons/md";
import { getBlockByNumber, getTransactions } from "../../api/api";
import { useState, useEffect } from "react";
import LoadingCard from "../common/loadingCard";
import { Copy } from "../common/copyToClipboard";
export const LatestTx = () => {
  const [transactions, setTransactions] = useState([]);
  const [blockHashes, setBlockHashes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBlockHash = async (blockNum) => {
    if (blockHashes[blockNum]) return; // Skip if already fetched
    try {
      const block = await getBlockByNumber(blockNum);
      const hash = block.hash;
      setBlockHashes((prevHashes) => ({
        ...prevHashes,
        [blockNum]: hash,
      }));
    } catch (error) {
      console.error(`Failed to fetch block hash for block ${blockNum}:`, error);
    }
  };

  const latestTxList = () => {
    if (transactions.length <= 0) return <LoadingCard />;

    const txCards = transactions.map((tx) => (
      <div key={tx.hash} className="card">
        <div className="flex items-center gap-6 w-1/3">
          <MdOutlineReceiptLong className="text-white2 h-8 w-8 min-h-8 min-w-8" />
          <div className="flex h-full gap-1 items-end">
            <Link to={`/tx/${tx.hash}`} className="flex flex-col">
              <div>Hash</div>
              <div className="font-thin text-pastelPink underline flex items-center gap-1">
                {` ${tx.hash.slice(0, 6)}.......${tx.hash.slice(
                  tx.hash.length - 4
                )}`}
              </div>
            </Link>
            <Copy string={tx.hash} />
          </div>
        </div>
        <div className="flex flex-col font-light w-1/3">
          <div className="flex flex-col">
            <Link
              to={`/block/${blockHashes[tx.blockNumber]}`}
            >{`Block: ${tx.blockNumber}`}</Link>
            <div className="flex gap-1 items-end">
              <Link
                to={`/block/${blockHashes[tx.blockNumber]}`}
                className="font-thin text-pastelPink underline flex items-center gap-1"
              >
                {blockHashes[tx.blockNumber]
                  ? `${blockHashes[tx.blockNumber].slice(
                      0,
                      5
                    )}.............${blockHashes[tx.blockNumber].slice(
                      blockHashes[tx.blockNumber].length - 5
                    )}`
                  : "Loading block hash..."}
              </Link>
              <Copy string={blockHashes[tx.blockNumber]} />
            </div>
          </div>
        </div>
        <div className="button-orange  text-nowrap !max-w-none text-xs ">
          {tx.transactionFee} AZT
        </div>
      </div>
    ));

    return <div className="h-full gap-2 flex flex-col w-full">{txCards}</div>;
  };

  // Fetch transactions and then fetch block hashes
  useEffect(() => {
    const fetchLastTenTx = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTransactions(1, 10);
        console.log(data);
        setTransactions(data);

        // Fetch block hashes for the fetched transactions
        data.forEach((tx) => {
          getBlockHash(tx.blockNumber);
        });
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastTenTx();
  }, []);

  return (
    <div className=" h-full w-1/2 secondary-box !gap-4">
      <h1 className="headerExa pb-3 pl-[15px]">Latest Transactions</h1>

      {latestTxList()}
      <Link
        to={`/transactions`}
        className=" w-full !h-min !py-4 flex items-center justify-center secondary-box text-sm font-light"
      >
        View All Transactions
      </Link>
    </div>
  );
};
