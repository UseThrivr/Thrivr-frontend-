import { ChevronDown, CloudDownload, FileDown, X } from "lucide-react";
import TimeRangePicker from "./timRange";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import toast from "react-hot-toast";

interface StoreSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    storeTheme: string;
    photo: File | null;
    workingDays: string;
    openingHours: string;
    currency: string;
  }>({
    storeTheme: "Dark",
    photo: null,
    workingDays: "Mon - Fri",
    openingHours: "8",
    currency: "",
  });

  const { updateSettings } = useData();
  if (!isOpen) return null;

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Attempt login using AuthContext's login method
      await updateSettings({
        theme: formData.storeTheme,
        banner_image: formData.photo,
        working_days: formData.workingDays,
        opening_hours: formData.openingHours,
        currency: formData.currency,
      });

      // Show success toast and navigate to dashboard
      toast.success("Updated Successfullly!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = err.message || "Update failed. Please try again.";
        toast.error(errorMessage);

        // Optionally set specific error states
        setError(errorMessage);
      } else {
        toast.error("Update Failed!");
        setError("Update Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (time: string) => {
    setFormData({ ...formData, openingHours: time });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#000000CC] hidden lg:flex justify-center z-50 overflow-auto">
      <div className="py-24 flex items-center min-h-fit w-full justify-center">
        <div className="relative h-max lg:w-[600px] xl:w-[800px] bg-white rounded-lg py-8 px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onClose}
              className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-semibold text-[#24272E]">
              Store Settings
            </h2>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 py-4"
            >
              <div className="flex flex-col w-full gap-4">
                <label
                  htmlFor="storeTheme"
                  className="block text-base font-medium text-text-primary"
                >
                  Store theme <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex relative items-center h-auto">
                  <select
                    className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
                    id="storeTheme"
                    value={formData.storeTheme}
                    onChange={handleChange}
                    required
                  >
                    <option>Default</option>
                    <option>Dark</option>
                  </select>
                  <ChevronDown className="pointer-events-none right-3 size-6 absolute" />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="block text-base font-medium text-text-primary"
                  htmlFor="photo"
                >
                  Store banner Image <span className="text-red-500">*</span>
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
                          Click to upload product image
                        </h3>
                        <p className="flex items-center gap-2 md:gap-4 font-normal text-xs sm:text-sm text-text-secondary">
                          PNG, JPG
                          <div className="border h-3 sm:h-4 border-text-secondary" />
                          10 MB max
                          <div className="border h-3 sm:h-4 border-text-secondary" />
                          {!imagePreview ? "0 photo added" : "1 photo added"}
                        </p>
                      </div>
                      <CloudDownload className="size-4 md:size-6" />
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
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
              </div>
              <div className="flex w-full gap-4">
                <div className="flex flex-col flex-1 gap-4">
                  <label
                    htmlFor="workingDays"
                    className="block text-base font-medium text-text-primary"
                  >
                    Working days <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full flex relative items-center h-auto">
                    <select
                      className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
                      id="workingDays"
                      required
                      value={formData.workingDays}
                      onChange={handleChange}
                    >
                      <option>Mon - Fri</option>
                      <option>Mon - Sun</option>
                      <option>Mon - Sat</option>
                    </select>
                    <ChevronDown className="pointer-events-none right-3 size-6 absolute" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label className="block text-base font-medium text-text-primary">
                    Opening hours <span className="text-red-500">*</span>
                  </label>
                  <TimeRangePicker
                    value={formData.openingHours}
                    change={handleTimeChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <label
                  htmlFor="currency"
                  className="block text-base font-medium text-text-primary"
                >
                  Currency <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex relative items-center h-auto">
                  <select
                    className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
                    id="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                  >
                    <option value="NGN">Nigerian Naira (NGN)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                  <ChevronDown className="pointer-events-none right-3 size-6 absolute" />
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-action-default text-white rounded-2xl  hover:opacity-80 p-4"
              >
                {loading === true ? "Saving..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
