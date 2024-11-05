import { Seo } from "@/components/global";
import Nigeria from '@/assets/Nigeria.png'
import {
    ChevronDown
} from "lucide-react";

const Mybank = () => {
    return (
        <>
            <Seo title="Bank Accounts" />
            <section className="w-full h-screen pt-[1rem] px-[2rem]">
                <div className="flex flex-col gap-[4px] mb-[32px]">
                        <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">Bank accounts</h1>
                        <p className="text-[1rem] w-[512px] leading-[22.4px] font-[500] text-[#5c636d]">Add both Paystack and Bank Transfers to give buyers option to choose and prevent payment delays</p>
                </div>
                <div className="w-[649px] h-[102px] rounded-[8px] flex justify-between p-[16px] items-center bg-[#FDFBFF]">
                    <div className="w-[383px] h-[70px] flex flex-col gap-[16px]">
                        <h2 className="font-[500] text-[1rem] text-[5c636d]">Select your preferred currency to receive payment</h2>
                        <div className="w-[244px] h-[30px] flex items-center gap-[16px]">
                            <img src={Nigeria} alt="" className="w-[32px] h-[15.93px]" />
                            <p className="text-[20px] leading-[30px] font-[500] text-[#24272E]">Nigerian Naira (NGN)</p>
                        </div>
                    </div>
                    <ChevronDown className="w-[24px] h-[24px] text-[#5c636d]" />
                </div>
            </section>
        </>
    )
}

export default Mybank;