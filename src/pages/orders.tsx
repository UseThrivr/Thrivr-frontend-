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
interface InventoryData {
  orderId: string;
  name: string;
  listOfProducts: string[];
  amount: string;
  channel: string;
  date: string;
  status: "paid" | "part-paid" | "unpaid";
}

const columnHelper = createColumnHelper<InventoryData>();

function sortableHeader(
  title: string,
  column: Column<InventoryData, string | number>
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

function centerCell(data: CellContext<InventoryData, string | number>) {
  return <div className="text-center">{data.getValue()}</div>;
}

function shortenCell(data: CellContext<InventoryData, string>) {
  const value = data.getValue();
  const limit = 15;
  return value.slice(0, limit) + (value.length > limit ? "..." : "");
}

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
            "uppercase rounded-full h-[18px] py-1 px-[8px] text-center justify-center font-semibold text-[12px] leading-[18px]",
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
  state?: InventoryData["status"];
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

// Mock data function - replace this with your actual data fetching logic
const fetchInventoryData = async (): Promise<InventoryData[]> => {
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
      listOfProducts: [
        "Iphone 14 (Pro)",
        "Iphone 14 (Pro max)",
      ],
      amount: "236,900",
      channel: "Physical sales",
      date: "10-4-2024",
      status: "part-paid",
    },
    // Add more mock data as needed
  ];
};

const Inventory = () => {
  const [data, setData] = useState<InventoryData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const inventoryData = await fetchInventoryData();
        setData(inventoryData);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const table = useReactTable({
    data,
    columns,
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
    <section className="px-[33px] w-full">
      <Seo title="Inventory" />
      <div className="flex flex-col items-start gap-[4px]">
        <H1>Orders</H1>
        <P>View the complete list of orders for your business</P>
      </div>

      {/* Tabs */}
      <div className="mt-[54px] flex justify-between items-center w-full">
        <div className="flex items-start gap-[16px]">
          {filterOptions.map((filterOption, index) => {
            const column = table.getColumn("status");
            const filter = column?.getFilterValue();
            return (
              <H4
                key={index}
                onClick={() => column?.setFilterValue(filterOption.state)}
                className={clsx(
                  "text-center px-[8px] cursor-pointer",
                  filter === filterOption.state &&
                    "border-b-[4px] border-solid border-text-primary"
                )}
              >
                {filterOption.title}
              </H4>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center py-[12px] px-[16px] h-[44px] border border-solid border-neutral-border rounded-[8px] gap-4 w-72">
            <Search size={20} className="text-text-secondary" />
            <input type="text" className="w-full outline-none" />
          </button>
          <button className="flex justify-center items-center py-2 px-4 gap-4 bg-action-default rounded-[24px] text-white">
            <Plus />
            <span className="font-medium text-[20px] leading-[30px]">
              Record Order
            </span>
          </button>
        </div>
      </div>

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
          {table.getRowModel().rows.length > 0 ? (
            <>
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
            </>
          ) : (
            <h2 className="text-5xl">Hello</h2>
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-between items-star mt-[32px]">
        <div className="flex items-center gap-[16px] text-[16px] leading-[30px] text-text-primary">
          <span>Total products</span>
          <b className="font-semibold">{data.length}</b>
        </div>
        <div className="flex items-center justify-center gap-[48px]">
          <div className="flex items-center gap-[16px] overflow-visible">
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

export default Inventory;
