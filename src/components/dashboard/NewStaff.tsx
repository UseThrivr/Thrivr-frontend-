import { ChevronDown, X } from "lucide-react";

interface NewStaffProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewStaff: React.FC<NewStaffProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-[#000000CC] justify-center z-50 hidden lg:flex overflow-auto">
      <div className="py-24 flex items-center min-h-fit">
        <div className="relative z-40 w-[900px] bg-white rounded-lg p-12 shadow-lg animate-scaleIn lg:flex justify-center hidden">
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onClose}
              className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
            >
              <X className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-semibold text-[#24272E]">
              Add team member
            </h2>
            <form className="w-full flex flex-col gap-4 ">
              <div className="flex flex-col w-full gap-4">
                <label
                  htmlFor="full-name"
                  className="block text-base font-medium text-text-primary"
                >
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter full name"
                  id="full-name"
                  required
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
                    className="border border-neutral-border p-3 rounded-lg w-full appearance-none text-text-secondary text-base font-medium"
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
                    className="block text-base font-medium text-text-primary"
                  >
                    Set permissions <span className="text-red-500">*</span>
                  </label>
                  <p className="font-medium text-sm">
                    Allow the user to add, edit, or remove{" "}
                  </p>
                </div>
                <div className="w-full grid grid-cols-3 grid-rows-2 gap-4">
                  {permissions.map((_, i) => (
                    <label
                      className="flex gap-2 items-center"
                      key={i}
                      htmlFor={_.name}
                    >
                      <input type="checkbox" name={_.name} id={_.name} />
                      {_.title}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-action-default text-white rounded-2xl  hover:opacity-80 p-4"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStaff;
