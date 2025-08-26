"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../../types/index";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<Product>[] = [
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
      <div className="flex space-x-2">
        <Image
          src="/assets/icons/product-card.svg"
          alt="action"
          width={40}
          height={40}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "costPrice",
    header: "Cost price",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "forecast",
    header: "Forcast/Month",
  },
  {
    accessorKey: "unit",
    header: "Unit",
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
