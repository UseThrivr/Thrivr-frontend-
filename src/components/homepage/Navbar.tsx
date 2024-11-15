import { useState } from "react";
import ThrivrImg from "@/assets/thrivr-logo.png";
import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <nav className=" bg-[#870E731A] py-7 px-[5%] lg:[10%]">
      <div className="2xl:container mx-auto flex justify-between">
        <div className="w-fit h-[32px] my-auto flex gap-[20px] items-center">
          <img
            src={ThrivrImg}
            alt=""
            className="w-[25px] translate-x-3 scale-[4] h-[25px]"
          />
          <h1 className="text-action-default text-[41.14px] font-bold leading-[32px] tracking-[-2%]">
            Thrivr
          </h1>
        </div>
        <div
          className={`${
            navOpen ? " left-0" : "-left-full"
          } w-[60%] p-5 text-white bottom-0 lg:text-black lg:w-[55%] flex flex-col lg:flex-row justify-center lg:justify-between top-0 h-screen lg:h-fit absolute lg:static bg-[#870E73] lg:bg-transparent duration-300 transition-all z-50`}
        >
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <Link to="/" className="p-3">
              How It Works
            </Link>
            <Link to="/" className="p-3">
              Resources
            </Link>
            <Link to="/" className="p-3">
              Pricing
            </Link>
            <Link to="/" className="p-3">
              Company
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-7 align-center items-center mt-20 lg:mt-0">
            <Link to="/">Log In</Link>
            <Link
              to="/"
              className="px-5 py-2 bg-white lg:bg-[#870E73] rounded-full text-[#870E73] lg:text-white"
            >
              Register
            </Link>
          </div>
        </div>
        <button
          onClick={() => {
            setNavOpen(!navOpen);
          }}
          className="block lg:hidden"
        >
          {!navOpen ? <HamburgerMenuIcon className=" w-[30px] h-[30px]"/> : <X className=" w-[30px] h-[30px]"/>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
