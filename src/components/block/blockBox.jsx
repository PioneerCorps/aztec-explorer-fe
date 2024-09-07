import { SearchBar } from "../landing/searchBar";
import { Link, useParams } from "react-router-dom";

import { getBlockByHash, getTransactionsByBlockNumber } from "../../api/api";
import { useEffect, useState } from "react";
import { formatDate, timeSince } from "../common/getTimePassed";
import { TxTable } from "../transaction/txTable";
export const BlockBox = () => {
  const [block, setBlock] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { hash } = useParams();

  const fieldLabels = {
    number: "Block Number",
    hash: "Block Hash",
    timestamp: "Timestamp",
    txCount: "Transaction Count",
    feeRecipient: "Fee Recipient",
    coinbaseAccount: "Coinbase Account",
    totalFees: "Total Fees",
  };

  const renderBlockInfo = () => {
    if (!hash)
      // Return not found
      return (
        <div className="h-full flex justify-center items-center">
          Block Not Found :(
        </div>
      );

    const infoFields = Object.keys(fieldLabels).map((field) => {
      return (
        <div className=" flex gap-24 justify-between text-sm ">
          <div className="min-w-[250px] font-light text-nowrap">
            {fieldLabels[field]}:
          </div>
          <div className="w-full overflow-hidden text-ellipsis font-extralight">
            {field == "timestamp"
              ? `${timeSince(block[field])} (${formatDate(block[field])})`
              : block[field]}
          </div>
        </div>
      );
    });

    return (
      <div className="flex flex-col">
        <div className="secondary-box !gap-8">{infoFields}</div>
      </div>
    );
  };

  useEffect(() => {
    if (!hash) return;
    const fetchBlock = async () => {
      setLoading(true);
      setError(null);
      try {
        const blockInfo = await getBlockByHash(hash);
        const transactions = await getTransactionsByBlockNumber(
          blockInfo.number
        );

        setBlock(blockInfo);
        setTransactions(transactions);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, []);

  return (
    <div className="primary-box">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full gap-2 pb-4">
          <h1 className="headerExa w-full !text-2xl">{`Block #${block.number}`}</h1>
          <div className="text-pastelPink font-extralight text-sm">{`${block.txCount} Transactions found`}</div>
        </div>
        <SearchBar />
      </div>
      {renderBlockInfo()}
      <TxTable transactions={transactions} loading={loading} error={error} />
    </div>
  );
};
