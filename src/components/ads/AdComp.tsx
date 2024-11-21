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
    <div className="flex justify-between items-center p-3 py-5">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase text-[#5C636D] mb-2">
          {data.name}
        </p>
        <p className="text-xs text-[#870E73]">{data.title}</p>
        <p className="text-[#5C636D]">
          {formattedStartDate} - {formattedEndDate}
        </p>
      </div>
      <div className="flex justify-between content-center text-start w-[20%]">
        <p>To: {data.audience}</p>
      </div>
      <div
        className={`${data.ongoing ? "text-green-500" : "text-red-600"} flex`}
      >
        {data.ongoing ? (
          <p className="flex">
            <Dot /> Live
          </p>
        ) : (
          <p className="flex">
            <Check className="p-1"/> Done
          </p>
        )}
      </div>
      <button>
        <Trash />
      </button>
    </div>
  );
};

export default AdComp;
