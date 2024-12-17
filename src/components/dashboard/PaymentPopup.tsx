// import { useState } from "react";
import { X } from "lucide-react";

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#000000CC] hidden lg:flex justify-center z-50 overflow-auto">
      <div className="py-24 flex items-center min-h-fit w-full justify-center">
        <div className="relative h-max lg:w-[600px] xl:w-[800px] bg-white rounded-lg py-8 px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
          <div className="w-full flex flex-col gap-[48px]">
            <button
              onClick={onClose}
              className="absolute -top-[4.5rem] -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <div className="">
              <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">
                Add bank details
              </h2>
              <p className="text-[1rem] text-[#5C636D]">
                Ensure that your bank details is linked to a BVN we can verify
              </p>
            </div>

            <form className="space-y-4 w-full flex flex-col gap-[16px]">
              <div>
                <label className="block text-[20px] font-medium text-[#24272E]">
                  Bank name <span className="text-red-500">*</span>
                </label>
                <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-1">
                  <select className="h-full w-full bg-transparent outline-none border-none">
                    <option>Select bank</option>
                    {/* Add bank options here */}
                  </select>
                </div>
              </div>
              <div className="w-full flex gap-[32px]">
                <div className="w-full flex flex-col gap-[16px]">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Account name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]"
                    placeholder="Enter account name"
                  />
                </div>
                <div className="w-full flex flex-col gap-[16px]">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Account number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]"
                    placeholder="Enter account number"
                  />
                </div>
              </div>
              <label className="block text-[20px] font-medium text-[#24272E]">
                Account type <span className="text-red-500">*</span>
              </label>
              <div className="w-full flex gap-[32px] h-[102px]">
                <div className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="Current"
                      className="mr-2 accent-[#5C636D]  w-[24px] h-[24px]"
                    />{" "}
                    Current
                  </label>
                </div>
                <div className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="Savings"
                      className="mr-2 accent-[#5C636D] w-[24px] h-[24px]"
                    />{" "}
                    Savings
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="w-full bg-action-default text-white rounded-[24px] mt-4 hover:opacity-80 h-[67px] p-[16px]"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
