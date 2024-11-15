import ThrivrImg from "@/assets/ThrivrLogo(white).png";
import Links from "./data/Footer";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1C0719] px-[5%] lg:px-[10%] py-16">
      <div className="2xl:container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-3">
          <div className="">
            <div className="w-fit h-[32px] my-auto flex gap-[20px] items-center col-span-1">
              <img
                src={ThrivrImg}
                alt=""
                className="w-[8px] translate-x-3 scale-[4] h-[8px]"
              />
              <h1 className="text-white text-4xl font-bold ms-1 leading-[32px] tracking-[-2%]">
                Thrivr
              </h1>
            </div>
            <p className="text-white text-sm mt-3">
              2024 Trive Inc. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col gap-20 lg:grid grid-cols-4 place-content-center grid-flow-row">
            {Links.map((l, index) => (
              <div
                key={index}
                className="flex flex-col text-sm w-fit h-fit text-white"
              >
                <h2 className="font-bold mb-3 w-fit text-lg">{l.heading}</h2>
                <div key={index} className="flex flex-col w-fit gap-3">
                  {l.linksArr.map((li, index) => (
                    <Link
                      key={index}
                      to={li.link}
                      className="py-1 text-sm font-normal"
                    >
                      {li.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-end gap-8 text-white mt-20">
          <h1 className="font-extrabold block lg:hidden">Socials</h1>
          <a href="">Facebook</a>
          <a href="">X(Formerly Twitter)</a>
          <a href="">LinkedIn</a>
          <a href="">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
