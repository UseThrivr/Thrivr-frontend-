import { H1, H4, P, Seo } from "@/components/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type Column,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
  ColumnSort,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface CustomerData {
  customerName: string;
  email: string;
  channels: string;
  amountSpent: number;
  debt: number;
}
interface MobileData {
  customerName: string;
  channels: string;
  amountSpent: number;
  chevronRight?: string;
}

interface groupMobileData {
  id: string;
  groupName: string;
  chevronRight?: string;
}

interface GroupData {
  id: string;
  groupName: string;
}

const customerData: CustomerData[] | MobileData[] = [
  {
    customerName: "John Nwachukwu",
    email: "johnnwa2349@gmail.com",
    channels: "Thrivr store",
    amountSpent: 553000,
    debt: 450,
  },
  {
    customerName: "Amaka Chukwudi",
    email: "johnnwa2349@gmail.com",
    channels: "Thrivr store",
    amountSpent: 553000,
    debt: 0,
  },
  {
    customerName: "Tope Adeyemi",
    email: "johnnwa2349@gmail.com",
    channels: "WhatsApp",
    amountSpent: 553000,
    debt: 0,
  },
  {
    customerName: "Seyi Onyekachi",
    email: "johnnwa2349@gmail.com",
    channels: "Offline",
    amountSpent: 553000,
    debt: 0,
  },
  {
    customerName: "Amina Bello",
    email: "johnnwa2349@gmail.com",
    channels: "Offline",
    amountSpent: 553000,
    debt: 0,
  },
  {
    customerName: "Bisi Ogunlana",
    email: "johnnwa2349@gmail.com",
    channels: "Offline",
    amountSpent: 553000,
    debt: 0,
  },
  {
    customerName: "Funke Oladipo",
    email: "johnnwa2349@gmail.com",
    channels: "Offline",
    amountSpent: 553000,
    debt: 0,
  },
];

const groupData: GroupData[] | groupMobileData[] = [
  {
    id: "1",
    groupName: "Customers with no purchase in the last 30 days",
  },
  {
    id: "2",
    groupName: "Customers with no purchase in the last 60 days",
  },
];

function sortableHeader(
  title: string,
  column: Column<CustomerData | GroupData, unknown>
) {
  return (
    <div
      onClick={column.getToggleSortingHandler()}
      className="cursor-pointer flex items-center justify-start font-medium text-[16px] text-[#24272E]"
    >
      {title}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100" />
      )}
    </div>
  );
}

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

const columnHelper = createColumnHelper<CustomerData>();
const mobileCustomerHelper = createColumnHelper<MobileData>();
const mobileGroupHelper = createColumnHelper<groupMobileData>();
const groupColumnHelper = createColumnHelper<GroupData>();

const mobileCustomerColumns = [
  mobileCustomerHelper.accessor("customerName", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  mobileCustomerHelper.accessor("channels", {
    cell: (info) => info.getValue(),
    header: "Channels",
  }),
  mobileCustomerHelper.accessor("amountSpent", {
    cell: (info) => info.getValue(),
    header: "Amount",
  }),
  mobileCustomerHelper.accessor("chevronRight", {
    cell:() => <ChevronRight size={24} className="text-action-default" />,
    header: "",
  }),
]

const mobileGroupColumns = [
  mobileGroupHelper.accessor("id", {
    cell: () => <Checkbox />,
    header: "select",
    enableSorting: false,
  }),
  mobileGroupHelper.accessor("groupName", {
    cell: (info) => info.getValue(),
    header: "Group name",
  }),
  mobileCustomerHelper.accessor("chevronRight", {
    cell:() => <ChevronRight size={24} className="text-action-default" />,
    header: "",
  }),
]

const customerColumns = [
  columnHelper.accessor("customerName", {
    cell: (info) => info.getValue(),
    header: "Customer name",
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email",
  }),
  columnHelper.accessor("channels", {
    cell: (info) => info.getValue(),
    header: (header) =>
      sortableHeader(
        "Channels",
        header.column as Column<CustomerData | GroupData, unknown>
      ),
  }),
  columnHelper.accessor("amountSpent", {
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
    header: (header) =>
      sortableHeader(
        "Amount spent (₦)",
        header.column as Column<CustomerData | GroupData, unknown>
      ),
  }),
  columnHelper.accessor("debt", {
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
    header: (header) =>
      sortableHeader(
        "Debt (₦)",
        header.column as Column<CustomerData | GroupData, unknown>
      ),
  }),
];

const groupColumns = [
  groupColumnHelper.accessor("id", {
    cell: () => <Checkbox />,
    header: () => (
      <span className="font-medium text-[16px] text-[#24272E]">Select</span>
    ),
    enableSorting: false,
  }),
  groupColumnHelper.accessor("groupName", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="font-medium text-[16px] text-[#24272E]">Group Name</span>
    ),
  }),
];
// Add these imports
import CustomerPopup from "@/components/dashboard/CustomerPopup";
import GroupPopup from "@/components/dashboard/GroupPopup";
type TableDataType = CustomerData | GroupData;

const Customer = () => {
  const [activeTab, setActiveTab] = useState<"customers" | "groups">(
    "customers"
  );
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [columnFilters] = useState([]);
  // Add these state variables
  const [isCustomerPopupOpen, setIsCustomerPopupOpen] = useState(false);
  const [isGroupPopupOpen, setIsGroupPopupOpen] = useState(false);

  const isSmallScreen = useIsSmallScreen();

  const table = useReactTable({
    data:
      activeTab === "customers"
        ? customerData
        : (groupData as unknown as CustomerData[]),
    columns: isSmallScreen
    ? activeTab === "customers" 
    ? (mobileCustomerColumns as ColumnDef<TableDataType, unknown>[])
    : (mobileGroupColumns as ColumnDef<TableDataType, unknown>[])
    : 
      activeTab === "customers"
        ? (customerColumns as ColumnDef<TableDataType, unknown>[])
        : (groupColumns as ColumnDef<TableDataType, unknown>[]),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Update the button click handler
  const handleActionButtonClick = () => {
    if (activeTab === "customers") {
      setIsCustomerPopupOpen(true);
    } else {
      setIsGroupPopupOpen(true);
    }
  };

  return (
    <section className="gap-10 flex flex-col lg:gap-0">
      <Seo title="Customers" />
      <div className="flex flex-col items-start gap-[4px]">
        <H1 className="hidden md:flex">Customers</H1>
        <P className="hidden lg:flex">
          View all customers who've shopped with you.
        </P>
        <p className="font-normal text-base text-text-secondary flex lg:hidden">
          View all customers who’ve shopped with you.
        </p>
      </div>

      <div className="lg:mt-[54px] flex justify-between md:items-center gap-4 flex-col md:flex-row">
        <div className="items-start gap-[16px] flex">
          {[
            { title: "Customers", value: "customers" },
            { title: "Groups", value: "groups" },
          ].map((tab) => (
            <H4
              key={tab.value}
              onClick={() => setActiveTab(tab.value as "customers" | "groups")}
              className={clsx(
                "text-center px-[8px] cursor-pointer",
                activeTab === tab.value &&
                  "border-b-[4px] border-solid border-text-primary"
              )}
            >
              {tab.title}
            </H4>
          ))}
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center py-3 px-4 border border-solid border-neutral-border rounded-[8px] gap-[12px]">
            <Search size={24} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search customers"
              className="w-full outline-none border-none bg-transparent text-[16px] leading-[24px] text-text-primary placeholder:text-text-secondary"
            />
          </div>
          <button
            className="hidden lg:flex justify-center items-center py-[8px] px-[16px] gap-[16px] w-max bg-action-default rounded-[24px] text-white"
            onClick={handleActionButtonClick}
          >
            <Users />
            <span className="font-medium text-[20px] leading-[30px] w-max">
              {activeTab === "customers" ? "Add Customer" : "Create Group"}
            </span>
          </button>
          <a
            className="flex lg:hidden justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default rounded-[24px] text-white"
            href={
              activeTab === "customers"
                ? "/customers/new-customers"
                : "/customers/new-group"
            }
          >
            <Users size={24} />
            <span className="font-medium text-base leading-[22.4px] w-max">
              {activeTab === "customers" ? "Add Customer" : "Create Group"}
            </span>
          </a>
        </div>
      </div>

      <div className="hidden lg:flex">
        <Table className="mt-[80px] border-separate rounded-[8px] border-spacing-0 overflow-hidden border border-solid border-neutral-border inventory-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-neutral-alt-b h-[94px] py-[32px] font-medium text-[16px] text-[#24272E] px-[16px] rounded-[8px]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-medium text-[16px] text-[#24272E]"
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
              <TableRow
                key={row.id}
                className="box-border h-[84px] bg-neutral-alt text-[16px] leading-[30px] text-text-primary"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
              <TableRow
                key={row.id}
                className="box-border"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="font-normal text-base text-text-primary max-w-4 truncate" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-14 min-[400px]:justify-between items-center mt-[32px] flex-wrap lg:flex-nowrap">
        <div className="flex items-center gap-[16px]">
          <span>Total {activeTab}</span>
          <b>{table.getRowModel().rows.length}</b>
        </div>
        <div className="flex items-center gap-[48px]">
          <div className="hidden lg:flex items-center gap-[16px] overflow-visible">
            <span className="text-[16px] leading-[30px] whitespace-nowrap text-text-primary">
              Lines per page
            </span>
            <Select
              onValueChange={(value) => table.setPageSize(Number(value))}
              value={table.getState().pagination.pageSize.toString()}
            >
              <SelectTrigger>
                {table.getState().pagination.pageSize}
              </SelectTrigger>
              <SelectContent>
                {[10, 15, 20, 25, 30].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-[24px]">
            <button
              onClick={table.previousPage}
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
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
              className="disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <CustomerPopup
        isOpen={isCustomerPopupOpen}
        onClose={() => setIsCustomerPopupOpen(false)}
      />
      <GroupPopup
        isOpen={isGroupPopupOpen}
        onClose={() => setIsGroupPopupOpen(false)}
      />
    </section>
  );
};

export default Customer;
