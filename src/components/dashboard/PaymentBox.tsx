import React from 'react'
import { Button } from '../ui/button'

interface PaymentBoxProps {
  icon?: React.ReactNode
  title: string
  texts: string
  list: string[]
  buttonText: string
  onButtonClick?: () => void
}

const PaymentBox: React.FC<PaymentBoxProps> = ({
  icon,
  title,
  texts,
  list,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="w-[782px] h-[190px] absolute top-[440px] left-[336px] p-[16px_0px_0px_0px] rounded-tl-[8px] opacity-0">
      <div className="flex flex-col gap-[32px]">
        {/* Icon and Title Section */}
        <div className="flex items-center gap-4">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <h3 className="text-[1rem] font-medium leading-6 text-primary">{title}</h3>
        </div>

        {/* Text Section */}
        <div className="text-[#5C636D] text-[14px] leading-5">
          {texts}
        </div>

        {/* List Section */}
        <div className="flex items-center">
          {list.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div className="w-[8px] h-[8px] rounded-full bg-[#5C636D] mx-3" />
              )}
              <span className="text-[#5C636D] text-sm">{item}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Button Section */}
        <div className="pt-4">
          <Button
            onClick={onButtonClick}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentBox