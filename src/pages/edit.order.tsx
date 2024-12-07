import { useState } from "react";
import { Seo } from "@/components/global";
import { X } from "lucide-react";

const EditOrder = () => {

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentChannel, setPaymentChannel] = useState<string | null>(null);
  const [salesChannel, setSalesChannel] = useState<string | null>(null);

  const saleChannels = ["Channel1", "Channel2"];
  const paymentChannels = ["Paypal", "Opay Transfer"];
  const paymentStatuses = ["Paid", "Not Paid"];

  return (
    <>
      <Seo title="Edit - Order" />
      <div className="grid lg:grid-cols-2 gap-5 px-5 pb-20">

        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <label htmlFor="supplyID" className="font-semibold">
              Order ID{" "}
            </label>
            <input
              name="supplyID"
              type="text"
              placeholder="ORD-00123"
              className="border rounded p-4 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="productName" className="font-semibold">
              Customer Name{" "}
            </label>
            <input
              name="productName"
              type="text"
              placeholder="Enter customer name"
              className="border rounded p-4 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="productName" className="font-semibold">
              Customer Email or Number{" "}
            </label>
            <input
              name="productName"
              type="text"
              placeholder="Enter customer’s email/number"
              className="border rounded p-4 focus:outline-none"
              required
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="col-span-1 mt-5">
              <label htmlFor="salesChannel" className="font-semibold">
                Sales Channel{" "}
              </label>
              <select
                name="salesChannel"
                value={salesChannel ?? ""}
                onChange={(e) => setSalesChannel(e.target.value)}
                id="salesChanel"
                className="border p-3 rounded w-full mt-2 focus:outline-none"
              >
                <option value="" disabled>
                  Select sales channel
                </option>
                {saleChannels.map((channel, index) => (
                  <option
                    key={index}
                    value={channel}
                    className="text-md font-normal"
                  >
                    {channel}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 mt-5">
              <label htmlFor="paymentChannel" className="font-semibold">
                Payment Channel{" "}
              </label>
              <select
                name="paymentChannel"
                value={paymentChannel ?? ""}
                onChange={(e) => setPaymentChannel(e.target.value)}
                id="paymentChannel"
                className="border p-3 rounded w-full mt-2 focus:outline-none"
              >
                <option value="" disabled>
                  Select Payment Channel
                </option>
                {paymentChannels.map((channel, index) => (
                  <option
                    key={index}
                    value={channel}
                    className="text-base font-normal"
                  >
                    {channel}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 mt-5">
              <label htmlFor="orderDate" className="font-semibold">
                Order Date{" "}
              </label>
              <input
                name="orderDate"
                type="date"
                className="border p-3 rounded w-full mt-2 focus:outline-none"
              />
            </div>
            <div className="col-span-1 mt-5">
              <label htmlFor="paymentStatus" className="font-semibold">
                Payment Status{" "}
              </label>
              <select
                name="paymentStatus"
                value={paymentStatus ?? ""}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className={`border p-3 rounded w-full mt-2 focus:outline-none`}
              >
                <option value="" disabled>
                  Select Payment Status
                </option>
                {paymentStatuses.map((status, index) => (
                  <option
                    key={index}
                    value={status}
                    className="text-md font-normal"
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold my-2">Additional Notes(optional)</p>
            <textarea
              name=""
              id=""
              placeholder="Write..."
              className="resize-none border-2 p-4 h-[12rem] w-full rounded focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div className="">
          <div>
            <p className="font-semibold">Short Description</p>
            <p className="my-2">Add items to this list from your inventory</p>
            <div
              id=""
              className="resize-none border p-4 h-[15rem] w-full rounded"
            ></div>
          </div>
          <div className="border flex rounded mt-5">
            <input
              type="text"
              className="w-full p-4  focus:outline-none"
              placeholder="Search Product ID or Name"
            />
            <div className="p-4">
              <p className="font-bold"><X /></p>
            </div>
          </div>

          <div className="mt-5">
            <p className="my-2 font-semibold">Calculator</p>
            <div className="border rounded flex p-4">
              <p>₦</p>
              <input type="number" className="ms-2 focus:outline-none w-full" />
            </div>
          </div>

          <div className="mt-10">
            <button className="rounded-2xl lg:rounded-full bg-[#870E73] text-white py-3 px-5 w-full lg:w-auto">
              Save Order Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
