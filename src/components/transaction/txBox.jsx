import { SearchBar } from "../landing/searchBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlockByNumber, getTransactionByHash } from "../../api/api";

export const TxBox = () => {
  const { hash } = useParams();

  const [block, setBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fieldLabels = {
    blockNumber: "Included in Block",
    hash: "Transaction Hash",
    index: "Index",
    transactionFee: "Transaction Fee",
    noteHashes: "Note Hashes",
    unencryptedLogs: "Unencrypted Logs",
    l2ToL1Msgs: "L2 to L1 Messages",
    publicDataWrites: "Public Data Writes",
    nullifiers: "Nullifiers",
  };

  useEffect(() => {
    if (!hash) return;
    const fetchTx = async () => {
      setLoading(true);
      setError(null);
      try {
        const tx = await getTransactionByHash(hash);
        const block = await getBlockByNumber(tx.blockNumber);
        setBlock(block);
        setTransaction(tx);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, [hash]);
  console.log(transaction);
  const renderTransactionInfo = () => {
    if (!hash)
      return (
        <div className="h-full flex justify-center items-center">
          Transaction Not Found :(
        </div>
      );

    const infoFields = Object.keys(fieldLabels).map((field) => {
      if (field === "nullifiers") {
        const nullifiersValue = transaction.nullifiers
          ? transaction.nullifiers.split(",").join("\n")
          : "";

        return (
          <div className="flex gap-24 justify-between text-sm" key={field}>
            <div className="min-w-[250px] font-light text-nowrap text-white1">
              {fieldLabels[field]}:
            </div>
            <div className="w-full">
              <textarea
                className="w-[70%] h-32 p-3 font-light  border border-bgLight1 bg-bgLight1OP rounded-lg resize-none leading-7 text-white1 font-monospace "
                value={nullifiersValue}
                readOnly
              />
            </div>
          </div>
        );
      }

      if (field === "publicDataWrites") {
        return (
          <div className="flex gap-24 justify-between text-sm" key={field}>
            <div className="min-w-[250px] font-light text-nowrap text-white1">
              {fieldLabels[field]}:
            </div>
            <div className="w-full">
              <textarea
                className="w-[70%] h-32 p-3 font-light  border border-bgLight1 bg-bgLight1OP rounded-lg resize-none leading-7 text-white1 font-monospace "
                value={transaction[field]}
                readOnly
              />
            </div>
          </div>
        );
      }
      return (
        <div className="flex gap-24 justify-between text-sm" key={field}>
          <div className="min-w-[250px] font-light text-nowrap text-white1">
            {fieldLabels[field]}:
          </div>
          <div className="w-full overflow-hidden text-ellipsis font-extralight">
            {transaction[field]}
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

  return (
    <div className="primary-box">
      <div className="flex justify-between items-center">
        <h1 className="headerExa w-full">Transaction Detail</h1>

        <SearchBar />
      </div>
      {renderTransactionInfo()}
    </div>
  );
};
