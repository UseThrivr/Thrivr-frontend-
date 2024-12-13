// import { useState } from "react";
import { X } from "lucide-react";

interface TodoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoPopup: React.FC<TodoPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000CC] hidden lg:flex justify-center z-50 overflow-auto">
      <div className="py-24 flex items-center min-h-fit">
        <div className="relative h-max w-[900px] bg-white rounded-lg py-8 px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
          <div className="w-full flex flex-col gap-[48px]">
            <button
              onClick={onClose}
              className="absolute -top-[4.5rem] -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <div className="">
              <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">
                Update Schedule
              </h2>
            </div>

            <form className="space-y-4 w-full flex flex-col gap-[16px]">
              <div>
                <label className="block text-[20px] font-medium text-[#24272E]">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
                  placeholder="Enter title"
                />
              </div>
              <div className="w-full h-[102px] flex flex-col gap-[16px]">
                <label className="block text-[20px] font-medium text-[#24272E]">
                  Details (Optional) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]"
                  placeholder="Write..."
                />
              </div>

              <div className="w-full flex gap-[32px] items-center">
                <div className="w-full">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Select time <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2">
                    <input
                      type="time"
                      className="w-full border-none bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[20px] font-medium text-[#24272E] mb-1">
                  Reminder <span className="text-red-500">*</span>
                </label>
                <p className="mb-3 text-[0.87rem] text-[#5C636D]">
                  Get notified before the deadline to stay on track
                </p>
                <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[14px] mt-1">
                  <select className="h-full w-full bg-transparent outline-none border-none">
                    <option>1 hour before</option>
                    {/* Add bank options here */}
                  </select>
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

export default TodoPopup;
