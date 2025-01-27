import { Seo } from "@/components/global"
import OverviewCard from "@/components/dashboard/OverviewCard"
import { ChevronDown, Copy, ShoppingBag, Store } from "lucide-react"
import BarChart from "@/components/dashboard/BarChart"
import ProgressBar from "@/components/dashboard/ProgressBar"
// import { progressData } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import { useDashboard } from "@/context/DashboardContext"
import { useEffect } from "react"

const Dashboard = () => {
  const { user } = useAuth()
  const { dashboardData, fetchDashboardData } = useDashboard()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data)
  }

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Seo title="Dashboard" />
      <section className="w-full lg:pt-[1rem]">
        <div className="mb-[28px] flex gap-[14px] md:hidden">
          {[
            {
              name: "Visit store",
              icon: <Store size={18} />,
              color: "text-text-secondary",
              link: dashboardData.storeUrl,
            },
            {
              name: "Copy link",
              icon: <Copy size={18} />,
              color: "text-action-default",
              link: dashboardData.storeUrl,
            },
          ].map(({ name, icon, color, link }, i) => (
            <button
              key={i}
              onClick={() => (name === "Copy link" ? handleCopy(link) : window.open(link, "_blank"))}
              className={`bg-neutral-alt-b py-[6px] px-2 rounded-full gap-2 flex items-center ${color} font-medium text-xs cursor-pointer leading-[18px]`}
            >
              {icon}
              {name}
            </button>
          ))}
        </div>
        <div className="hidden md:flex flex-col gap-[4px]">
          <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">
            Hello, {user?.full_name.split(" ")[0]}
          </h1>
          <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">
            An overview of how your business is fairing
          </p>
        </div>
        <div className="w-full flex items-end">
          <div className="flex-col flex md:hidden items-start gap-4">
            <h2 className="font-medium text-xs">Total sales</h2>
            <p className="font-semibold text-2xl text-text-primary">₦{dashboardData.totalSales.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-end w-full py-[8px] px-[16px] gap-[16px] text-action-default md:text-[#5c636d]">
            <h4 className="font-[500] text-[12px] md:text-[20px] md:leading-[30px]">Last 7 days</h4>
            <ChevronDown className="size-[18px] md:size-6" />
          </div>
        </div>
        <OverviewCard data={dashboardData.overview} />

        <div className="w-full lg:h-[501px] flex flex-col lg:flex-row justify-between gap-[32px]">
          <div className="chart w-full lg:w-2/3 lg:h-[484px] hidden md:flex flex-col gap-[32px]">
            <div className="w-full h-[65px] flex justify-between">
              <div className="lg:w-[312px] h-[65px] flex flex-col gap-[8px]">
                <h1 className="font-semibold tracking-[-1%] leading-[35.2px] text-[32px]">Order Trends</h1>
                <p className="font-[400] text-sm lg:text-[16px] leading-[20.83px] text-[#5c636d]">
                  How your orders fluctuate overtime
                </p>
              </div>

              <div className="lg:w-[340px] h-[46px] flex gap-[24px] items-center">
                <div className="lg:w-[117px] lg:h-[46px] rounded-[16px] px-3 lg:px-[16px] py-1 lg:py-[8px] flex gap-[16px]">
                  <p className="">{new Date().getFullYear()}</p>
                  <ChevronDown />
                </div>

                <a
                  href="#"
                  className="box-border flex items-center justify-center py-[8px] px-[16px] gap-[16px] h-[46px] border border-solid border-action-default rounded-[24px] text-action-default"
                >
                  <ShoppingBag />
                  <span className="font-medium text-sm lg:text-xl leading-[30px] capitalize whitespace-nowrap">
                    record order
                  </span>
                </a>
              </div>
            </div>
            <BarChart labels={dashboardData.orderTrends.labels} dataPoints={dashboardData.orderTrends.data} />
          </div>
          <div className="flex sm:hidden flex-col gap-4 items-start w-full">
            <h2 className="font-medium text-base leading-5 text-text-primary">To do</h2>
            <div className="flex flex-col items-start gap-2 relative">
              {dashboardData.todos.map((todo: string, i: number) => (
                <div key={i} className="flex items-center gap-4 font-normal text-basemmt65 text-text-secondary">
                  <div>
                    <ShoppingBag size={24} />
                  </div>
                  {todo}
                </div>
              ))}
              <div
                className="absolute bottom-0 left-0 w-full bg-black h-[55px] items-end flex rounded-t-2xl p-[9px]"
                style={{
                  background: "linear-gradient(180deg, #FDF2FB 0%, #FFFFFF 51.17%)",
                }}
              >
                <button className="text-action-default font-normal text-base flex md:hidden">View all</button>
              </div>
            </div>
          </div>
          <div className="lg:w-[303px] lg:h-[484px] flex flex-col gap-[24px]">
            <div className="flex w-full justify-between">
              <h2 className="md:font-semibold font-medium text-[16px] md:text-[32px] md:leading-[35.2px] tracking-[-1%] text-primary whitespace-nowrap">
                Top sales channels
              </h2>
              <button className="text-action-default font-normal text-base flex md:hidden">View all</button>
            </div>
            <div className="h-full flex flex-col gap-[24px] pb-2">
              {dashboardData.topSalesChannels.map((item: any) => (
                <ProgressBar key={item.name} name={item.name} percentage={item.percentage} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard

