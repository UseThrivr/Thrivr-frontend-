import { CloudDownload, FileDown, X } from "lucide-react";
import React, { useState } from "react";

interface btnProp {
  onBtnClick: () => void;
}

const NewCampaign: React.FC<btnProp> = ({ onBtnClick }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const platforms = ["Facebook", "Instagram", "Email"];
  const targetAudience = ["Existing Customers", "Fashion Lovers"];
  const [campaignDetails, setCampaignDetails] = useState({
    title: "",
    platform: "",
    startDate: "",
    endDate: "",
    targetAudience: "",
  });

  const MAX_FILE_SIZE_MB = 10;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setErrorMessage(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
      setImagePreview(null);
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
              {campaignDetails.platform === "Email" && (
                <>
                  <div className="">
                    <p className="my-3">Subject</p>
                    <input
                      type="text"
                      placeholder="Write..."
                      className="text-sm border-2 rounded w-full p-3"
                    />
                  </div>
                  <div className="">
                    <p className="my-3">Body</p>
                    <textarea
                      placeholder="Write email body copy"
                      className="text-sm border-2 rounded w-full p-3 resize-none h-[480px] md:h-[15rem]"
                    />
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <label
                      className="block text-base font-medium text-text-primary"
                      htmlFor="photo"
                    >
                      Upload ad images
                    </label>
                    <div className="flex w-full flex-col">
                      <label
                        htmlFor="photo"
                        className="cursor-pointer w-full p-2 md:p-4 rounded-md border border-neutral-border bg-neutral-alt text-text-secondary font-medium text-base flex justify-between items-center"
                      >
                        <div className="flex items-center w-full gap-4 justify-between">
                          <div className="p-2 md:p-3 bg-action-secondary rounded-full">
                            <FileDown className="size-4 sm:size-6" />
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <h3 className="text-text-primary font-medium text-sm sm:text-base">
                              Click to upload image
                            </h3>
                            <p className="flex items-center gap-2 md:gap-4 font-normal text-xs sm:text-sm text-text-secondary">
                              PNG, JPG
                              <div className="border h-3 sm:h-4 border-text-secondary" />
                              10 MB max
                              <div className="border h-3 sm:h-4 border-text-secondary" />
                              {!imagePreview
                                ? "0 photo added"
                                : "1 photo added"}
                            </p>
                          </div>
                          <CloudDownload className="size-4 md:size-6 hidden lg:flex" />
                        </div>
                      </label>
                      <input
                        required
                        onChange={handleFileChange}
                        name="photo"
                        accept="image/*"
                        className="h-[1px] pt-1"
                        type="file"
                        id="photo"
                      />
                    </div>
                    {errorMessage && (
                      <p className="mt-2 text-sm text-red-600">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </>
              )}
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
              {campaignDetails.platform === "Email" && (
                <div className="">
                  <p className="my-3">Budget</p>
                  <input
                    type="text"
                    placeholder="₦0.00"
                    className="text-sm border-2 rounded w-full p-3"
                  />
                </div>
              )}
              <div className="w-full ">
                <button className="w-full p-3 bg-[#870E73] rounded-full text-white">
                  {campaignDetails.platform === "Email" ? "Send" : "Next"}
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
