import { cn } from "@/lib/utils"
import MobileMenu from "./mobile-menu"
import { BellDot, ChevronDown, MessageCircleQuestion, Store } from "lucide-react";
import userImage from "@/assets/user-img.png"

interface NavRightProps {
  onMobileMenuClick: () => void;
}

const NavRight = ({ onMobileMenuClick }: NavRightProps) => {
  return (
    <div className="flex items-center justify-between w-full px-4 lg:px-0">
      <MobileMenu onClick={onMobileMenuClick} className="lg:hidden" />
      
      <div className="hidden lg:flex items-start h-[48px] gap-[32px] p-0">
        <div className="flex items-center p-0 gap-[24px] h-[46px]">
            <div
                className={cn(
                    "flex justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default hover:bg-action-hover rounded-[24px]",
                    "font-medium text-[20px] leading-[30px] text-white"
                )}
            >
                <Store size={24} className="text-white" />
                My Thrivr Store
            </div>
            <div
                className={cn(
                    "box-border flex justify-center items-center py-[8px] px-[16px] h-[46px] gap-[16px] bg-white border border-solid border-action-default rounded-[24px]",
                    "font-medium text-[20px] leading-[30px] text-action-default"
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

      {/* Always visible actions */}
      <div className="flex items-center gap-4">
        <BellDot size={24} className="text-text-secondary" />
        <div className="flex items-center gap-2">
          <div
            className="box-border size-[48px] border border-solid border-text-secondary rounded-[24px]"
            style={{ background: `url(${userImage})` }}
          />
          <ChevronDown size={24} className="text-text-secondary hidden lg:block" />
        </div>
      </div>
    </div>
  )
}

export default NavRight;