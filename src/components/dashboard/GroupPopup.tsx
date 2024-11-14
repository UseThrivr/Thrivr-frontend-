import { X } from "lucide-react";

interface GroupPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const GroupPopup: React.FC<GroupPopupProps> = ({ isOpen, onClose }) => {
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
                        <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">Group details</h2>
                    </div>

                    <form className="space-y-4 w-[772px] flex flex-col gap-[16px]">
                        <div>
                            <label className="block text-[20px] font-medium text-[#24272E]">Group name <span className="text-red-500">*</span></label>
                            <input className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2" placeholder="Enter group name" />
                        </div>
                        <div>
                        <label className="block text-[20px] font-medium text-[#24272E] mb-1">Group</label>
                        <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[14px] mt-1">
                            <select className="h-full w-full bg-transparent outline-none border-none">
                                <option>Select customers</option>
                                {/* Add bank options here */}
                            </select>
                        </div>
                    </div>
                        <div>
                            <label className="block text-[20px] font-medium text-[#24272E]">Description</label>
                            <label className="mb-3 text-[0.87rem] text-[#5C636D]">Write a short description for the customer group</label>
                            <textarea 
                                className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] h-[197px] p-[16px] mt-2" 
                                rows={4}
                            />
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

export default GroupPopup;
