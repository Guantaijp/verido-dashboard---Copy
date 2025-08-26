"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  Supplier } from "../../types/index";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

export const columnsSupplier: ColumnDef<Supplier>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "",
    cell: ({ row }) => (
      <div className="flex space-x-2 bg-active-green rounded-full h-10 w-10 justify-center items-center">
        <Image
          src="/assets/icons/personGreen.svg"
          alt="action"
          width={20}
          height={20}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "businessName",
    header: "Business Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "unit",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Image
          src="/assets/icons/delete.svg"
          alt="action"
          width={20}
          height={20}
        />
      </div>
    ),
  },
];
