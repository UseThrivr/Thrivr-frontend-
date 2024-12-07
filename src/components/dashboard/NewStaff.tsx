import { ChevronDown, ChevronLeft, X } from "lucide-react";
import MobileNewStaff from "./MobileNewStaff";

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
    <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
      <div className="relative z-40 h-[80vh] w-[60vw] bg-white rounded-lg py-8 px-8 shadow-lg animate-scaleIn lg:flex justify-center hidden">
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={onClose}
            className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
          >
            <X className="text-gray-700" />
          </button>
          <h2 className="text-xl md:text-2xl 2xl:text-4xl font-semibold text-[#24272E]">
            Add team member
          </h2>

          <form className="w-full flex flex-col gap-4 overflow-auto py-4 pr-2 pl-4">
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
                className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
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
                className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
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
                  className="border border-neutral-border p-3 rounded-lg w-full focus:outline-none appearance-none text-text-secondary text-base font-medium"
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
              <div className="w-full grid grid-cols-3 grid-rows-2 gap-4">
                {permissions.map((_, i) => (
                  <label className="flex gap-2 items-center" key={i} htmlFor={_.name}>
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
      <div className="flex lg:hidden bg-white w-full fixed h-screen flex-col">
        <Nav title="Add team member" onClose={onClose} />
        <MobileNewStaff />
      </div>
    </div>
  );
};

const Nav = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className="flex items-center lg:p-0 gap-4 right-0 top-0 left-0 px-7 py-6 static lg:justify-between w-full">
      <button
        onClick={onClose}
        className=" lg:size-[48px] bg-neutral-alt-b rounded-[8px] flex items-center justify-center p-1"
      >
        <ChevronLeft className="text-black flex size-5" />
      </button>
      <h2 className="font-semibold text-[24px] lg:text-[32px] leading-[26.4px] lg:leading-[35px] tracking-[-0.03em] lg:tracking-[-0.01em] text-text-primary">
        {title}
      </h2>
    </div>
  );
};

export default NewStaff;
