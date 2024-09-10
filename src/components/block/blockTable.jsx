import { Link } from "react-router-dom";
import LoadingCard from "../common/loadingCard";
import { timeSince } from "../common/getTimePassed";
export const BlockTable = ({ blocks, loading, error }) => {
  const renderFields = () => {
    return (
      <div className="flex px-[16px] pb-6 font-medium justify-between gap-5 below-lg:text-xs">
        <div className="w-[18%] below-lg:text-center flex items-center">
          Hash
        </div>
        <div className="w-[18%] below-lg:text-center flex items-center">
          Block Number
        </div>
        <div className="w-[18%] below-lg:text-center flex items-center">
          Age
        </div>
        <div className="w-[10%] below-lg:text-center flex items-center">
          Tx Count
        </div>
        <div className="w-[18%] below-lg:text-center flex items-center">
          Fee Recipient
        </div>
        <div className="w-[10%] below-lg:text-center flex items-center">
          Fee
        </div>
      </div>
    );
  };
  const renderBlockList = () => {
    const blockCards = blocks.map((block) => {
      return (
        <div key={Math.random()} className="card font-light !text-xs">
          <Link
            to={`/block/${block.hash}`}
            className="w-[18%] underline text-pastelPink overflow-hidden text-ellipsis"
          >
            {` ${block.hash.slice(0, 7)}..........${block.hash.slice(
              block.hash.length - 9
            )}`}
          </Link>
          <div className="w-[18%]">
            <div className="button-purple w-min px-5 py-2 h-full">
              {block.number}
            </div>
          </div>
          <div className="w-[18%]">{timeSince(block.timestamp)}</div>
          <div className="w-[10%]">{block.txCount}</div>
          <div className="w-[18%] underline text-pastelPink overflow-hidden text-ellipsis">
            {` ${block.feeRecipient.slice(
              0,
              7
            )}..........${block.feeRecipient.slice(
              block.feeRecipient.length - 6
            )}`}
          </div>
          <div className="w-[10%] button-orange !max-w-none ">
            {block.totalFees}
          </div>
        </div>
      );
    });

    return blockCards;
  };
  const errorCard = () => {
    return (
      <div className="primary-box w-full flex items-center justify-center h-[350px]">
        Couldn't fetch blocks. Please try again later
      </div>
    );
  };

  const loadingSkeleton = () => {
    const itemCount = blocks?.length ? blocks.length : 10;

    return (
      <>
        {Array.from({ length: itemCount }, (_, index) => (
          <LoadingCard key={index} className={"h-[48px]"} />
        ))}
      </>
    );
  };
  return (
    <div className="flex flex-col w-full gap-4 secondary-box">
      {renderFields()}
      {error ? (
        errorCard()
      ) : (
        <div className="relative flex flex-col gap-[10px]">
          {loading ? loadingSkeleton() : renderBlockList()}
        </div>
      )}
    </div>
  );
};
