import { H1, P, Seo } from "@/components/global";
import { Search } from "lucide-react";

const Orders = () => {
    return (
        <>
            <Seo title="Orders" />
            <div className="px-[33px]">
                <H1>Order</H1>
                <P>View the complete list of orders for your business</P>

                <div className="mt-10 flex justify-between">
                    <div>
                        <button className="py-3 px-5">All</button>
                        <button className="py-3 px-5">Completed</button>
                        <button className="py-3 px-5">Processing</button>
                        <button className="py-3 px-5">Cancelled</button>
                    </div>
                    <div className="border-2 p-3 flex w-[45%] rounded">
                        <Search size={20} />
                        <input type="text" className="border-none focus:outline-none"/>
                    </div>
                    <button className="bg-[#870E73] rounded-full p-3 text-white">+ Record Order</button>
                </div>
            </div>
        </>
    )
}

export default Orders;