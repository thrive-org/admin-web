import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export type OrganizationRow = {
  id: string;
  name: string;
  website?: string;
  status: string;
  typeName?: string;
  address?: string;
  managerName?: string;
};
const Header = ({
  children,
  first,
}: {
  children: React.ReactNode;
  first?: boolean;
}) => {
  return (
    <p
      className={cn(
        "text-left text-black font-poppins font-semibold text-[18px] leading-none py-4",
        first && "pl-4"
      )}
    >
      {children}
    </p>
  );
};

const ActionButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/organization/${id}`} className="w-full h-full cursor-pointer">
      <div className="bg-gradient-to-r from-[#00A8FF] to-[#01F4C8] rounded-full p-2 w-[40px] h-[40px] flex items-center justify-center hover:opacity-80">
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </Link>
  );
};

const Content = ({
  children,
  first,
}: {
  children: React.ReactNode;
  first?: boolean;
}) => {
  return (
    <p
      className={cn(
        "text-left text-black font-poppins text-[#4D4D4D] font-regular text-[16px] leading-none py-2",
        first && "pl-4"
      )}
    >
      {children}
    </p>
  );
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const replaceUnderscoreAndCapitalize = (str: string) => {
  const t = str.split("_").map(capitalize).join(" ");
  return t;
};

export const columns: ColumnDef<OrganizationRow>[] = [
  {
    accessorKey: "name",
    header: () => <Header first>Name</Header>,
    cell: ({ row }) => (
      <Content first>
        <Link href={row.original.website} target="_blank">
          {row.original.name}
        </Link>
      </Content>
    ),
  },
  {
    accessorKey: "typeName",
    header: () => <Header>Type</Header>,
    cell: ({ row }) => (
      <Content>{replaceUnderscoreAndCapitalize(row.original.typeName)}</Content>
    ),
  },
  {
    accessorKey: "managerName",
    header: () => <Header>Manager</Header>,
    cell: ({ row }) => <Content>{row.original.managerName}</Content>,
  },
  {
    accessorKey: "status",
    header: () => <Header>Status</Header>,
    cell: ({ row }) => <Content>{capitalize(row.original.status)}</Content>,
  },
  {
    id: "arrow",
    header: "",
    cell: ({ row }) => <ActionButton id={row.original.id} />,
  },
];
