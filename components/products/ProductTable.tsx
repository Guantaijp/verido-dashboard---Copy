"use client";
import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { IProductCard } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import ProductCard from "./ProductCard";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export function ProductTable<TData extends IProductCard>({
  data,
  columns,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters },
  });

  return (
    <div className="border-[1.5px] w-full rounded-[20px] p-5">
      <div className="flex flex-col md:flex-row  gap-3 md:gap-0 justify-between mb-6">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div className="flex gap-2 items-center"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 gap-5">
        {table.getRowModel().rows.map((row) => (
          <ProductCard key={row.id} product={row.original} />
        ))}
      </div>
    </div>
  );
}
