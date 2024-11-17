import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  onClick: () => void;
  className?: string;
}

const MobileMenu = ({ onClick, className }: MobileMenuProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn("lg:hidden p-2", className)}
    >
      <Menu size={24} />
    </button>
  )
}

export default MobileMenu
