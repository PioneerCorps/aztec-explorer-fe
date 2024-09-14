import { Link } from "react-router-dom";
import { MdOutlineReceiptLong, MdContentCopy } from "react-icons/md";
import { getBlockByNumber, getTransactions } from "../../api/api";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "../common/loadingSkeleton";
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
    if (transactions.length <= 0)
      return (
        <div className="h-full flex flex-col gap-2">
          <LoadingSkeleton itemCount={10} className="!h-[56px]" />
        </div>
      );

    const txCards = transactions.map((tx) => (
      <div
        key={tx.hash}
        className="card below-mobile:flex-col below-mobile:gap-3 below-mobile:py-5 below-mobile:items-start"
      >
        <div className="flex items-center gap-3 below-mobile:w-full below-mobile:border-b below-mobile:border-bgLight1 below-mobile:pb-3 ">
          <MdOutlineReceiptLong className="text-white2 h-7 w-7 min-h-7 min-w-7 below-mobile:hidden" />
          <div className="flex h-full items-end justify-between gap-1 !min-w-[120px]">
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
        <div className="flex items-end justify-between gap-1 !min-w-[105px] below-mobile:w-full below-mobile:border-b below-mobile:border-bgLight1 below-mobile:pb-3 below-lg:justify-normal">
          <div className="flex flex-col">
            <Link
              to={`/block/${blockHashes[tx.blockNumber]}`}
            >{`Block: ${tx.blockNumber}`}</Link>
            <div className="flex items-end justify-between gap-1 !min-w-[120px]">
              <Link
                to={`/block/${blockHashes[tx.blockNumber]}`}
                className="font-thin text-pastelPink underline flex items-center gap-1 text-nowrap "
              >
                {blockHashes[tx.blockNumber] ? (
                  `${blockHashes[tx.blockNumber].slice(
                    0,
                    5
                  )}.......${blockHashes[tx.blockNumber].slice(
                    blockHashes[tx.blockNumber].length - 5
                  )}`
                ) : (
                  <LoadingCard className={`!h-[20px] !w-[100px]`} />
                )}
              </Link>
              <Copy string={blockHashes[tx.blockNumber]} />
            </div>
          </div>
        </div>
        <div className="button-orange  text-nowrap !max-w-none text-xs ">
          {tx.transactionFee} TST
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
    <div className=" h-full w-1/2 below-lg:w-full secondary-box !gap-4">
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
