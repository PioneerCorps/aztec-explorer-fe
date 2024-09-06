import logo from "../../assets/logo.png";
export const Footer = () => {
  return (
    <div className="bg-bgDark2 flex justify-between w-full py-[65px] px-[125px] ">
      <div className="flex items-center justify-center text-white gap-3">
        <img className=" h-[60px] w-[60px]" src={logo} />
        <div className="headerExa">
          Aztec Explorer
          <div className="text-xs font-thin tracking-wide">PioneerLabs</div>
        </div>
      </div>
      <div className="flex justify-between items-center w-1/2 text-white font-extralight">
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">About Us</h1>
          <p>Contact Us</p>
          <p>Brand Kit</p>
          <p>Bug Report</p>
        </div>
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">Socials</h1>
          <p>Discord</p>
          <p>X</p>
        </div>
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">Services</h1>
          <p>API Documentation</p>
          <p>API Plans</p>
          <p>Guides</p>
        </div>
      </div>
    </div>
  );
};
