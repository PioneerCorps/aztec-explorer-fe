import { tx } from "../../mockData/data";
export const AddressTransactionList = () => {
  const renderFields = () => {
    return (
      <div className="flex px-[16px] gap-12 pb-6 font-medium">
        <div className=" w-[20%]">Transaction Hash</div>
        <div className=" w-[7%] ">Method</div>
        <div className=" w-[7.5%]">Block</div>
        <div className=" w-[8%]">Age</div>
        <div className=" w-[20%]">From</div>
        <div className=" w-[20%]">To</div>
        <div className=" w-[7.5%]">Amount</div>
        <div className=" w-[7.5%]">Fee</div>
      </div>
    );
  };

  const renderTransactions = () => {
    const txCards = tx.map((tx) => {
      return (
        <div key={Math.random()} className="card !gap-12 font-light">
          <div className="w-[20%] underline text-pastelPink ">
            {` ${tx.hash.slice(0, 7)}..........${tx.hash.slice(
              tx.hash.length - 9
            )}`}
          </div>
          <div className="w-[7%] button-purple">{tx.method}</div>
          <div className="w-[7.5%]">{tx.block}</div>
          <div className="w-[8%]">{tx.timestamp}</div>
          <div className="w-[20%] underline text-pastelPink">
            {` ${tx.from.slice(0, 7)}..........${tx.from.slice(
              tx.from.length - 9
            )}`}
          </div>
          <div className="w-[20%] underline text-pastelPink">
            {` ${tx.to.slice(0, 7)}..........${tx.to.slice(tx.to.length - 9)}`}
          </div>
          <div className="w-[7.5%]">{tx.value}</div>
          <div className="w-[7.5%]">{tx.fee}</div>
        </div>
      );
    });

    return (
      <div className="flex flex-col w-full gap-4">
        {renderFields()}
        {txCards}
      </div>
    );
  };
  return (
    <div className="w-full">
      {/* <div className="secondary-box">{renderTransactions()}</div> */}

      <div className="secondary-box"> Public tx list</div>
    </div>
  );
};
