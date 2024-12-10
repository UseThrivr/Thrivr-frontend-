import { H1, H4, P, Seo } from "@/components/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type CellContext,
  type Column,
  ColumnDef,
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Ellipsis,
  Plus,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

// Define the InventoryData type if not already defined
interface OrderData {
  orderId: string;
  name: string;
  listOfProducts: string[];
  amount: string;
  channel: string;
  date: string;
  status: "paid" | "part-paid" | "unpaid";
}

interface MobileData {
  status: "paid" | "part-paid" | "unpaid";
  orderId: string;
  name: string;
  amount: string;
  chevronRight?: string;
}

const columnHelper = createColumnHelper<OrderData>();
const mobileHelper = createColumnHelper<MobileData>();

function sortableHeader(
  title: string,
  column: Column<OrderData, string | number>
) {
  return (
    <div
      onClick={column.getToggleSortingHandler()}
      className="cursor-pointer flex items-center gap-2"
    >
      {title}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </div>
  );
}

function centerCell(data: CellContext<OrderData, string | number>) {
  return <div className="text-center">{data.getValue()}</div>;
}

function shortenCell(data: CellContext<OrderData, string>) {
  const value = data.getValue();
  const limit = 15;
  return value.slice(0, limit) + (value.length > limit ? "..." : "");
}

const mobile = [
  mobileHelper.accessor("status", {
    filterFn: "equalsString",
    cell: (info) => (
      <div
        className={`h-full w-2 ${
          info.getValue() === "unpaid"
            ? "bg-alert-red"
            : info.getValue() === "paid"
            ? "bg-alert-green"
            : "bg-[#777777]"
        }`}
      />
    ),
    header: "",
  }),
  mobileHelper.accessor("orderId", {
    cell: (info) => info.getValue(),
    header: "Order ID",
  }),
  mobileHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  mobileHelper.accessor("amount", {
    cell: (info) => info.getValue(),
    header: "Amount",
  }),
  mobileHelper.accessor("chevronRight", {
    cell: () => <ChevronRight className="text-action-default" />,
    header: "",
  }),
];

const columns = [
  columnHelper.accessor("orderId", {
    cell: (info) => (
      <span className="text-action-default underline">{info.getValue()}</span>
    ),
    header: "Order ID",
  }),
  columnHelper.accessor("name", {
    cell: shortenCell,
    header: "Name",
  }),
  columnHelper.accessor("listOfProducts", {
    cell: (info) => (
      <div className="flex flex-col items-start">
        {info.getValue().map((_, i) => (
          <div
            className="flex w-max"
            style={{
              display: "block",
            }}
            key={i}
          >
            {_}
          </div>
        ))}
      </div>
    ),
    header: "List of Products",
  }),
  columnHelper.accessor("amount", {
    cell: centerCell,
    header: (header) => sortableHeader("Amount(₦)", header.column),
  }),
  columnHelper.accessor("channel", {
    cell: (info) => {
      return centerCell({
        ...info,
        // @ts-expect-error ...
        getValue: () => shortenCell(info),
      });
    },
    header: (header) => sortableHeader("Channel", header.column),
  }),
  columnHelper.accessor("date", {
    cell: centerCell,
    header: (header) => sortableHeader("Date", header.column),
  }),
  columnHelper.accessor("status", {
    filterFn: "equalsString",
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          style={{
            background:
              status === "unpaid"
                ? "rgba(220, 53, 69, 0.2)"
                : status === "paid"
                ? "rgba(40, 167, 69, 0.2)"
                : "rgba(119, 119, 119, 0.2)",
          }}
          className={clsx(
            "uppercase w-max flex rounded-full py-1 px-[8px] text-center justify-center font-semibold text-xs",
            status === "unpaid"
              ? "text-alert-red"
              : status === "paid"
              ? "text-alert-green"
              : "text-[#777777]"
          )}
        >
          {status.replace(/-/g, " ")}
        </span>
      );
    },
    header: (header) => sortableHeader("Status", header.column),
  }),
];

const filterOptions: Array<{
  title: string;
  state?: OrderData["status"] | MobileData["status"];
}> = [
  {
    title: "All",
  },
  {
    title: "Completed",
    state: "paid",
  },
  {
    title: "Processing",
    state: "part-paid",
  },
  {
    title: "Cancelled",
    state: "unpaid",
  },
];

const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Tailwind `lg` breakpoint
    };

    updateScreenSize(); // Check initial screen size
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return isSmallScreen;
};

// Mock data function - replace this with your actual data fetching logic
const fetchOrderData = async (): Promise<OrderData[]> => {
  // Replace this with your actual API call
  return [
    {
      orderId: "ORD-00123",
      name: "John M.",
      listOfProducts: [
        "Iphone 14 (Pro)",
        "Iphone 14 (Pro max)",
        "Logitech Wireless Mouse",
      ],
      amount: "236,900",
      channel: "Instagram",
      date: "10-4-2024",
      status: "paid",
    },
    {
      orderId: "ORD-04123",
      name: "Oyedepo E.",
      listOfProducts: ["Iphone 14 (Pro)", "Iphone 14 (Pro max)"],
      amount: "236,900",
      channel: "Physical sales",
      date: "10-4-2024",
      status: "part-paid",
    },
    {
      orderId: "ORD-04123",
      name: "Oyedepo E.",
      listOfProducts: ["Iphone 14 (Pro)", "Iphone 14 (Pro max)"],
      amount: "236,900",
      channel: "Physical sales",
      date: "10-4-2024",
      status: "paid",
    },
    // Add more mock data as needed
  ];
};

const Orders = () => {
  const [data, setData] = useState<OrderData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const orderData = await fetchOrderData();
        setData(orderData);
      } catch (error) {
        console.error("Failed to fetch Order data:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  const isSmallScreen = useIsSmallScreen();

  const table = useReactTable({
    data,
    columns: isSmallScreen
      ? (mobile as ColumnDef<OrderData, unknown>[])
      : columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="text-3xl flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );
  }

  return (
    <section className="w-full gap-10 lg:gap-0 flex flex-col">
      <Seo title="Order" />
      <div className="flex flex-col items-start gap-[4px]">
        <H1 className="hidden lg:flex">Orders</H1>
        <h1 className="flex lg:hidden font-semibold text-2xl text-text-primary">
          Orders
        </h1>
        <P className="hidden lg:flex">
          View the complete list of orders for your business
        </P>
        <p className="font-normal text-base text-text-secondary flex lg:hidden">
          View the complete list of orders for your business
        </p>
      </div>

      {/* Tabs */}
      <div className="lg:mt-[54px] flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-4">
        <div className="flex items-start hide-scrollbar gap-[8px] w-full overflow-auto lg:overflow-visible">
          {filterOptions.map((filterOption, index) => {
            const column = table.getColumn("status");
            const filter = column?.getFilterValue();
            return (
              <H4
                key={index}
                onClick={() => column?.setFilterValue(filterOption.state)}
                className={clsx(
                  "text-center text-base px-3 py-1 lg:px-[8px] border-2 lg:border-0 border-text-primary border-dashed rounded-3xl lg:rounded-none cursor-pointer",
                  filter === filterOption.state &&
                    "lg:border-b-[4px] lg:border-x-0 lg:border-t-0 border-solid border-2 border-text-primary bg-text-primary text-white lg:text-black lg:bg-transparent"
                )}
              >
                {filterOption.title}
              </H4>
            );
          })}
        </div>

        <div className="flex items-center gap-6 w-full">
          <button className="flex items-center py-[12px] px-[16px] h-[44px] border border-solid border-neutral-border rounded-[8px] gap-4">
            <Search size={24} className="text-text-secondary" />
            <input type="text" className="w-full outline-none" />
          </button>
          <a
            href="/orders/ORD-00123/edit"
            className="flex justify-center items-center py-2 px-4 gap-4 bg-action-default rounded-[24px] text-white"
          >
            <Plus />
            <span className="font-medium lg:text-[20px] lg:leading-[30px] w-max text-base leading-[22.4px]">
              Record Order
            </span>
          </a>
        </div>
      </div>
      <div className="w-full flex lg:hidden gap-4 justify-end">
        {["paid", "part-paid", "unpaid"].map((stat, i) => (
          <span
            key={i}
            style={{
              background:
                stat === "unpaid"
                  ? "rgba(220, 53, 69, 0.2)"
                  : stat === "paid"
                  ? "rgba(40, 167, 69, 0.2)"
                  : "rgba(119, 119, 119, 0.2)",
            }}
            className={clsx(
              "uppercase w-max flex rounded-full py-1 px-[8px] text-center justify-center font-semibold text-xs",
              stat === "unpaid"
                ? "text-alert-red"
                : stat === "paid"
                ? "text-alert-green"
                : "text-[#777777]"
            )}
          >{stat}</span>
        ))}
      </div>

      {table.getRowModel().rows.length > 0 ? (
        <>
          <div className="hidden lg:flex">
            <Table className="mt-[80px] border-separate rounded-[8px] border-spacing-0 overflow-hidden border border-solid border-neutral-border inventory-table">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-neutral-alt-b hover:bg-neutral-alt-bg h-[94px] py-[32px] px-[16px] rounded-[8px]"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="border-collapse">
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="box-border h-[84px] bg-neutral-alt p-[16px] text-[16px] leading-[30px] text-text-primary"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex lg:hidden w-full">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-neutral-alt-b py-2 px-2"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="font-normal text-base text-text-primary"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="border-collapse">
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="box-border bg-neutral-alt">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="font-normal text-base text-text-primary h-8 max-w-6 truncate"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.5"
                width="64"
                height="64"
                fill="url(#pattern0_1368_2)"
              />
              <defs>
                <pattern
                  id="pattern0_1368_2"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_1368_2"
                    transform="scale(0.0078125)"
                  />
                </pattern>
                <image
                  id="image0_1368_2"
                  width="128"
                  height="128"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <p className="text-center">
              No orders yet, but don't worry—soon <br /> they’ll start rolling
              in. Stay tuned!
            </p>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-14 min-[400px]:justify-between items-center mt-[32px] flex-wrap lg:flex-nowrap">
        <div className="flex items-center gap-14 text-[16px] leading-[30px] text-text-primary">
          <span>Total products</span>
          <b className="font-semibold">{data.length}</b>
        </div>
        <div className="flex items-center justify-center gap-[48px]">
          <div className="hidden lg:flex items-center gap-[16px] overflow-visible">
            <span className="text-[16px] leading-[30px] whitespace-nowrap text-text-primary">
              Lines per page
            </span>
            <Select
              onValueChange={(e) => {
                table.setPageSize(+e);
              }}
              value={table.getState().pagination.pageSize.toString()}
            >
              <SelectTrigger>
                {table.getState().pagination.pageSize.toString()}
              </SelectTrigger>
              <SelectContent>
                {[10, 15, 20, 25, 30, 40, 50].map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-[24px]">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            {(() => {
              const getVisiblePages = () => {
                const totalPages = table.getPageCount();
                const currentPage = table.getState().pagination.pageIndex;

                if (totalPages <= 5)
                  return Array.from({ length: totalPages }, (_, i) => i + 1);

                const start = Math.max(1, currentPage - 1);
                const end = Math.min(totalPages, currentPage + 1);

                return Array.from(
                  new Set([
                    1,
                    start,
                    <Ellipsis size={18} className="text-text-secondary" />,
                    end,
                    totalPages,
                  ])
                );
              };

              return getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (typeof page === "number") {
                      table.setPageIndex(page - 1);
                    }
                  }}
                  className={cn(
                    "text-[16px] leading-[30px] text-text-primary size-[32px]",
                    typeof page !== "object" &&
                      table.getState().pagination.pageIndex === page - 1 &&
                      "bg-text-primary rounded-[16px] text-neutral-alt"
                  )}
                >
                  {page}
                </button>
              ));
            })()}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
