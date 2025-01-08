import ThrivrImg from '@/assets/thrivr-logo.png'

export const ThrivrHeader = () => (
    <a href='/' className="w-[150px] h-[32px] flex gap-[20px] items-center">
        <img src={ThrivrImg} alt="" className="w-[29px] translate-x-3 scale-[4] h-[29px]" />
        <h1 className="text-action-default text-[41.14px] font-bold leading-[32px] tracking-[-2%]">Thrivr</h1>
    </a>
)