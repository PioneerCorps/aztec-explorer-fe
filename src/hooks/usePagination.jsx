import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pageBounce, setPageBounce] = useState();
  const [limitBounce, setLimitBounce] = useState();
  console.log(page, limit);
  const renderPaginationButtons = () => {
    return (
      <div className="flex  pt-2 w-full justify-between">
        <div className="flex gap-2">
          <div className="bg-pastelPurple outline-2 outline-purpleOp50 outline  flex items-center justify-center text-white px-3 h-8 rounded-lg">
            Show rows :
          </div>
          <input
            placeholder={limit}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d+$/.test(value) && Number(value) > 0) {
                setLimitBounce(value);
              }
            }}
            onBlur={() => setLimit(Number(limitBounce))}
            className="bg-purpleOp50 outline-2 outline-pastelPurple outline  flex items-center justify-center text-white px-3 h-8 rounded-lg w-12"
          ></input>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <div className="bg-pastelPurple outline-2 outline-purpleOp50 outline  flex items-center justify-center text-white px-3 h-8 rounded-lg">
              Go To :
            </div>
            <input
              placeholder={page}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d+$/.test(value) && Number(value) > 0) {
                  setPageBounce(value);
                }
              }}
              onBlur={() => setPage(Number(pageBounce))}
              className="bg-purpleOp50 outline-2 outline-pastelPurple outline  flex items-center justify-center text-white px-3 h-8 rounded-lg w-12"
            ></input>
          </div>
          <div
            onClick={() => setPage(page - 1 <= 0 ? 1 : page - 1)}
            className="bg-pastelPurple outline-2 outline-purpleOp50 outline flex items-center justify-center text-white w-8 h-8 rounded-lg"
          >{`<`}</div>
          <div className="bg-pastelPurple outline-2 outline-purpleOp50 outline flex items-center justify-center text-white w-8 h-8 rounded-lg">{`${page}`}</div>
          <div
            onClick={() => {
              setPage(page + 1);
            }}
            className="bg-pastelPurple outline-2 outline-purpleOp50 outline  flex items-center justify-center text-white w-8 h-8 rounded-lg"
          >{`>`}</div>
        </div>
      </div>
    );
  };

  return { page, limit, renderPaginationButtons };
};
