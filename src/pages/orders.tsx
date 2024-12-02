import { H1, P, Seo } from "@/components/global";
import { Search } from "lucide-react";

const Orders = () => {
  return (
    <>
      <Seo title="Orders" />
      <div className="px-[5%]">
        <H1>Order</H1>
        <P>View the complete list of orders for your business</P>

        <div className="mt-10 flex justify-between flex-col-reverse lg:flex-row">
          <div className="mt-5 lg:mt-0">
            <button className="py-3 px-5">All</button>
            <button className="py-3 px-5">Completed</button>
            <button className="py-3 px-5">Processing</button>
            <button className="py-3 px-5">Cancelled</button>
          </div>
          <div className="flex lg:w-[60%] justify-end gap-10">
            <div className="border-2 p-3 flex gap-2 w-full rounded">
              <Search size={20} />
              <input type="text" className="border-none focus:outline-none" />
            </div>
            <button className="text-nowrap bg-[#870E73] rounded-full py-1 px-3 text-sm lg:text-base text-white">
              + Record Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
