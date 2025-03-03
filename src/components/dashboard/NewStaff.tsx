import { useData } from "@/context/DataContext";
import axios from "axios";
import { ChevronDown, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface NewStaffProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewStaff: React.FC<NewStaffProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: {
      products: false,
      manage_payments: false,
      edit_store_settings: false,
      order: false,
      customers: false,
      business_reports: false,
    },
  });
  const { addStaff } = useData();

  // Close modal on 'Esc' key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type, checked } = event.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [id]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addStaff(formData);
      console.log("Form Submitted:", formData);
      // Show success toast
      toast.success("Staff member added successfully!");
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      if (axios.isAxiosError(error)) {
      console.error("Error submitting form:", error.response?.data);
      // Show error toast
      toast.error("Failed to add staff member. Please try again.");
      } else {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    // Handle API submission logic here
  };

  if (!isOpen) return null;

  const permissions = [
    { title: "Products (Inventory)", name: "products" },
    { title: "Manage payments", name: "manage_payments" },
    { title: "Store settings", name: "edit_store_settings" },
    { title: "Orders", name: "order" },
    { title: "Customers", name: "customers" },
    { title: "Business reports", name: "business_reports" },
  ];

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#000000CC] flex justify-center z-50 overflow-auto"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="py-24 flex items-center min-h-fit w-full justify-center">
        <div className="relative h-max lg:w-[600px] xl:w-[800px] bg-white rounded-lg py-8 px-8 shadow-lg scale-95 animate-scaleIn flex justify-center">
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onClose}
              className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="text-gray-700" />
            </button>
            <h2 id="modal-title" className="text-4xl font-semibold text-[#24272E]">
              Add team member
            </h2>
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="name" className="block text-base font-medium text-text-primary">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter full name"
                  id="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-neutral-border p-3 rounded-lg w-full text-text-secondary text-base font-medium"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="email" className="block text-base font-medium text-text-primary">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter email address"
                  id="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-neutral-border p-3 rounded-lg w-full text-text-secondary text-base font-medium"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="role" className="block text-base font-medium text-text-primary">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex relative items-center">
                  <select
                    required
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border border-neutral-border p-3 rounded-lg w-full text-text-secondary text-base font-medium appearance-none"
                  >
                    <option disabled value="">
                      Choose the role for this team member
                    </option>
                    <option value="product_manager">Product Manager</option>
                    <option value="digital_marketer">Digital Marketer</option>
                  </select>
                  <ChevronDown className="pointer-events-none right-3 size-6 absolute" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col items-start gap-1">
                  <label className="block text-base font-medium text-text-primary">
                    Set permissions <span className="text-red-500">*</span>
                  </label>
                  <p className="font-medium text-sm">Allow the user to add, edit, or remove</p>
                </div>
                <div className="w-full grid grid-cols-3 grid-rows-2 gap-4">
                  {permissions.map((perm) => (
                    <label className="flex gap-2 items-center" key={perm.name} htmlFor={perm.name}>
                      <input
                        type="checkbox"
                        id={perm.name}
                        checked={formData.permissions[perm.name as keyof typeof formData.permissions]}
                        onChange={handleChange}
                      />
                      {perm.title}
                    </label>
                  ))}
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
              <button disabled={loading} type="submit" className="w-full bg-action-default text-white rounded-2xl hover:opacity-80 p-4">
                {loading ? <Loader2 className="animate-spin mx-auto w-6" /> : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStaff;
