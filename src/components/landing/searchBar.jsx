import { useEffect, useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { getSearchResults } from "../../api/api";
import makeBlockie from "ethereum-blockies-base64";
import { Link } from "react-router-dom";
import { LoadingSkeleton } from "../common/loadingSkeleton";

export const SearchBar = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [onceLoaded, setOnceLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (!inputValue) return;

    const debounceTimer = setTimeout(() => {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const searchRes = await getSearchResults(inputValue);
          setSearchResult(searchRes);
          setOnceLoaded(true);
        } catch (err) {
          console.error("Failed to fetch search results:", err);
          setError("Failed to search results. Please try again later.");
        } finally {
          setLoading(false);
          setIsVisible(true); // Show results when search completes
        }
      };

      fetchSearchResults();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSearchResults = () => {
    const isAccount = searchResult?.accounts;
    const isBlocks = searchResult?.blocks;
    const isTransactions = searchResult?.transactions;
    console.log(searchResult);
    const renderResults = (type) => {
      if (!searchResult || searchResult?.[type]?.length === 0) return null;
      const resultTag = searchResult[type];
      const limitResults = resultTag.slice(0, 2);

      const routingList = {
        blocks: "block",
        transactions: "tx",
        accounts: "address",
      };

      return (
        <div className={`flex flex-col gap-3`}>
          <h1 className="text-header text-white text-xs border-b pb-1 border-borderOP ">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h1>
          {limitResults.map((result, index) => {
            return (
              <Link
                to={`/${routingList[type]}/${
                  result?.hash ? result.hash : result.address
                }`}
                key={index}
                className="text-white font-extralight rounded-md text-sm p-2 flex items-center gap-4 cursor-pointer hover:bg-pinkOp"
              >
                <img
                  className="h-8 rounded-full"
                  src={makeBlockie(
                    result.address ? result.address : result.hash
                  )}
                />
                <p>{result.address ? result.address : result.hash}</p>
              </Link>
            );
          })}
        </div>
      );
    };

    return (
      <div
        ref={searchResultsRef}
        className={`absolute top-[44px] h-[300px] w-full bg-bgDark2 bg-opacity-40 border border-pastelPurple rounded-xl p-4 overflow-y-scroll flex flex-col gap-2  backdrop-blur-lg ${
          (!inputValue || !onceLoaded || !isVisible) && "hidden"
        }`}
      >
        {loading ? (
          <LoadingSkeleton itemCount={5} />
        ) : (
          <>
            {renderResults("accounts")}
            {renderResults("blocks")}
            {renderResults("transactions")}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex justify-start relative w-full z-50 shadow-box-shadow-sm dark:shadow-box-shadow-md rounded-xl  ${className}`}
    >
      <div className="input !w-min !px-3 !rounded-r-none !border-r-0 flex items-center justify-center z-20">
        <MdSearch className="h-6 w-6 fill-bgLight1OP" />
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by Address, Tx Hash, Block, Token, Contract, Domain"
        className="relative input !border-l-0 !rounded-l-none tracking-wide z-10 -ml-[1px]"
        onFocus={() => setIsVisible(true)} // Show results when input is focused
      />
      {renderSearchResults()}
    </div>
  );
};
