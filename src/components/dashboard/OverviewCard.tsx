import { overviewData } from "@/constants";

const OverviewCard = ({ data }: {data: string[]}) => {
    console.log(data);
    return (
        <div className="grid grid-cols-2 min-[400px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-8 mb-[64px]">
            {overviewData.map((item, index) => (
                <div
                    key={index}
                    className={`md:p-[16px] p-2 rounded-[8px] flex flex-col text-white ${item.color} gap-[40px]`}
                >
                    <div className="flex items-start justify-start flex-col gap-[8px] text-[#5c636d]">
                        <item.icon className="w-[24px] h-[24px] hidden md:flex" />
                        <div>
                            <h3 className="md:text-base text-sm leading-[24px] font-[500]">{item.name}</h3>
                        </div>
                    </div>
                    <div className="flex justify-between items-end w-full">
                        <p className="text-[20px] leading-[30px] text-primary font-medium">{item.amount}</p>
                        <p className={`md:text-[1rem] text-[12px] leading-[23.12px] font-[400] ${item.percentage.startsWith("-") ? "text-[#DC3545]" : "text-[#28a745]"}`}>
                            {item.percentage}
                        </p>
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default OverviewCard;
