import { H1, H4, P, Seo } from "@/components/global";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
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
    useReactTable
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
    Upload
} from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const columnHelper = createColumnHelper<InventoryData>();

function sortableHeader(
    title: string,
    column: Column<InventoryData, string | number>
) {
    return (
        <div onClick={column.getToggleSortingHandler()} >
            {title}
            {column.getIsSorted() === "asc"
                ? <ChevronUp />
                : <ChevronDown />
            }
        </div>
    )
}

function centerCell(data: CellContext<InventoryData, string | number>) {
    return (
        <div className="text-center">
            {data.getValue()}
        </div>
    )
}

function shortenCell(data: CellContext<InventoryData, string>) {
    const value = data.getValue();
    const limit = 15;
    return value.slice(0, limit) + (
        value.length > limit
            ? "..."
            : ""
    )
}

const columns = [
    columnHelper.accessor("supplyId", {
        cell: (info) => (
            <span className="text-action-default underline">
                {info.getValue()}
            </span>
        ),
        header: "Supply ID"
    }),
    columnHelper.accessor("productName", {
        cell: shortenCell,
        header: "Product name"
    }),
    columnHelper.accessor("purchaseDate", {
        cell: (info) => info.getValue(),
        header: "Purchase date"
    }),
    columnHelper.accessor("sellingPrice", {
        cell: centerCell,
        header: (header) => sortableHeader("Selling price", header.column)
    }),
    columnHelper.accessor("category", {
        cell: (info) => {
            return centerCell({
                ...info,
                // @ts-expect-error ...
                getValue: () => shortenCell(info)
            })
        },
        header: (header) => sortableHeader("Category", header.column)
    }),
    columnHelper.accessor("quantity", {
        cell: centerCell,
        header: (header) => sortableHeader("Quantity", header.column),
    }),
    columnHelper.accessor("status", {
        filterFn: "equalsString",
        cell: (info) => {
            const status = info.getValue();
            return (
                <span
                    style={{
                        background: status === "out-of-stock"
                            ? "rgba(220, 53, 69, 0.2)"
                            : "rgba(40, 167, 69, 0.2)"
                    }}
                    className={clsx(
                        "uppercase rounded-[8px] h-[18px] px-[8px] text-center justify-center font-semibold text-[12px] leading-[18px]",
                        status === "out-of-stock"
                            ? "text-alert-red"
                            : "text-alert-green"
                    )}
                >
                    {status.replace(/-/g, " ")}
                </span>
            )
        },
        header: (header) => sortableHeader("Status", header.column),
    })
]

const filterOptions: Array<{
    title: string;
    state?: InventoryData["status"]
}> = [
        {
            title: "All",
        },
        {
            title: "Available",
            state: "available"
        },
        {
            title: "Out of Stock",
            state: "out-of-stock"
        }
    ]

const Inventory = () => {

    const data = useLoaderData() as InventoryData[];
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

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
                pageSize: 15
            }
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <>
            <Seo title="Inventory" />
            <div className="flex flex-col items-start gap-[4px]">
                <H1>Product Inventory</H1>
                <P>Check the full inventory list for your shop</P>
            </div>

            {/* Tabs */}
            <div className="mt-[54px] flex justify-between items-center gap-[246px]">
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
                                    filter === filterOption.state && "border-b-[4px] border-solid border-text-primary"
                                )}
                            >
                                {filterOption.title}
                            </H4>
                        )
                    })}
                </div>

                <div className="flex items-center gap-[16px] h-[46px]">
                    <button className="flex items-center py-[12px] px-[16px] h-[44px] w-[52px] border border-solid border-neutral-border rounded-[8px]">
                        <Search size={20} className="text-text-secondary" />
                    </button>
                    <a href="#" className="box-border flex items-center justify-center py-[8px] px-[16px] gap-[16px] h-[46px] border border-solid border-action-default rounded-[24px] text-action-default">
                        <Upload />
                        <span className="font-medium text-[20px] leading-[30px]">Export CSV</span>
                    </a>
                    <button className="flex justify-center items-center py-[8px] px-[16px] gap-[16px] h-[46px] bg-action-default rounded-[24px] text-white">
                        <Plus />
                        <span className="font-medium text-[20px] leading-[30px]">Add new product</span>
                    </button>
                </div>
            </div>

            <Table className="mt-[80px] border-separate rounded-[8px] border-spacing-0 overflow-hidden border border-solid border-neutral-border inventory-table">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-neutral-alt-b hover:bg-neutral-alt-bg h-[94px] py-[32px] px-[16px] rounded-[8px]">
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
                        <TableRow key={row.id} className="box-border h-[84px] bg-neutral-alt p-[16px] text-[16px] leading-[30px] text-text-primary">
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

            {/* PAGINATION */}
            <div className="flex justify-between items-star mt-[32px]">
                <div className="flex items-center gap-[16px] text-[16px] leading-[30px] text-text-primary">
                    <span>Total products</span>
                    <b className="font-semibold">{data.length}</b>
                </div>
                <div className="flex items-center justify-center gap-[48px]">
                    <div className="flex items-center gap-[16px] overflow-visible">
                        <span className="text-[16px] leading-[30px] whitespace-nowrap text-text-primary">Lines per page</span>
                        <Select
                            onValueChange={(e) => {
                                table.setPageSize(+e)
                                console.log(e);
                            }}
                            value={table.getState().pagination.pageSize.toString()}
                        >
                            <SelectTrigger>
                                {table.getState().pagination.pageSize.toString()}
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 15, 20, 25, 30, 40, 50].map((value) => (
                                    <SelectItem
                                        key={value}
                                        value={String(value)}
                                    >
                                        {value}
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

                                if (totalPages <= 5) return Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                );

                                const start = Math.max(1, currentPage - 1);
                                const end = Math.min(totalPages, currentPage + 1);

                                return Array.from(new Set([1, start, <Ellipsis size={18} className="text-text-secondary" />, end, totalPages]));
                            }

                            return getVisiblePages().map((page, index) => ((
                                <button
                                    key={index}
                                    className={cn(
                                        "text-[16px] leading-[30px] text-text-primary size-[32px]",
                                        typeof page !== "object" &&
                                        table.getState().pagination.pageIndex === (page - 1) &&
                                        "bg-text-primary rounded-[16px] text-neutral-alt"
                                    )}
                                >
                                    {page}
                                </button>
                            )));
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
            </div >
        </>
    )
}

export default Inventory;

