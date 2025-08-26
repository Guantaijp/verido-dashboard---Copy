"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AdminBusinessResponse } from "../../../types/index";
import Image from "next/image";
import { Checkbox } from "../../../components/ui/checkbox";

const getStatusStyles = (status: boolean | string) => {
  if (status) {
    return "bg-active-green  text-verido-green";
  } else {
    return "bg-light-danger text-danger ";
  }
};

export const columnsBusiness: ColumnDef<AdminBusinessResponse>[] = [
  // {
  //   accessorKey: "",
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Enterprise Name",
  },
  // {
  //   accessorFn: (row) => row.business?.sector,
  //   id: "sector",
  //   header: "Sector",
  // },
  {
    accessorFn: (row) =>
      row?.consultant?.find((consultant: any) => consultant.username)?.username,
    id: "upline",
    header: "Upline",
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
  },
  {
    accessorFn: (row) => (row.suspended ? "Inactive" : "Active"),
    id: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return (
        <span
          className={`px-6 py-1 rounded-lg text-xs font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorFn: (row) =>
      new Date(row.subscription_status?.expires).toLocaleDateString(),
    id: "expires",
    header: "Expires",
  },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => (
  //     <div className="flex space-x-2">
  //       <Image
  //         src="/assets/icons/chat_fill.svg"
  //         alt="action"
  //         width={20}
  //         height={20}
  //       />
  //     </div>
  //   ),
  // },
];
