import { MdSearch } from "react-icons/md";
export const SearchBar = () => {
  return (
    <div className="flex justify-start relative w-full z-50">
      <div className="input !w-min  !px-3 !rounded-r-none !border-r-0 flex items-center justify-center  ">
        <MdSearch className="h-6 w-6 fill-bgLight1OP " />
      </div>
      <input
        placeholder="Search by Address, Tx Hash, Block, Token, Contract, Domain"
        className="relative input !border-l-0 !rounded-l-none  tracking-wide z-10 -ml-[1px] "
      />
    </div>
  );
};
