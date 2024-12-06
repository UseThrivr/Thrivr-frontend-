import { Seo } from "@/components/global";
import { Button } from "@/components/ui/button";
import { profile } from "@/constants";
import { CloudDownload, FileDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const required = <span className="text-alert-red font-medium text-xl">*</span>;
const optional = "(Optional)";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: profile.contact.name,
    email: profile.contact.email,
    phone: profile.contact.phone,
    storename: profile.storename,
    tagline: profile.tagline,
    address: profile.contact.address,
    photo: "",
    description: "",
  });

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

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/profile"), 3000);
    setTimeout(
      () =>
        alert(
          `Saved ${formData.fullname}'s details succesfully, navigating to profile...`
        ),
      2000
    );
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
                  htmlFor="fullname"
                >
                  Full name {required}
                </label>
                <input
                  required
                  onChange={handleChange}
                  placeholder="Enter name"
                  name="fullname"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="fullname"
                  value={formData.fullname}
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
                  onChange={handleChange}
                  name="email"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="email"
                  id="email"
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="phone"
                >
                  WhatsApp number {required}
                </label>
                <input
                  required
                  placeholder="Enter WhatsApp number"
                  onChange={handleChange}
                  name="phone"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="tel"
                  id="phone"
                  value={formData.phone}
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
                  htmlFor="storename"
                >
                  Store name {required}
                </label>
                <input
                  required
                  onChange={handleChange}
                  placeholder="Enter business name"
                  name="storename"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="storename"
                  value={formData.storename}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="font-medium text-xl text-text-primary"
                  htmlFor="tagline"
                >
                  Tagline {required}
                </label>
                <input
                  required
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
                  htmlFor="address"
                >
                  Address {required}
                </label>
                <input
                  required
                  placeholder="Enter WhatsApp number"
                  onChange={handleChange}
                  name="address"
                  className="w-full p-4 rounded-md border border-neutral-border text-text-secondary font-medium text-base"
                  type="text"
                  id="address"
                  value={formData.address}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full">
              <label
                className="block text-base font-medium text-text-primary"
                htmlFor="photo"
              >
                Personal photo {required}
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
                className="resize-none border border-neutral-border p-4 h-[15rem] w-full rounded-md"
              ></textarea>
            </div>
          </div>
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
