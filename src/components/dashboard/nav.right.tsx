// src/components/dashboard/NavRight.tsx
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";
import {
  BellDot,
  ChevronDown,
  MessageCircleQuestion,
  Store,
} from "lucide-react";
import userImage from "@/assets/user-img.png";
import { useSidebar } from "@/context/SidebarContext";
import { useLocation } from "react-router-dom";

const NavRight = () => {
  const { toggleMobileSidebar } = useSidebar();
  const { pathname } = useLocation();
  const [route] = pathname.match(/\w+/g) ?? [""];

  return (
    <div className="flex overflow-hidden lg:relative items-center justify-end lg:justify-between w-full">
      <div className="lg:hidden w-full justify-between flex items-end">
        <div>
          <div className="md:hidden">
            {route === "dashboard" && (
              <div className="flex gap-4 items-center">
                <div
                  className="box-border size-[32px] border border-solid border-text-secondary rounded-[24px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${userImage})` }}
                />
                <div className="flex flex-col items-start">
                  <p className="font-normal text-xs text-text-primary">
                    John Stephen
                  </p>
                  <p className="font-medium text-[10px] text-text-secondary">
                    johngadgets.thrivr.shop
                  </p>
                </div>
              </div>
            )}
            {route === "sales" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Sales
              </h1>
            )}
            {route === "inventory" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Product Inventory
              </h1>
            )}
            {route === "orders" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Orders
              </h1>
            )}
            {route === "customers" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Customers
              </h1>
            )}
            {route === "todo" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Things to do
              </h1>
            )}
            {route === "mybank" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Bank accounts
              </h1>
            )}
            {route === "integration" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Integrate apps
              </h1>
            )}
            {route === "ads" && (
              <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
                Campaign & Ads
              </h1>
            )}
          </div>
        </div>
        <MobileMenu onClick={toggleMobileSidebar} className="" />
      </div>

      <div className="hidden lg:flex items-end h-[48px] gap-[32px] p-0">
        <div className="flex items-center p-0 gap-[24px] h-[46px]">
          <div
            className={cn(
              "flex justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default hover:bg-action-hover rounded-[24px]",
              "font-medium text-[20px] leading-[30px] text-white whitespace-nowrap"
            )}
          >
            <Store size={24} className="text-white" />
            My Thrivr Store
          </div>
          <div
            className={cn(
              "box-border flex justify-center items-center py-[8px] px-[16px] h-[46px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px]",
              "font-medium text-[20px] leading-[30px] text-action-default whitespace-nowrap"
            )}
          >
            <ChevronDown size={24} className="text-action-default" />
            Free
          </div>
        </div>
        <div className="flex justify-end items-center p-0 gap-[24px] h-[48px]">
          <MessageCircleQuestion size={24} className="text-text-secondary" />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4 ml-auto">
        <BellDot size={24} className="text-text-secondary" />
        <div className="flex items-center gap-2">
          <div
            className="box-border size-[48px] border border-solid border-text-secondary rounded-[24px] bg-cover bg-center"
            style={{ backgroundImage: `url(${userImage})` }}
          />
          <ChevronDown
            size={24}
            className="text-text-secondary hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default NavRight;
