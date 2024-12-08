import React from "react";
import { Button } from "../ui/button";

interface PaymentBoxProps {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  texts: string;
  list: string[];
  buttonText: string;
  onButtonClick?: () => void;
}

const PaymentBox: React.FC<PaymentBoxProps> = ({
  icon,
  image,
  title,
  texts,
  list,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className=" lg:h-[190px] p-[16px] bg-[#FDF2FB] rounded-[8px] mb-[32px]">
      <div className="flex gap-[32px]">
        {/* Icon Section */}

        <div className="flex-shrink-0 flex w-[64px] h-[64px] rounded-full items-center justify-center p-[12.8px] bg-white gap-[16px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="rounded-full object-cover w-[42px] h-[42px]"
            />
          ) : (
            icon
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:w-[544px] lg:h-[158px] gap-[24px]">
          <div className="w-full lg:h-[94px] flex flex-col gap-[8px]">
            <h3 className="text-[20px] text-wrap font-medium leading-[30px] text-black">
              {title}
            </h3>

            <div className="text-[#5C636D] text-[16px] leading-6 font-medium">
              {texts}
            </div>

            <div className="flex flex-col mt-3 lg:mt-0 lg:flex-row lg:items-center">
              {list.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <div className="w-[8px] h-[8px] hidden lg:flex rounded-full selection:rounded-full bg-[#5C636D] mx-3" />
                  )}
                  <div className="lg:hidden w-[8px] h-[8px] rounded-full bg-[#5C636D] mx-3" />
                  <span className="text-[#5C636D] text-[16px] leading-6 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex">
            <Button
              onClick={onButtonClick}
              className="bg-action-default w-[187px] h-[40px] rounded-[28px] px-[24px] py-[8px] text-white hover:bg-action-default/90 font-medium leading-6 text-[1rem]"
            >
              {buttonText}
            </Button>
          </div>
          <div className="flex lg:hidden">
            <a
              href="/mybank/payment"
              className="bg-action-default w-[187px] h-[40px] rounded-[28px] px-[24px] py-[8px] text-white hover:bg-action-default/90 font-medium leading-6 text-[1rem] flex justify-center items-center"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBox;
