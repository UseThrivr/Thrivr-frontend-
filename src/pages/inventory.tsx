import { H1, P, Seo } from "@/components/global"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
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
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Ellipsis, Plus, Search, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { useDashboard } from "@/context/DashboardContext"

// Define the InventoryData type if not already defined
interface InventoryData {
  id: number
  name: string
  price: number
  category: string
  description: string
  purchaseDate: string
  supplier: string
  amount_left: number
}

const columnHelper = createColumnHelper<InventoryData>()

function sortableHeader(title: string, column: Column<InventoryData, string | number>) {
  return (
    <div onClick={column.getToggleSortingHandler()} className="cursor-pointer flex items-center gap-2">
      {title}
      {column.getIsSorted() === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </div>
  )
}

function centerCell(data: CellContext<InventoryData, string | number>) {
  return <div className="text-center">{data.getValue()}</div>
}

function shortenCell(data: CellContext<InventoryData, string>) {
  const value = data.getValue()
  const limit = 15
  return value.slice(0, limit) + (value.length > limit ? "..." : "")
}

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <span className="text-action-default underline">{info.getValue()}</span>,
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: shortenCell,
    header: "Product name",
  }),
  columnHelper.accessor("purchaseDate", {
    cell: (info) => info.getValue(),
    header: "Purchase date",
  }),
  columnHelper.accessor("price", {
    cell: centerCell,
    header: (header) => sortableHeader("Price", header.column),
  }),
  columnHelper.accessor("category", {
    cell: (info) => {
      return centerCell({
        ...info,
        // @ts-expect-error ...
        getValue: () => shortenCell(info),
      })
    },
    header: (header) => sortableHeader("Category", header.column),
  }),
  columnHelper.accessor("amount_left", {
    cell: centerCell,
    header: (header) => sortableHeader("Quantity", header.column),
  }),
  columnHelper.accessor("supplier", {
    cell: shortenCell,
    header: "Supplier",
  }),
]

const filterOptions = [
  { title: "All" },
  { title: "In Stock", state: "in-stock" },
  { title: "Low Stock", state: "low-stock" },
  { title: "Out of Stock", state: "out-of-stock" },
]

const Inventory = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { inventoryData, fetchInventory } = useDashboard()

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  const table = useReactTable({
    data: inventoryData,
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
  })

  if (!inventoryData) {
    return <div className="px-[33px]">Loading...</div>
  }

  return (
    <section className="">
      <Seo title="Inventory" />
      <div className="flex flex-col items-start gap-[4px]">
        <H1 className="hidden md:flex">Product Inventory</H1>
        <P>Check the full inventory list for your shop</P>
      </div>

      {/* Tabs */}
      <div className="mt-[54px] flex justify-between flex-col-reverse lg:flex-row items-center">
        <div className="flex items-start gap-[16px] mt-10 lg:mt-0">
          {filterOptions.map((filterOption, index) => {
            const column = table.getColumn("amount_left")
            const filter = column?.getFilterValue()
            return (
              <button
                key={index}
                onClick={() => column?.setFilterValue(filterOption.state)}
                className={clsx(
                  "text-center px-[8px] cursor-pointer text-lg text-nowrap",
                  filter === filterOption.state && "border-b-[4px] border-solid border-text-primary",
                )}
              >
                {filterOption.title}
              </button>
            )
          })}
        </div>

        <div className="grid grid-col-2 lg:flex items-center lg:w-[60%] gap-3 lg:gap-8">
          <button className="col-span-2 flex items-center w-full py-[12px] px-[16px] h-[44px] border border-solid border-neutral-border rounded-[8px]">
            <Search size={20} className="text-text-secondary" />
          </button>
          <a
            href="#"
            className="col-span-1 box-border flex items-center justify-center py-[8px] px-[16px] gap-[16px] h-[46px] border border-solid border-action-default rounded-[24px] text-action-default"
          >
            <Upload />
            <span className="font-medium text-sm text-nowrap lg:text-lg leading-[30px]">Export CSV</span>
          </a>
          <a
            href="/editinventory"
            className="flex col-span-1 justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default rounded-[24px] text-white"
          >
            <Plus />
            <span className="font-medium text-sm text-nowrap lg:text-lg leading-[30px]">Add new product</span>
          </a>
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
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
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
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-between items-star mt-[32px]">
        <div className="flex items-center gap-[16px] text-[16px] leading-[30px] text-text-primary">
          <span>Total products</span>
          <b className="font-semibold">{inventoryData.length}</b>
        </div>
        <div className="flex items-center justify-center gap-[48px]">
          <div className="flex items-center gap-[16px] overflow-visible">
            <span className="text-[16px] leading-[30px] whitespace-nowrap text-text-primary">Lines per page</span>
            <Select
              onValueChange={(e) => {
                table.setPageSize(+e)
              }}
              value={table.getState().pagination.pageSize.toString()}
            >
              <SelectTrigger>{table.getState().pagination.pageSize.toString()}</SelectTrigger>
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
                const totalPages = table.getPageCount()
                const currentPage = table.getState().pagination.pageIndex

                if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

                const start = Math.max(1, currentPage - 1)
                const end = Math.min(totalPages, currentPage + 1)

                return Array.from(
                  new Set([
                    1,
                    start,
                    <Ellipsis key="ellipsis" size={18} className="text-text-secondary" />,
                    end,
                    totalPages,
                  ]),
                )
              }

              return getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (typeof page === "number") {
                      table.setPageIndex(page - 1)
                    }
                  }}
                  className={cn(
                    "text-[16px] leading-[30px] text-text-primary size-[32px]",
                    typeof page !== "object" &&
                      table.getState().pagination.pageIndex === page - 1 &&
                      "bg-text-primary rounded-[16px] text-neutral-alt",
                  )}
                >
                  {page}
                </button>
              ))
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
  )
}

export default Inventory

