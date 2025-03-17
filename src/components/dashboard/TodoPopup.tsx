// import { useState } from "react";
import { ChevronDown, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

interface TodoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoPopup: React.FC<TodoPopupProps> = ({ isOpen, onClose }) => {
  // const navigate = useNavigate()
  const { createTask } = useData();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    details: string;
    due_date: string;
    time: string;
    reminder: string;
  }>({
    title: "",
    details: "",
    due_date: new Date().toISOString().split("T")[0],
    time: "08:00",
    reminder: "1 hour before",
  });
  if (!isOpen) return null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    console.log(id, value);
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Attempt login using AuthContext's login method
      const formattedDate = formData.due_date.split("-").reverse().join("/");
      await createTask({
        title: formData.title,
        details: formData.details,
        due_date: formattedDate,
        time: formData.time,
        reminder: formData.reminder,
      });

      // Show success toast and navigate to dashboard
      toast.success("Updated Successfullly!");
      // navigate("/todo")
      window.location.reload();

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
    <div className="absolute top-0 left-0 w-full h-full bg-[#000000CC] hidden lg:flex justify-center z-50 overflow-auto">
      <div className="py-24 flex items-center min-h-fit w-full justify-center">
        <div className="relative h-max lg:w-[600px] xl:w-[800px] bg-white rounded-lg py-8 px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
          <div className="w-full flex flex-col gap-[48px]">
            <button
              onClick={onClose}
              className="absolute -top-[4.5rem] -right-16 w-[64px] h-[64px] bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <div className="">
              <h2 className="text-[32px] font-semibold leading-[35.2px] tracking-[-1%] text-[#24272E]">
                Update Schedule
              </h2>
            </div>

            <form
              className="space-y-4 w-full flex flex-col gap-[16px]"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-[20px] font-medium text-[#24272E]">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
              </div>
              <div className="w-full h-[102px] flex flex-col gap-[16px]">
                <label className="block text-[20px] font-medium text-[#24272E]">
                  Details (Optional) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-[56px] border border-gray-300 rounded-[8px] p-[16px]"
                  placeholder="Write..."
                  id="details"
                  required
                  value={formData.details}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex gap-[32px] items-center">
                <div className="w-full">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2"
                    id="due_date"
                    required
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-[20px] font-medium text-[#24272E]">
                    Select time <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full border bg-transparent border-[#CDCED3] rounded-[8px] p-[16px] mt-2">
                    <input
                      type="time"
                      className="w-full border-none bg-transparent outline-none"
                      id="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[20px] font-medium text-[#24272E] mb-1">
                  Reminder <span className="text-red-500">*</span>
                </label>
                <p className="mb-3 text-[0.87rem] text-[#5C636D]">
                  Get notified before the deadline to stay on track
                </p>
                <div className="w-full flex relative items-center h-auto">
                  <select
                    className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
                    id="reminder"
                    value={formData.reminder}
                    onChange={handleChange}
                    required
                  >
                    <option>1 hour before</option>
                    <option>1 day before</option>
                    <option>3 days before</option>
                    <option>7 days before</option>
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
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
