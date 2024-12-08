const MobilePayment = () => {
  return (
    <section>
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
        <div className="w-full flex flex-col gap-[32px]">
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
        <div className="w-full flex flex-col gap-[32px]">
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
    </section>
  );
};

export default MobilePayment;
