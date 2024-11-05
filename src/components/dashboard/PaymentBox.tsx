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
    <div className="w-[782px] h-[190px] p-[16px] bg-[#FDF2FB] rounded-[8px] mb-[32px]">
      <div className="flex gap-[32px]">
        {/* Icon Section */}
        <div className="flex-shrink-0 flex w-[64px] h-[64px] rounded-full items-center justify-center p-[12.8px] bg-white gap-[16px]">
          {icon}
        </div>

        {/* Content Section */}
        <div className="flex flex-col w-[544px] h-[158px] gap-[24px]">
          <div className="w-full h-[94px] flex flex-col gap-[8px]">
            <h3 className="text-[20px] font-medium leading-[30px] text-black">{title}</h3>
            
            <div className="text-[#5C636D] text-[16px] leading-6 font-medium">
              {texts}
            </div>

            <div className="flex items-center">
              {list.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#5C636D] mx-3" />
                  )}
                  <span className="text-[#5C636D] text-[16px] leading-6 font-medium">{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="">
            <Button
              onClick={onButtonClick}
              className="bg-action-default w-[187px] h-[40px] rounded-[28px] px-[24px] py-[8px] text-white hover:bg-action-default/90 font-medium leading-6 text-[1rem]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentBox