import React from "react";
import img from "../../assets/BenefitImg.png";
import { Link } from "react-router-dom";
import { H1, P } from "../global";
import AOS from "aos"

AOS.init({
  offset: 180, 
  duration: 400, 
  easing: 'ease',
  once: false, 
  mirror: false, 
  anchorPlacement: 'top-bottom',
})

interface HelpProps {
  data: {
    heading: string;
    description: string;
    link: string;
  };
  index: number;
}

const Help: React.FC<HelpProps> = ({ data, index }) => {
  return (
    <div className="relative w-[400px] h-[310px] z-10 mx-auto lg:mx-0" data-aos="fade-up" data-aos-delay={`${index + 1}00`}>
      <div className="absolute z-10">
        <img src={img} alt="" />
      </div>
      <div className="z-50 relative p-5 mt-10">
        <H1 className="text-3xl font-bold">{data.heading}</H1>
        <P className="mt-8">{data.description}</P>
        <div className="mt-10">
          <Link to="" className="text-[#870E73]">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
