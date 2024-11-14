import { Seo } from "@/components/global";
import OverviewCard from "@/components/dashboard/OverviewCard";
import {
    ChevronDown,
} from "lucide-react";

const Sales = () => {
    return (
        <>
            <Seo title="Sales" />
            <section className="w-full h-screen pt-[1rem] px-[2rem]">
                <div className="flex flex-col gap-[4px]">
                    <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">Sales</h1>
                    <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">Check the full inventory list for your shop</p>
                </div> 
                <div className="flex items-centerz justify-end w-full py-[8px] px-[16px] gap-[16px]">
                    <h4 className="font-[500] text-[20px] leading-[30px] text-[#5c636d]">Last 7 days</h4>
                    <ChevronDown />
                </div>
                <OverviewCard />
            </section>
        </>
    )
}

export default Sales;