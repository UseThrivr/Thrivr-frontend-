import { Seo } from "@/components/global";
import OverviewCard from "@/components/dashboard/OverviewCard";
import {
    ChevronDown,
    ShoppingBag
} from "lucide-react";
import BarChart from "@/components/dashboard/BarChart";
import ProgressBar from "@/components/dashboard/ProgressBar";
import { progressData } from "@/constants";

const Dashboard = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dataPoints = [50, 100, 120, 169, 78, 200, 246, 280, 150, 168, 178, 246];

    return (
        <>
            <Seo title="Dashboard" />
            <section className="w-full lg:pt-[1rem] px-[5%]">
                <div className="flex flex-col gap-[4px]">
                    <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">Hello John</h1>
                    <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">An overview of how your business is fairing</p>
                </div> 
                <div className="flex items-center justify-end w-full py-[8px] px-[16px] gap-[16px]">
                    <h4 className="font-[500] text-[20px] leading-[30px] text-[#5c636d]">Last 7 days</h4>
                    <ChevronDown />
                </div>
                <OverviewCard />

                <div className="w-full lg:h-[501px] flex flex-col lg:flex-row justify-between gap-[32px]">
                    <div className=" chart lg:w-[942px] lg:h-[484px] flex flex-col gap-[32px]">
                        <div className="w-full h-[65px] flex justify-between">
                            <div className="lg:w-[312px] h-[65px] flex flex-col gap-[8px]">
                                <h1 className="font-semibold tracking-[-1%] leading-[35.2px] text-[32px]">Order Trends</h1>
                                <p className=" font-[400] text-sm lg:text-[16px] leading-[20.83px] text-[#5c636d]">How your orders fluctuate overtime</p>
                            </div>

                            <div className="lg:w-[340px] h-[46px] flex gap-[24px] items-center">
                                <div className="lg:w-[117px]  lg:h-[46px] rounded-[16px] px-3 lg:px-[16px] py-1 lg:py-[8px] flex gap-[16px]">
                                    <p className="">2014</p>
                                    <ChevronDown />
                                </div>
                                
                                <a href="#" className="box-border flex items-center justify-center py-[8px] px-[16px] gap-[16px] h-[46px] border border-solid border-action-default rounded-[24px] text-action-default">
                                    <ShoppingBag />
                                    <span className="font-medium text-sm lg:text-xl leading-[30px] capitalize whitespace-nowrap">record order</span>
                                </a>
                            </div>
                        </div>
                        <BarChart labels={labels} dataPoints={dataPoints} />
                    </div>
                    <div className="lg:w-[303px] lg:h-[484px] px-[16px] flex flex-col gap-[24px]">
                        <h2 className="font-semibold text-[32px] leading-[35.2px] tracking-[-1%] text-primary whitespace-nowrap">Top sales channels</h2>
                        <div className="lg:w-[271px] h-full flex flex-col gap-[24px]">
                        {progressData.map((item) => (
                            <ProgressBar key={item.name} name={item.name} percentage={item.percentage} />
                        ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
