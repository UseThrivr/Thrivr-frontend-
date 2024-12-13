const MobileNewCustomers = () => {
  return (
    <section>
      <form className="space-y-4 w-full flex flex-col gap-4">
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Email address
          </label>
          <input
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter customer email"
          />
        </div>
        <div className="flex gap-[32px] flex-col">
          <div className="flex-1">
            <label className="block text-[20px] font-medium text-[#24272E]">
              Phone number
            </label>
            <input
              className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[20px] font-medium text-[#24272E]">
              Instagram
            </label>
            <input
              className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
              placeholder="@"
            />
          </div>
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E] mb-1">
            Group
          </label>
          <p className="mb-3 text-[0.87rem] text-[#5C636D]">
            Add customer to any group
          </p>
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
    </section>
  );
};

export default MobileNewCustomers;
