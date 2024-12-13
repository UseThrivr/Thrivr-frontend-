const MobileNewGroup = () => {
  return (
    <section>
      <form className="space-y-4 w-full flex flex-col gap-[16px]">
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Group name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter group name"
          />
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E] mb-1">
            Group
          </label>
          <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[14px] mt-1">
            <select className="h-full w-full bg-transparent outline-none border-none">
              <option>Select customers</option>
              {/* Add bank options here */}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Description
          </label>
          <label className="mb-3 text-[0.87rem] text-[#5C636D]">
            Write a short description for the customer group
          </label>
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
    </section>
  );
};

export default MobileNewGroup;
