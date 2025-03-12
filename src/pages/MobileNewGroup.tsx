import { useData } from "@/context/DataContext";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const MobileNewGroup = () => {
  const { addGroup } = useData();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
  }>({
    name: "",
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
      await addGroup(formData.name);
      toast.success("Group added successfully!");
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
        className="space-y-4 w-full flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Group name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
            placeholder="Enter group name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        {/* <div>
          <label className="block text-[20px] font-medium text-[#24272E] mb-1">
            Group
          </label>
          <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[14px] mt-1">
            <select className="h-full w-full bg-transparent outline-none border-none">
              <option>Select customers</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[20px] font-medium text-[#24272E]">
            Description
          </label>
          <label className="mb-3 text-[0.87rem] text-[#5C636D]">
            Write a short description for the customer group
          </label>
          <textarea
            className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] h-[197px] p-[16px] mt-2"
            rows={4}
          />
        </div> */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-action-default text-white rounded-2xl  hover:opacity-80 p-4 flex items-center justify-center gap-4"
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

export default MobileNewGroup;
