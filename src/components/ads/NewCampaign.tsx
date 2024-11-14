import { X } from "lucide-react";
import React, { useState } from "react";
import { H1 } from "../global";
import { platform } from "os";

interface btnProp {
    onBtnClick: ()=> void
}

const NewCampaign: React.FC<btnProp> = ({onBtnClick}) => {
  const platforms = ["Facebook", "Instagram", "Email"];
  const targetAudience = ["Existing Customers", "Fashion Lovers", ]
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
    <div className="absolute w-[80%] flex justify-center content-center top-0 h-screen bg-gray-700 bg-opacity-75">
      <div className="w-[60%] flex flex-col justify-center">
        <button onClick={onBtnClick} className="flex justify-end p-5">
          <X className="p-1 bg-white w-[30px] h-[30px] rounded-full text-black" />
        </button>

        <div className="bg-white rounded p-10 w-[95%]">
          <H1>Add Campaign Details</H1>
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
                  <option key={index} value={platform} className="text-sm">{platform}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="my-2">Start Date</p>
                <input type="date" className="text-sm border-2 p-3 w-full rounded"/>
              </div>
              <div>
                <p className="my-2">Start Date</p>
                <input type="date" className="text-sm border-2 p-3 w-full rounded" />
              </div>
            </div>
            <div>   
              <p className="my-1">Target Audience</p>
              <p className="text-gray-600 text-sm my-2">Who are your target?</p>
              <select
                name="targetAudience"
                id=""
                value={campaignDetails.targetAudience}
                onChange={handleChange}
                className="border-2 rounded w-full p-3"
              >
                <option value="" disabled>Select an Audience</option>
                {targetAudience.map((audience, index)=> (
                    <option key={index} value={audience}>{audience}</option>
                ))}
              </select>
            </div>
            <div className="w-full ">
                <button className="w-full p-3 bg-[#870E73] rounded-full text-white">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
