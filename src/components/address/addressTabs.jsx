import { useState, useRef, useEffect } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useInteractContract } from "../../hooks/useInteractContract";

export const AddressTabs = ({ tab, addressInfo }) => {
  const [view, setView] = useState("hex");
  const [openedIndexes, setOpenedIndexes] = useState([]);
  const contentRefs = useRef([]);
  const { readContract } = useInteractContract(addressInfo);
  useEffect(() => {
    if (!tab || !addressInfo?.functions) return;
    contentRefs.current = contentRefs.current.slice(
      0,
      addressInfo.functions.length
    );
  }, [addressInfo?.functions?.length]);

  const renderByteCode = () => {
    if (!addressInfo.byteCode) return null;
    const prepBytecodeString = () => {
      const byteCode = addressInfo?.byteCode;

      const hexByteCode =
        "0x" + Buffer.from(byteCode, "binary").toString("hex");

      const base64ByteCode = Buffer.from(byteCode, "binary").toString("base64");

      const binaryByteCode = [...Buffer.from(byteCode, "binary")]
        .map((byte) => byte.toString(2).padStart(8, "0"))
        .join(" ");

      if (view === "hex") {
        return hexByteCode;
      } else if (view === "base64") {
        return base64ByteCode;
      } else if (view === "binary") {
        return binaryByteCode;
      }
    };

    return (
      <>
        <select
          id="view-selector"
          className="w-[15%] text-xs font-light px-2 py-1 border border-bgLight1 bg-bgLight1OP rounded-lg"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="hex">Hexadecimal</option>
          <option value="base64">Base64</option>
          <option value="binary">Binary</option>
        </select>
        <textarea
          className="w-full h-64 p-3 font-light border border-bgLight1 bg-bgLight1OP rounded-lg resize-y leading-7 text-dark font-monospace focus:outline-none below-lg:w-full"
          value={prepBytecodeString()}
          readOnly
        />
      </>
    );
  };

  const renderFunctions = (tab) => {
    if (addressInfo?.functions?.length === 0 || !addressInfo?.functions)
      return null;

    let count = 0;

    const functionCards = addressInfo.functions.map((func, index) => {
      if (
        (tab === "read" && func.isStatic) ||
        (tab === "write" && !func.isStatic)
      ) {
        count++;
        const isOpen = openedIndexes.includes(index);

        const toggleCard = () => {
          setOpenedIndexes((prevIndexes) => {
            if (isOpen) {
              return prevIndexes.filter((i) => i !== index);
            } else {
              return [...prevIndexes, index];
            }
          });
        };

        return (
          <div
            key={func.name}
            onClick={toggleCard}
            className="card !gap-0 !flex-col !items-start !rounded-lg font-light cursor-pointer hover:brightness-110 duration-300 !py-4 "
          >
            <div
              className={`flex w-full justify-between items-center border-b duration-300 ${
                !isOpen && "!border-transparent !pb-0"
              } border-bgLight1 pb-2`}
            >
              <div className="flex text-xs items-center gap-3">
                <p>{`${count}. ${func.name}`}</p>
                <p className="text-greenOp">[{func.functionType}]</p>
              </div>
              <span>
                {isOpen ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </span>
            </div>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden w-full"
              style={{
                height: isOpen
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
              }}
            >
              {func?.parameters &&
                func.parameters.map((parameter) => {
                  return (
                    <div
                      key={parameter.name}
                      className="flex flex-col text-xs gap-1 w-full pt-5"
                    >
                      <div className="font-extralight pl-1 flex gap-2 ">
                        {parameter.name}
                        <span
                          className={`${
                            parameter.visibility === "private" &&
                            "!text-pastelOrange"
                          } text-pastelGreen text-[10px]`}
                        >
                          {parameter.visibility}
                        </span>
                      </div>
                      <input
                        placeholder={`[${Object.values(parameter.type)
                          .toString()
                          .replaceAll(",", "]  [")}]`}
                        className="input !bg-bgLight1 !text-white"
                      />
                    </div>
                  );
                })}
              <button
                onClick={async () => {
                  await readContract();
                }}
                className="bg-red-400 w-min"
              >
                Read
              </button>
            </div>
          </div>
        );
      }
    });

    return functionCards;
  };

  return (
    <div className="secondary-box !w-full ">
      {tab == "bytecode" ? renderByteCode() : renderFunctions(tab)}
    </div>
  );
};
