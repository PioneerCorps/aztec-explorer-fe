import { Link } from "react-router-dom";
import LoadingCard from "../common/loadingCard";
import { timeSince } from "../common/getTimePassed";
import { Copy } from "../common/copyToClipboard";

export const TxTable = ({
  transactions,
  loading,
  error,
  loaderLength = 10,
}) => {
  const renderFields = () => (
    <div className="flex px-[16px] pb-2 font-medium justify-between gap-5 text-sm below-lg:text-xs ">
      <div className="w-[22%] elow-lg:text-center flex items-center">Hash</div>
      <div className="w-[10%] elow-lg:text-center flex items-center">Block</div>
      <div className="w-[18%] elow-lg:text-center flex items-center">Age</div>
      <div className="w-[10%] elow-lg:text-center flex items-center">Index</div>
      <div className="w-[22%] elow-lg:text-center flex items-center">
        Nullifier
      </div>
      <div className="w-[10%] elow-lg:text-center flex items-center">Fee</div>
    </div>
  );

  const renderTxList = () =>
    transactions.map((tx) => (
      <div key={Math.random()} className="card font-light !text-xs">
        <Link
          to={`/tx/${tx.hash}`}
          className="w-[22%] underline text-pastelPink flex gap-1 overflow-hidden text-ellipsis"
        >
          {` ${tx.hash.slice(0, 7)}..........${tx.hash.slice(
            tx.hash.length - 9
          )}`}
          <Copy string={tx.hash} />
        </Link>

        <div className="w-[10%]">
          <div className="button-purple w-min px-5 py-2 h-full">
            {tx.blockNumber}
          </div>
        </div>
        <div className="w-[18%]">{`${timeSince(tx.timestamp)}`}</div>
        <div className="w-[10%]">{tx.index}</div>
        <div className="w-[22%] underline text-pastelPink overflow-hidden text-ellipsis">
          {` ${tx.hash.slice(0, 5)}..........${tx.hash.slice(
            tx.hash.length - 7
          )}`}
        </div>
        <div className="w-[10%] button-orange !max-w-none">
          {tx.transactionFee}
        </div>
      </div>
    ));

  const errorCard = () => {
    return (
      <div className="primary-box w-full flex items-center justify-center h-[350px]">
        Couldn't fetch transactions. Please try again later
      </div>
    );
  };

  const loadingSkeleton = () => {
    const itemCount = transactions?.length ? transactions.length : loaderLength;

    return (
      <>
        {Array.from({ length: itemCount }, (_, index) => (
          <LoadingCard key={index} className={"h-[48px]"} />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full  secondary-box ">
      {renderFields()}

      {error ? (
        errorCard()
      ) : (
        <div className="relative flex flex-col gap-[10px]">
          {loading ? loadingSkeleton() : renderTxList()}
        </div>
      )}
    </div>
  );
};
