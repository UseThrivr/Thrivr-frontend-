import { useState, useEffect } from "react";
import { Seo } from "@/components/global";
import SalesCard from "@/components/dashboard/SalesCard";
import BarChart from "@/components/dashboard/BarChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import authAxios from "@/api/authAxios";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TopProductData {
  productName: string;
  totalOrders: number;
  quantity: number;
  sellingPrice: number;
  category: string;
  status: string;
}

const Sales = () => {
  const [topProductsData, setTopProductsData] = useState<
    TopProductData[] | null
  >(null);
  const [error, setError] = useState(false);
  const labels = [
    "Jan 24",
    "Feb 24",
    "Mar 24",
    "Apr 24",
    "May 24",
    "Jun 24",
    "Jul 24",
    "Aug 24",
    "Sep 24",
    "Oct 24",
    "Nov 24",
    "Dec 24",
  ];
  const dataPoints = [50, 100, 120, 169, 78, 200, 246, 280, 150, 168, 178, 246];

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await authAxios.get("/api/v1/sales");
        const sales = response.data;

        setTopProductsData(sales.data);
      } catch (error) {
        console.log(error);
        setError(true);
        if (axios.isAxiosError(error)) {
          toast.error(error.message);
        }
      }
    };
    fetchSales();
  }, []);

  const navigate = useNavigate()

  return (
    <>
      <Seo title="Sales" />
      <section className="w-full pt-[1rem]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary hidden md:flex">
            Sales
          </h1>
          <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">
            Check the full inventory list for your shop
          </p>
        </div>
        <div className="flex items-center justify-end w-full py-[8px] px-[16px] gap-[16px] text-action-default">
          <h4 className="font-[500] text-[12px] md:text-[20px] md:leading-[30px] md:text-[#5c636d]">
            Last 7 days
          </h4>
          <ChevronDown className="size-[18px] md:size-6" />
        </div>
        <SalesCard />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
          {/* Section 1 Chart */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-semibold tracking-[-1%] md:leading-[35.2px] text-base md:text-[24px] text-text-primary">
                Total Sales
              </h1>

              <div className="lg:w-[203px] h-full flex gap-[8px] items-center text-text-secondary font-medium text-base">
                <p className="">Jan 1, 2024</p>
                <span className="">-</span>
                <p className="">Dec 31, 2024</p>
              </div>
            </div>
            <div className="w-full">
              <BarChart labels={labels} dataPoints={dataPoints} />
            </div>
          </div>

          {/* Section 2 Chart */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-semibold tracking-[-1%] md:leading-[35.2px] text-base md:text-[24px] text-text-primary min-w-max">
                  Thrivr store
                </h1>
                <ChevronDown />
              </div>

              <div className="lg:w-[203px] h-full flex gap-[8px] items-center">
                <p className="">Jan 1, 2024</p>
                <span className="">-</span>
                <p className="">Dec 31, 2024</p>
              </div>
            </div>
            <div className="w-full">
              <BarChart labels={labels} dataPoints={dataPoints} />
            </div>
          </div>
        </div>

        <div className="w-full lg:mt-10 lg:h-[232px] gap-[32px] mt-8">
          {/* Table Section */}
          <div className="w-full lg:h-[232px] flex flex-col gap-[32px]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold tracking-[-1%] md:leading-[35.2px] text-base md:text-[24px] text-text-primary">
                Top products
              </h2>
              <button onClick={() => navigate("/inventory")} className="text-[#870E73] text-[16px] leading-[30px]">
                View all
              </button>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-20 w-20 text-5xl items-center justify-center flex text-white bg-red-500 rounded-full">
                  !
                </div>
                <p className="text-gray-600 text-lg">
                  An error occured whil fetching your sales!
                </p>
              </div>
            ) : topProductsData === null ? (
              // Skeleton Loader
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[54px] bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            ) : topProductsData.length < 1 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9 13h6v2H9v-2zm0-4h6v2H9V9z" />
                </svg>
                <p className="text-gray-600 text-lg">No sales data available</p>
              </div>
            ) : (
              <Table className="border-separate rounded-[8px] border-spacing-0 overflow-hidden border border-solid border-neutral-border">
                <TableHeader>
                  <TableRow className="bg-neutral-alt-b lg:h-[54px] py-[16px] px-[16px] rounded-[8px]">
                    <TableHead>Product name</TableHead>
                    <TableHead>Total orders</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Selling price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProductsData.map((product, index) => (
                    <TableRow
                      key={index}
                      className="h-[54px] bg-neutral-alt p-[16px]"
                    >
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.totalOrders}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        ₦{product.sellingPrice.toLocaleString()}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <span
                          className={`uppercase rounded-[8px] px-[8px] py-[4px] ${
                            product.status === "AVAILABLE"
                              ? "bg-[rgba(40,167,69,0.2)] text-[#28A745]"
                              : "bg-[rgba(220,53,69,0.2)] text-[#DC3545]"
                          }`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sales;
