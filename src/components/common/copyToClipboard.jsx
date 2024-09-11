import { MdContentCopy } from "react-icons/md";

export const Copy = ({ string, className = "" }) => {
  const handleCopy = () => {
    if (navigator.clipboard && string) {
      navigator.clipboard
        .writeText(string)
        .then(() => {
          console.log("Copied to clipboard:", string);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <MdContentCopy
      onClick={handleCopy}
      className={`h-[14px] w-[14px] min-w-[14px] min-h-[14px] text-white1 mb-[2px] cursor-pointer ${className}`}
    />
  );
};
