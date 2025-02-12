import { UserDetails } from "@/api/tokenService";
import { Seo } from "@/components/global";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { CloudDownload, FileDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const required = <span className="text-alert-red font-medium text-xl">*</span>;
const optional = "(Optional)";

const EditProfile = () => {
  const { updateBusiness } = useData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<UserDetails>(user as UserDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    setFile(file)
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Attempt login using AuthContext's login method
      await updateBusiness({
        full_name: formData?.full_name as string,
        business_name: formData?.business_name as string,
        location: formData?.location as string,
        email: formData?.email as string,
        phone_number: formData?.phone_number as string,
        description: formData?.description as string,
        logo: file || (formData?.image_path as string),
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

  return (
    <>
      <Seo title="Update contact details" />
      <form
        onSubmit={handleSubmit}
        className="py-6 md:px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-center md:max-w-[1700px] mx-auto"
      >
        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="font-medium text-base text-text-secondary">
              PERSONAL INFORMATION
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="full_name"
                >
                  Full name {required}
                </label>
                <input
                  required
                  onChange={handleChange}
                  placeholder="Enter name"
                  name="full_name"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="email"
                >
                  Email address {required}
                </label>
                <input
                  required
                  placeholder="Enter email address"
                  name="email"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base cursor-not-allowed"
                  type="email"
                  id="email"
                  disabled
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="phone_number"
                >
                  WhatsApp number {required}
                </label>
                <input
                  required
                  placeholder="Enter WhatsApp number"
                  onChange={handleChange}
                  name="phone_number"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="tel"
                  id="phone_number"
                  value={formData.phone_number}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-medium text-base text-text-secondary">
              BUSINESS DETAILS
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="business_name"
                >
                  Store name {required}
                </label>
                <input
                  required
                  onChange={handleChange}
                  placeholder="Enter business name"
                  name="business_name"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="business_name"
                  value={formData.business_name}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="tagline"
                >
                  Tagline {optional}
                </label>
                <input
                  placeholder="Enter business tagline"
                  onChange={handleChange}
                  name="tagline"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="tagline"
                  value={formData.tagline}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="location"
                >
                  Address {required}
                </label>
                <input
                  required
                  placeholder="Enter WhatsApp number"
                  onChange={handleChange}
                  name="location"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="location"
                  value={formData.location}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full">
              <label
                className="block text-xl font-medium text-text-primary"
                htmlFor="photo"
              >
                Personal photo {optional}
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
                        {!imagePreview ? "0 photo added" : "1 photo added"}
                      </p>
                    </div>
                    <CloudDownload className="size-4 md:size-6 hidden lg:flex" />
                  </div>
                </label>
                <input
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
            {imagePreview && (
              <div
                className="relative flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg overflow-hidden border-gray-300"
                style={{
                  backgroundImage: imagePreview
                    ? `url(${imagePreview})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
            <div className="flex flex-col gap-4 w-full">
              <label
                className="font-medium text-xl text-text-primary"
                htmlFor="description"
              >
                Business description {optional}
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Write..."
                onChange={handleChange}
                className="resize-none border border-neutral-border p-4 h-[15rem] w-full rounded-md"
                value={formData.description}
              ></textarea>
            </div>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6">
              {error}
            </div>
          )}
          <Button
            disabled={loading}
            className="rounded-xl md:rounded-full py-4 box-border md:py-2 px-6 disabled:cursor-not-allowed cursor-pointer disabled:bg-[#870E7380] bg-action-default hover:bg-action-hover w-full md:w-max text-white font-medium text-base h-max"
          >
            {loading === true ? "Saving..." : "Save details"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
