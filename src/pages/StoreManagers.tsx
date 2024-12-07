import NewStaff from "@/components/dashboard/NewStaff";
import { Cross, Trash } from "lucide-react";
import { useState } from "react";

const StoreManagers = () => {
  const [isNewStaffOpen, setIsNewStaffOpen] = useState(false);

  return (
    <section className="w-full flex flex-col items-end gap-12">
      <button
        onClick={() => setIsNewStaffOpen(true)}
        className="flex items-center gap-4 py-2 xl:py-4 px-4 xl:px-12 bg-action-default rounded-2xl xl:rounded-3xl"
      >
        <Cross fill="white" className="text-transparent size-4" />
        <span className="font-medium text-base text-white">Add new staff</span>
      </button>
      <ul className="w-full gap-9 xl:gap-0 xl:px-8 xl:border xl:bg-neutral-alt xl:border-neutral-border rounded-lg flex flex-col xl:divide-y xl:divide-neutral-border">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
          <>
            <li className="hidden xl:flex w-full py-8 gap-1 justify-between items-center">
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium text-base text-text-secondary">
                  Staff
                </h3>
                <div className="flex flex-col items-start">
                  <h2 className="font-medium text-xl text-action-default">
                    Adedayo Samuel
                  </h2>
                  <p className="font-normal text-base text-text-secondary">
                    adedayosam@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium text-base text-text-secondary">
                  Role
                </h3>
                <p className="font-medium text-xl text-text-primary">
                  Assistant Manager
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium text-base text-text-secondary">
                  Date added
                </h3>
                <p className="font-medium text-xl text-text-primary">
                  10-4-2024
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium text-base text-text-secondary">
                  Access Level
                </h3>
                <p className="font-medium text-xl text-text-primary">Full</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium text-base text-text-secondary">
                  Last login
                </h3>
                <p className="font-medium text-xl text-text-primary">13:56</p>
              </div>
              <div className="flex items-center justify-end">
                <Trash className="cursor-pointer size-6" />
              </div>
            </li>
            <li className="flex flex-col w-full xl:hidden gap-4 px-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 items-start">
                  <h3 className="font-medium text-xs text-text-secondary">
                    Assistant Manager
                  </h3>
                  <div className="flex flex-col items-start gap-1">
                    <h2 className="font-medium text-base text-action-default">
                      Adedayo Samuel
                    </h2>
                    <p className="font-normal text-base text-text-secondary">
                      adedayosam@gmail.com
                    </p>
                  </div>
                </div>
                <div>
                  <Trash className="cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col items-start">
                  <h3 className="font-medium text-xs text-text-secondary">
                    Access Level
                  </h3>
                  <p className="font-medium text-base text-text-primary">
                    Full
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="font-medium text-xs text-text-secondary">
                    Last login
                  </h3>
                  <p className="font-medium text-base text-text-primary">
                    13:56
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="font-medium text-xs text-text-secondary">
                    Date added
                  </h3>
                  <p className="font-medium text-base text-text-primary">
                    10-4-2024
                  </p>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
      <NewStaff
        isOpen={isNewStaffOpen}
        onClose={() => setIsNewStaffOpen(false)}
      />
    </section>
  );
};

export default StoreManagers;
