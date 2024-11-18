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
      className={cn("lg:hidden translate-x-12", className)}
    >
      <Menu size={34} />
    </button>
  )
}

export default MobileMenu
