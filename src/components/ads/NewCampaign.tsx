import { X } from "lucide-react";
import React, { useState } from "react";

interface btnProp {
  onBtnClick: () => void;
}

const NewCampaign: React.FC<btnProp> = ({ onBtnClick }) => {
  const platforms = ["Facebook", "Instagram", "Email"];
  const targetAudience = ["Existing Customers", "Fashion Lovers"];
  const [campaignDetails, setCampaignDetails] = useState({
    title: "",
    platform: "",
    startDate: "",
    endDate: "",
    targetAudience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaignDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-[#000000CC] hidden lg:flex justify-center z-50 overflow-auto">
      <div className="py-24 flex items-center min-h-fit">
        <div className="relative z-40 w-[900px] h-max bg-white rounded-lg px-12 py-12 shadow-lg animate-scaleIn lg:flex justify-center hidden">
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onBtnClick}
              className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-semibold text-[#24272E]">
              Add campaign details
            </h2>
            <div className="flex flex-col gap-5">
              <div className="">
                <p className="my-3">Campaign Name</p>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="text-sm border-2 rounded w-full p-3"
                />
              </div>
              <div className="">
                <p className="my-2">Platform</p>
                <select
                  name="platform"
                  id=""
                  onChange={handleChange}
                  value={campaignDetails.platform}
                  className="w-full text-sm p-3 rounded-lg border-2"
                >
                  <option value="" disabled>
                    Select Platform
                  </option>
                  {platforms.map((platform, index) => (
                    <option key={index} value={platform} className="text-sm">
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="my-2">Start Date</p>
                  <input
                    type="date"
                    className="text-sm border-2 p-3 w-full rounded"
                  />
                </div>
                <div>
                  <p className="my-2">Start Date</p>
                  <input
                    type="date"
                    className="text-sm border-2 p-3 w-full rounded"
                  />
                </div>
              </div>
              <div>
                <p className="my-1">Target Audience</p>
                <p className="text-gray-600 text-sm my-2">
                  Who are your target?
                </p>
                <select
                  name="targetAudience"
                  id=""
                  value={campaignDetails.targetAudience}
                  onChange={handleChange}
                  className="border-2 rounded w-full p-3"
                >
                  <option value="" disabled>
                    Select an Audience
                  </option>
                  {targetAudience.map((audience, index) => (
                    <option key={index} value={audience}>
                      {audience}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full ">
                <button className="w-full p-3 bg-[#870E73] rounded-full text-white">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
