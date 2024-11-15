import React from "react";
import { H4 } from "../global";
import AOS from "aos"

AOS.init()

interface SampleProps {
  data: {
    heading: string;
    image: string;
  };
}

const ProductSample: React.FC<SampleProps> = ({ data }) => {
  return (
    <div className="mx-auto lg:mx-0 flex flex-col" data-aos="fade-up">
      <div className="lg:w-[25rem] rounded-lg overflow-hidden">
        <img src={data.image} alt="" className="object-cover" />
      </div>
      <div className="mt-5">
        <H4 className="w-1/2 text-white text-start">{data.heading}</H4>
      </div>
    </div>
  );
};

export default ProductSample;
