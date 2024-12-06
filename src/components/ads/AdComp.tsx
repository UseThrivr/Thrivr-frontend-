import { Check, Dot, Trash } from "lucide-react";
import React from "react";

interface adDetails {
  data: {
    name: string;
    title: string;
    startDate: Date;
    endDate: Date;
    audience: string;
    ongoing: boolean;
  };
}

const AdComp: React.FC<adDetails> = ({ data }) => {
  const formattedStartDate = data.startDate.toLocaleDateString();
  const formattedEndDate = data.endDate.toLocaleDateString();

  return (
    <div className="flex justify-between items-center py-5">
      <div className="flex flex-col gap-1">
        <p className="text-xs lg:text-base font-semibold uppercase text-[#5C636D] mb-2">
          {data.name}
        </p>
        <p className="text-xs lg:text-base text-[#870E73]">{data.title}</p>
        <p className="text-[#5C636D] text-sm">
          {formattedStartDate} - {formattedEndDate}
        </p>
      </div>
      <div className="flex justify-between content-center text-start w-[40%]">
        <p className="text-sm lg:text-base">To: {data.audience}</p>
        <div
          className={`${data.ongoing ? "text-green-500" : "text-red-600"} flex`}
        >
          {data.ongoing ? (
            <p className="flex text-sm lg:text-base">
              <Dot /> Live
            </p>
          ) : (
            <p className="flex text-sm lg:text-base">
              <Check className="p-1" /> Done
            </p>
          )}
        </div>
      </div>

      <button>
        <Trash />
      </button>
    </div>
  );
};

export default AdComp;
