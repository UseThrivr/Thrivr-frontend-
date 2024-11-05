import ThrivrImg from '@/assets/thrivr-logo.png'

export const ThrivrHeader = () => (
    <div className="w-[150px] h-[32px] flex gap-[17px] items-center">
        <img src={ThrivrImg} alt="" className="w-[29px] translate-x-2 scale-[4] h-[29px]" />
        <h1 className="text-action-default text-[41.14px] font-bold leading-[32px] tracking-[-2%]">Thrivr</h1>
    </div>
)