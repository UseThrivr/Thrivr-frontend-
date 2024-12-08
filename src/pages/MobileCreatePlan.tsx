const MobileCreatePlane = () => {
  return (
    <section>
      <form className="space-y-4 w-full h-[354px] flex flex-col gap-[16px]">
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

        <div className="w-full flex flex-col gap-[32px] items-center">
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
    </section>
  );
};

export default MobileCreatePlane;
