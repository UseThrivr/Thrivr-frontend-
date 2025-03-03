import { useData } from "@/context/DataContext";
import axios from "axios";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const MobileNewStaff = () => {
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const permissions = [
    {
      title: "Products (Inventory)",
      name: "products",
    },
    {
      title: "Manage payments",
      name: "manage-payments",
    },
    {
      title: "Store settings",
      name: "store-settings",
    },
    {
      title: "Orders",
      name: "orders",
    },
    {
      title: "Customers",
      name: "customers",
    },
    {
      title: "Business reports",
      name: "business-reports",
    },
  ];

  return (
    <div className="py-6 overflow-auto invincible-scrollbar">
      <form
        className="w-full flex flex-col gap-4 z-10 relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full gap-4">
          <label
            htmlFor="full-name"
            className="block text-base font-medium text-text-primary"
          >
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Enter full name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="border border-neutral-border p-3 rounded-lg w-full appearance-none text-text-secondary text-base font-medium"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label
            htmlFor="email"
            className="block text-base font-medium text-text-primary"
          >
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Enter email address"
            id="email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-neutral-border p-3 rounded-lg w-full appearance-none text-text-secondary text-base font-medium"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label
            htmlFor="role"
            className="block text-base font-medium text-text-primary"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex relative items-center h-auto">
            <select
              required
              className="border border-neutral-border p-3 pr-10 rounded-lg w-full appearance-none text-text-secondary text-base font-medium"
              value={formData.role}
              onChange={handleChange}
              id="role"
            >
              <option disabled selected value="">
                Choose the role for this team member
              </option>
              <option value="product-manager">Product Manager</option>
              <option value="digital-marketer">Digital Marketer</option>
            </select>
            <ChevronDown className="pointer-events-none right-3 size-6 absolute" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="full-name"
              className="block text-base font-medium text-text-primary"
            >
              Set permissions <span className="text-red-500">*</span>
            </label>
            <p className="font-medium text-sm">
              Allow the user to add, edit, or remove{" "}
            </p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            {permissions.map((perm) => (
              <label
                className="flex gap-2 items-center"
                key={perm.name}
                htmlFor={perm.name}
              >
                <input
                  type="checkbox"
                  id={perm.name}
                  checked={
                    formData.permissions[
                      perm.name as keyof typeof formData.permissions
                    ]
                  }
                  onChange={handleChange}
                />
                {perm.title}
              </label>
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-action-default text-white rounded-2xl  hover:opacity-80 p-4"
        >
          {loading ? (
            <Loader2 className="animate-spin mx-auto w-6" />
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </div>
  );
};

export default MobileNewStaff;
