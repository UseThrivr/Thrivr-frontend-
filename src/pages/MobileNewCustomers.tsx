import { useData } from "@/context/DataContext";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const MobileNewCustomers = () => {
  const { addCustomer } = useData();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone_number: string;
    group?: string;
    instagram?: string;
  }>({
    name: "",
    email: "",
    phone_number: "",
    group: "Offline",
    instagram: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addCustomer({ ...formData });
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
    <section>
      <form
        className="space-y-4 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter customer name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Email address
          </label>
          <input
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter customer email"
            type="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="flex gap-[32px] flex-col">
          <div className="flex-1">
            <label className="block text-[20px] font-medium text-[#24272E]">
              Phone number
            </label>
            <input
              className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
              placeholder="Enter phone number"
              id="phone_number"
              onChange={handleChange}
              value={formData.phone_number}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-[20px] font-medium text-[#24272E]">
              Instagram
            </label>
            <input
              className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
              placeholder="@"
              id="instagram"
              onChange={handleChange}
              value={formData.instagram}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E] mb-1">
            Group
          </label>
          <p className="mb-3 text-[0.87rem] text-[#5C636D]">
            Add customer to any group
          </p>
          <div className="w-full flex relative items-center h-auto">
            <select
                    className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
              id="group"
              required
              value={formData.group}
              onChange={handleChange}
            >
              <option>Offline</option>
              <option>Online</option>
              <option>Girls</option>
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
          className="w-full bg-action-default text-white rounded-[24px] mt-4 hover:opacity-80 h-[67px] p-[16px] flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </section>
  );
};

export default MobileNewCustomers;
