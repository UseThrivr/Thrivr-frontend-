import { Seo } from "@/components/global";
import SalesCard from "@/components/dashboard/SalesCard";
import BarChart from "@/components/dashboard/BarChart2";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    ChevronDown,
} from "lucide-react";
interface TopProductData {
    productName: string;
    totalOrders: number;
    quantity: number;
    sellingPrice: number;
    category: string;
    status: string;
}

// Add this data array
const topProductsData: TopProductData[] = [
    {
        productName: "iPhone 14 Pro 128 GB",
        totalOrders: 200,
        quantity: 450,
        sellingPrice: 750000,
        category: "Phone",
        status: "AVAILABLE"
    },
    {
        productName: "iPhone 14 Pro 128 GB",
        totalOrders: 200,
        quantity: 450,
        sellingPrice: 750000,
        category: "Phone",
        status: "AVAILABLE"
    }
];

const Sales = () => {
    const labels = ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24'];
    const dataPoints = [50, 100, 120, 169, 78, 200, 246, 280, 150, 168, 178, 246]

    return (
        <>
            <Seo title="Sales" />
            <section className="w-full h-screen pt-[1rem] px-[2rem]">
                <div className="flex flex-col gap-[4px]">
                    <h1 className="font-[600] text-[48px] leading-[52.8px] tracking-[-1%] text-primary">Sales</h1>
                    <p className="text-[1rem] leading-[22.4px] font-[500] text-[#5c636d]">Check the full inventory list for your shop</p>
                </div> 
                <div className="flex items-centerz justify-end w-full py-[8px] px-[16px] gap-[16px]">
                    <ChevronDown />
                    <h4 className="font-[500] text-[20px] leading-[30px] text-[#5c636d]">This month</h4>
                </div>
                <SalesCard />
                <div className="w-full h-[322.97px] flex gap-[32px]">
                    {/* Section 1 Chart */}
                    <div className="w-1/2 h-full flex flex-col gap-[24px]">
                        <div className="w-full h-[34px] flex items-center justify-between">
                            <h1 className="font-semibold tracking-[-1%] leading-[35.2px] text-[24px]">Total Sales</h1>

                            <div className="w-[203px] h-full flex gap-[8px] items-center">
                                <p className="">Jan 1, 2024</p>
                                <span className="">-</span>
                                <p className="">Dec 31, 2024</p>
                            </div>
                        </div>
                        <div className="w-full h-[280px]">
                            <BarChart labels={labels} dataPoints={dataPoints} />
                        </div>
                    </div>

                    {/* Section 2 Chart */}
                    <div className="w-1/2 h-full flex flex-col gap-[24px]">
                        <div className="w-full h-[34px] flex items-center justify-between">
                            <div className="flex items-center gap-[16px]">
                                <h1 className="font-semibold tracking-[-1%] leading-[35.2px] text-[24px]">Thrivr store </h1>
                                <ChevronDown />                            
                            </div>

                            <div className="w-[203px] h-full flex gap-[8px] items-center">
                                <p className="">Jan 1, 2024</p>
                                <span className="">-</span>
                                <p className="">Dec 31, 2024</p>
                            </div>
                        </div>
                        <div className="w-full h-[280px]">
                            <BarChart labels={labels} dataPoints={dataPoints} />
                        </div>
                    </div>
                </div>

                <div className="w-full h-[232px] flex flex-col gap-[32px] mt-[100px] pb-96">
                    {/* table section */}

                    <div className="w-full h-[232px] flex flex-col gap-[32px]">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-[24px] leading-[35.2px]">Top products</h2>
                            <button className="text-[#870E73] text-[16px] leading-[30px]">View all</button>
                        </div>
                        
                        <Table className="border-separate rounded-[8px] border-spacing-0 overflow-hidden border border-solid border-neutral-border">
                            <TableHeader>
                                <TableRow className="bg-neutral-alt-b h-[54px] py-[16px] px-[16px] rounded-[8px]">
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
                                    <TableRow key={index} className="h-[54px] bg-neutral-alt p-[16px]">
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{product.totalOrders}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>₦{product.sellingPrice.toLocaleString()}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <span className="uppercase rounded-[8px] px-[8px] py-[4px] bg-[rgba(40,167,69,0.2)] text-[#28A745]">
                                                {product.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sales;
