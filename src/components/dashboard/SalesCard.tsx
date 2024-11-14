import React from "react";
import { salesData } from "@/constants";

const SalesCard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8 mb-[64px]">
            {salesData.map((item, index) => (
                <div
                    key={index}
                    className={`p-[16px] h-[134px] rounded-[8px] flex flex-col text-white ${item.color} w-[308px] gap-[48px]`}
                >
                    <div className="flex items-start justify-start flex-col gap-[8px] text-[#5c636d]">
                        <div>
                            <h3 className="text-[1rem] leading-[24px] font-[500]">{item.name}</h3>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full h-[30px]">
                        <p className="text-[20px] leading-[30px] text-primary font-[500]">{item.amount}</p>
                        <p className={`text-[1rem] leading-[23.12px] font-[400] ${item.percentage.startsWith("-") ? "text-[#DC3545]" : "text-[#28a745]"}`}>
                            {item.percentage}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SalesCard;
