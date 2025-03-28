import React from "react";
import { salesData } from "@/constants";

const SalesCard: React.FC = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-8 mb-[64px]">
            {salesData.map((item, index) => (
                <div
                    key={index}
                    className={`p-2 md:p-4 rounded-[8px] flex flex-col text-white ${item.color} gap-6 md:gap-[48px]`}
                >
                    <div className="flex items-start justify-start flex-col gap-[8px] text-[#5c636d]">
                        <div>
                            <h3 className="md:text-base text-sm md:leading-[24px] font-[500] text-text-secondary">{item.name}</h3>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full h-[30px]">
                        <p className="text-base md:text-xl md:leading-[30px] text-primary font-[500]">{item.amount}</p>
                        <p className={`md:text-4 text-xs md:leading-[23.12px] font-[400] ${item.percentage.startsWith("-") ? "text-[#DC3545]" : "text-[#28a745]"}`}>
                            {item.percentage}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SalesCard;
