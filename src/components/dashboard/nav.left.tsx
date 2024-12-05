import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavLeft = () => {
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [route] = pathname.match(/\w+/g) ?? [''];

    return (
        <div className="flex items-center lg:p-0 gap-[16px] right-0 top-0 left-0 h-[35px] lg:h-[70px] px-3 relative lg:justify-between w-full">
            <button
                onClick={() => navigate(-1)}
                className="size-8 lg:size-[48px] bg-neutral-alt-b rounded-[8px] flex items-center justify-center p-1"
            >
                <ArrowLeft className="text-black hidden lg:flex" />
                <ChevronLeft className="text-black flex lg:hidden" />
            </button>
            <h2 className="font-semibold text-[24px] lg:text-[32px] leading-[26.4px] lg:leading-[35px] tracking-[-0.03em] lg:tracking-[-0.01em] text-text-primary">
                {`Edit ${route.toLowerCase()}`}
            </h2>
        </div>
    )
}

export default NavLeft;