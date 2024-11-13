import React from "react";
import img from "../../assets/CustomerReview1.png";
import AOS from "aos";

AOS.init();

interface type {
  data: {
    review: string;
    customerName: string;
    company: string;
  };
}

const CustomerReview: React.FC<type> = ({ data }) => {
  return (
    <div
      className="relative flex flex-col justify-center w-full bg-[#1C0719] h-fit rounded mx-auto text-white p-7"
      data-aos="fade-up"
    >
      <p className="text-sm">{data.review}</p>
      <div className="mt-20 w-full text-nowrap">
        <p className="text-lg">{data.customerName}</p>
        <p className="text-xs mt-2 text-[#FF7A59]">{data.company}</p>
      </div>
      <div className="absolute -right-10 -bottom-10 h-[100px] w-[100px] lg:w-[120px] lg:h-[120px] border rounded-full">
        <img src={img} alt="" className="object-cover" />
      </div>
    </div>
  );
};

export default CustomerReview;
