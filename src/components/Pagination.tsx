// app/(wherever)/components/Pagination.tsx
"use client";

import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props<TData> = {
  table: Table<TData>;
  className?: string;
};

export default function Pagination<TData>({ table, className }: Props<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const totalRows = table.getPrePaginationRowModel().rows.length;

  // windowed page numbers: current ±2
  const start = Math.max(0, pageIndex - 2);
  const end = Math.min(pageCount - 1, pageIndex + 2);
  const pages = Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(totalRows, (pageIndex + 1) * pageSize);

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-b-[12px] bg-white border-t border-[#EDEDED] px-4 pt-6",
        className
      )}
    >
      {/* left: range + size */}
      <div className="flex items-center gap-4">
        <span className="text-[16px] font-poppins text-[#4D4D4D]">
          Showing <span className="font-semibold text-black">{from}</span>–<span className="font-semibold text-black">{to}</span> of{" "}
          <span className="font-semibold text-black">{totalRows}</span>
        </span>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-[16px] text-[#676767]">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-9 w-[84px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* right: pager */}
      <div className="flex items-center gap-2 md:gap-3">
        <IconButton
          ariaLabel="First page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          icon={<ChevronsLeft className="h-4 w-4" />}
        />
        <IconButton
          ariaLabel="Previous page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          icon={<ChevronLeft className="h-4 w-4" />}
        />

        {/* page numbers */}
        <div className="flex items-center gap-1">
          {start > 0 && (
            <>
              <PagePill active={pageIndex === 0} onClick={() => table.setPageIndex(0)}>
                1
              </PagePill>
              {start > 1 && <Ellipsis />}
            </>
          )}

          {pages.map((p) => (
            <PagePill key={p} active={p === pageIndex} onClick={() => table.setPageIndex(p)}>
              {p + 1}
            </PagePill>
          ))}

          {end < pageCount - 1 && (
            <>
              {end < pageCount - 2 && <Ellipsis />}
              <PagePill active={pageIndex === pageCount - 1} onClick={() => table.setPageIndex(pageCount - 1)}>
                {pageCount}
              </PagePill>
            </>
          )}
        </div>

        <IconButton
          ariaLabel="Next page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          icon={<ChevronRight className="h-4 w-4" />}
        />
        <IconButton
          ariaLabel="Last page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(pageCount - 1)}
          icon={<ChevronsRight className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}

function PagePill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  // match table styling: subtle gray, active = AVA gradient
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 min-w-9 px-3 rounded-full text-sm font-medium transition border",
        active
          ? "text-white border-transparent bg-gradient-to-r from-[#00A8FF] to-[#01F4C8] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
          : "text-[#4D4D4D] bg-[#F3F3F3] border-[#E7E7E7] hover:bg-[#EDEDED]"
      )}
    >
      {children}
    </button>
  );
}

function Ellipsis() {
  return <span className="px-1 text-[#9B9B9B] select-none">…</span>;
}

function IconButton({
  ariaLabel,
  icon,
  onClick,
  disabled,
}: {
  ariaLabel: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "h-9 w-9 p-0 rounded-full border bg-[#F9F9F9] border-[#E7E7E7]",
        "hover:bg-[#EDEDED]",
        disabled && "opacity-50 pointer-events-none"
      )}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
