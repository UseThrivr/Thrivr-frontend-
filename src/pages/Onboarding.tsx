import { P } from "@/components/global";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CheckMark from  "../assets/Checkmark.png"

const Onboarding = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard")
  }

  return (
    <div className="pb-10">
      <div className="text-start">
        <h1 className="text-4xl mb-2 font-semibold">Welcome to Thrivr</h1>
        <P>You can add other necessary details later</P>
      </div>
      <div className="w-full flex flex-col items-center gap-16 py-8">
        <img src={CheckMark} className="size-[128px]" />
        <p>Completed!</p>
      </div>
      <button onClick={handleClick} className="w-full rounded-3xl bg-[#870E73] text-white p-2 font-semibold flex items-center justify-center gap-4 h-[56px]">
        Proceed to dashboard <ArrowRight />
      </button>
    </div>
  );
};

export default Onboarding;
