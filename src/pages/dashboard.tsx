import { Seo } from "@/components/global";
import OverviewCard from '@/components/dashboard/'

const Dashboard = () => {
    return (
        <>
            <Seo title="Dashboard" />
            <section className="w-full h-screen pt-[1rem] px-[2rem]">
                <div className="">
                    <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">Hello John</h1>
                    <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">An overview of how your business is fairing</p>
                </div>

                {/* Add the OverviewCard component here */}
                <OverviewCard />
            </section>
        </>
    );
};

export default Dashboard;
