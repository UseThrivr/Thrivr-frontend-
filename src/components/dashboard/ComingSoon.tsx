import { ChevronLeft, X } from "lucide-react";
import MobileComingSoon from "./MobileComingSoon";

interface CustomerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoon: React.FC<CustomerPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
      <div className="relative z-40 h-[70vh] w-[50vw] bg-white invincible-scrollbar rounded-lg py-8 px-8 shadow-lg animate-scaleIn lg:flex justify-center hidden">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <button
            onClick={onClose}
            className="absolute -top-12 -right-12 size-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
          >
            <X className="text-gray-700" />
          </button>
          <p className="font-bold text-2xl">
            Coming Soon...
          </p>
        </div>
      </div>
      <div className="flex lg:hidden bg-white w-full fixed h-screen flex-col">
        <Nav title={""} onClose={onClose} />
        <MobileComingSoon />
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

export default ComingSoon;
