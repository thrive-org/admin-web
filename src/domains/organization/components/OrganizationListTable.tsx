import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";

export type OrganizationRow = {
  id: string;
  name: string;
  website?: string;
  status: string;
  typeName?: string;
  address?: string;
  managerName?: string;
};

export const columns: ColumnDef<OrganizationRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "website", header: "Website" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "typeName", header: "Type" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "managerName", header: "Manager" },
  {
    id: "arrow",
    header: "",
    cell: ({ row }) => (
      <Link href={`/organization/${row.original.id}`}>
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
            cursor: "pointer",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1L6 4L2 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    ),
  },
];

export function OrganizationListTable({ data }: { data: OrganizationRow[] }) {
  return <DataTable columns={columns} data={data} />;
}
