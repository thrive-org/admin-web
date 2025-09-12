"use client";
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

// SVG Arrow Icon
const ArrowIcon = () => (
  <div
    style={{
      width: "19.61px",
      height: "19.61px",
      borderRadius: "9.81px",
      background: "linear-gradient(270deg, #01F4C8 0%, #00A8FF 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "9.81px 4.53px",
      opacity: 1,
    }}
  >
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1L6 4L2 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: updater => {
      let nextPageIndex = pageIndex;
      let nextPageSize = pageSize;
      if (typeof updater === "function") {
        const result = updater({ pageIndex, pageSize });
        nextPageIndex = result.pageIndex;
        nextPageSize = result.pageSize;
      } else {
        nextPageIndex = updater.pageIndex;
        nextPageSize = updater.pageSize;
      }
      setPageIndex(nextPageIndex);
      setPageSize(nextPageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              style={{
                background: "#F3F3F3",
                padding: "2.26px 24.14px",
                height: "31.5px",
                opacity: 1,
                width: "712.17px",
                display: "table-row",
                overflow: "hidden",
                border: "none",
              }}
            >
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left cursor-pointer select-none"
                  style={{
                    fontFamily: "Poppins, system-ui",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: "13.83px",
                    lineHeight: "100%",
                    letterSpacing: "-3%",
                    verticalAlign: "middle",
                    border: "none",
                    background: "#F3F3F3",
                    borderTopLeftRadius: idx === 0 ? "16px" : undefined,
                    borderBottomLeftRadius: idx === 0 ? "16px" : undefined,
                    borderTopRightRadius: idx === headerGroup.headers.length - 1 ? "16px" : undefined,
                    borderBottomRightRadius: idx === headerGroup.headers.length - 1 ? "16px" : undefined,
                  }}
                  onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" && " ▲"}
                  {header.column.getIsSorted() === "desc" && " ▼"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b"
                  style={{
                    fontFamily: "Poppins, system-ui",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "12.71px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#4D4D4D",
                    background: "transparent",
                    verticalAlign: "middle",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
             
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
          style={{
            fontFamily: "Poppins, system-ui",
            fontWeight: 500,
            fontSize: "13.83px",
            borderRadius: "16px",
          }}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span
          style={{
            fontFamily: "Poppins, system-ui",
            fontWeight: 500,
            fontSize: "13.83px",
          }}
        >
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
          style={{
            fontFamily: "Poppins, system-ui",
            fontWeight: 500,
            fontSize: "13.83px",
            borderRadius: "16px",
          }}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
