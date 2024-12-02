import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavLeft = () => {
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [route] = pathname.match(/\w+/g) ?? [''];

    return (
        <div className="flex items-center lg:p-0 gap-[16px] right-0 top-0 left-0 h-[70px] px-3 fixed lg:relative lg:justify-between w-full">
            <button
                onClick={() => navigate(-1)}
                className="size-[48px] bg-neutral-alt-b rounded-[8px] flex items-center justify-center"
            >
                <ArrowLeft className="text-black" />
            </button>
            <h2 className="font-semibold text-[32px] leading-[35px] tracking-[-0.01em] text-text-primary">
                {`Edit ${route.toLowerCase()}`}
            </h2>
        </div>
    )
}

export default NavLeft;