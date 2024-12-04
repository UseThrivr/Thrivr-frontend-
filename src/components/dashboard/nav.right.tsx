// src/components/dashboard/NavRight.tsx
import { cn } from "@/lib/utils"
import MobileMenu from "./mobile-menu"
import { BellDot, ChevronDown, MessageCircleQuestion, Store } from "lucide-react"
import userImage from "@/assets/user-img.png"
import { useSidebar } from "@/context/SidebarContext"

const NavRight = () => {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <div className="flex px-3 overflow-hidden lg:relative items-center justify-end lg:justify-between w-full">
      <MobileMenu onClick={toggleMobileSidebar} className="lg:hidden" />
      
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
          <ChevronDown size={24} className="text-text-secondary hidden lg:block" />
        </div>
      </div>
    </div>
  )
}

export default NavRight