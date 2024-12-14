import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  name: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ name, percentage }) => {
  return (
    <div className="flex flex-col gap-[8px] w-full h-[40px]">
      <div className="flex justify-between w-full h-[24px]">
        <h2 className="text-[#5c636d] font-[500] text-base md:leading-[24px]">{name}</h2>
        <span className='text-[#5c636d] font-[500] text-sm md:text-[1rem] leading-[24px]'>{percentage}%</span>
      </div>
      <Progress value={percentage} />
    </div>
  );
};

export default ProgressBar;
