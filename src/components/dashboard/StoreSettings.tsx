import { X } from "lucide-react";

interface CustomerPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomerPopup: React.FC<CustomerPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
            <div className="relative h-[811px] w-[900px] bg-white rounded-[8px] pt-[48px] px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
                <div className="w-[772px] h-[560px] flex flex-col gap-[48px]">
                    <button
                        onClick={onClose}
                        className="absolute -top-[4.5rem] -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
                    >
                        <X className="text-gray-700" />
                    </button>
                    <div>
                        <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">Customer details</h2>
                    </div>

                    <form className="space-y-4 w-[772px] flex flex-col gap-[16px]">
                        <div>
                            <label className="block text-[20px] font-medium text-[#24272E]">Name <span className="text-red-500">*</span></label>
                            <input className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2" placeholder="Enter customer name" />
                        </div>
                        <div>
                            <label className="block text-[20px] font-medium text-[#24272E]">Email address</label>
                            <input className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2" placeholder="Enter customer email" />
                        </div>
                        <div className="flex gap-[32px]">
                            <div className="flex-1">
                                <label className="block text-[20px] font-medium text-[#24272E]">Phone number</label>
                                <input className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2" placeholder="Enter phone number" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[20px] font-medium text-[#24272E]">Instagram</label>
                                <input className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2" placeholder="@" />
                            </div>
                        </div>
                        <div>
                        <label className="block text-[20px] font-medium text-[#24272E] mb-1">Group</label>
                        <p className="mb-3 text-[0.87rem] text-[#5C636D]">Add customer to any group</p>
                        <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[14px] mt-1">
                            <select className="h-full w-full bg-transparent outline-none border-none">
                                <option>Offline</option>
                                {/* Add bank options here */}
                            </select>
                        </div>
                    </div>
                        <button
                            type="button"
                            className="w-full bg-action-default text-white rounded-[24px] mt-4 hover:opacity-80 h-[67px] p-[16px]"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerPopup;
