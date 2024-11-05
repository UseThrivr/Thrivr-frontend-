import { useState } from "react";
import { X } from "lucide-react";

interface PaymentPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
            <div className="relative h-[680px] w-[900px] bg-white rounded-[8px] p-8 shadow-lg scale-95 animate-scaleIn flex items-center justify-center">
            <div className="w-[772px] h-[560px] flex flex-col gap-[48px]">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-md"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>
                <div className="">
                    <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">Add bank details</h2>
                    <p className="text-[1rem] text-[#5C636D]">Ensure that your bank details is linked to a BVN we can verify</p>
                </div>

                <form className="space-y-4 w-[772px] h-[354px] flex flex-col gap-[16px]">
                    <div>
                        <label className="block text-[20px] font-medium text-[#24272E]">Bank name <span className="text-red-500">*</span></label>
                        <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-1">
                            <select className="h-full w-full bg-transparent outline-none border-none">
                                <option>Select bank</option>
                                {/* Add bank options here */}
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex gap-[32px] h-[102px]">
                        <div className="w-[370px] h-[102px] flex flex-col gap-[16px]">
                        <label className="block text-[20px] font-medium text-[#24272E]">Account name <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]" placeholder="Enter account name" />
                        </div>
                        <div className="w-[370px] h-[102px] flex flex-col gap-[16px]">
                        <label className="block text-[20px] font-medium text-[#24272E]">Account number <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]" placeholder="Enter account number" />
                        </div>
                    </div>
                    <label className="block text-[20px] font-medium text-[#24272E]">Account type <span className="text-red-500">*</span></label>
                    <div className="w-full flex gap-[32px] h-[102px]">
                        <div className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]">
                            <label className="flex items-center">
                                <input type="radio" name="accountType" value="Current" className="mr-2 accent-[#5C636D]  w-[24px] h-[24px]" /> Current
                            </label>
                        </div>
                        <div className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]">
                            <label className="flex items-center">
                                <input type="radio" name="accountType" value="Savings" className="mr-2 accent-[#5C636D] w-[24px] h-[24px]" /> Savings
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
    );
};

export default PaymentPopup;
