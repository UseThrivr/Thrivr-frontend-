import { P } from "@/components/global";
import {
  CloudDownloadIcon,
  FileDown,
  FileUp,
  Locate,
  NotebookPenIcon,
  Store,
} from "lucide-react";
import React, { useState } from "react";

interface businessInfo {
  businessName: string;
  email: string;
  phoneNumber: string;
  description: string;
  businessLocation: string;
  image: string;
}

const Businesssetup = () => {
  const [businessData, setBusinessData] = useState<businessInfo>({
    businessName: "",
    email: "",
    phoneNumber: "",
    businessLocation: "",
    description: "",
    image: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          handleChange("image", reader.result as string); // Store base64 string
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const locations: string[] = [
    "Abia",
    "Adamawa",
    "Akwa-ibom",
    "Anambara",
    "Bauchi",
  ];

  const handleChange = <K extends keyof businessInfo>(
    key: K,
    value: businessInfo[K]
  ) => {
    setBusinessData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="mb-20">
        <P className="text-center font-bold">Almost Done David</P>
        <h3 className="text-2xl text-center font-semibold">
          Let's Set Up Your Business Page
        </h3>

        <div className="mt-5">
          <p>Business Name</p>
          <div className="flex px-4 border-2 rounded-lg gap-1">
            <Store className="my-auto w-4 h-4" />
            <input
              name="businessName"
              value={businessData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              type="text"
              className="text-sm p-2 focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="mt-5">
          <p>Business Location</p>
          <div className="px-4 flex border-2 rounded-lg gap-1">
            <Locate className="my-auto w-4 h-4" />
            <select
              name="businessLocation"
              value={businessData.businessLocation ?? ""}
              onChange={(e) => handleChange("businessLocation", e.target.value)}
              className="text-sm p-2 w-full focus:outline-none"
            >
              <option value="" className="" disabled>
                Select A State
              </option>
              {locations.map((state, index) => (
                <option key={index} value={state} className="">
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <p>Email</p>
          <div className="flex px-4 border-2 rounded-lg gap-1">
            <Store className="my-auto w-4 h-4" />
            <input
              name="email"
              value={businessData.email}
              onChange={(e) => handleChange("businessLocation", e.target.value)}
              type="text"
              className="text-sm p-2 focus:outline-none w-full"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="mt-5">
          <p>Phone Number</p>
          <div className="flex px-4 border-2 rounded-lg gap-1">
            <Store className="my-auto w-4 h-4" />
            <input
              name="phoneNumber"
              value={businessData.phoneNumber}
              onChange={(e) => handleChange("businessLocation", e.target.value)}
              type="text"
              className="text-sm p-2 focus:outline-none w-full"
              placeholder="Enter Number"
            />
          </div>
        </div>
        <div className="mt-5">
          <p>Describe your Business</p>
          <div className="flex px-4 border-2 rounded-lg gap-1 min-h-32">
            <NotebookPenIcon className="w-4 h-4 mt-2" />
            <textarea
              name="description"
              value={businessData.description}
              onChange={(e) => handleChange("businessLocation", e.target.value)}
              className="p-2 text-sm focus:outline-none w-full resize-none"
              placeholder="Enter Your Business Description"
            />
          </div>
        </div>
        <div className="mt-5 bg-[#00000038] rounded-lg w-full p-3 flex justify-between">
          <div className="bg-[#870E737D] rounded-full w-fit p-2">
            <FileDown className="text-white" />
          </div>
          <div>
            <p className="text-sm text-[#000000A8] ">
              Upload Your Business Logo - Optional
            </p>
            <div>
              <p className="text-sm">PNG, JPG | 10MB</p>
            </div>
          </div>
          <div className="bg-[#870E737D] rounded-full w-fit p-2">
            <CloudDownloadIcon className="text-white" />
          </div>
        </div>
        <input
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          className="mt-2"
        />
        <button className="bg-[#870E73CC] rounded-lg w-full text-white p-3 mt-10">
          Create Business
        </button>
      </div>
    </>
  );
};

export default Businesssetup;
