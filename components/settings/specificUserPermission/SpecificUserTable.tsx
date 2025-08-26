import React from 'react';
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  Row,
  Cell,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MoreVertical, ArrowLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export interface PermissionIdData {
  _id: string;
  updatedAt: string;
  
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching: boolean;
  onGoBack: () => void;
  onEditPermision: (permissionId: string) => void;
  userRole: string;
}

const SpecificUserTable = <TData extends PermissionIdData, TValue>({
  columns,
  data,
  isFetching,
  onGoBack,
  onEditPermision,
  userRole
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  const renderContent = () => {
    if (isFetching) {
      return (
        <TableRow className="text-sm font-bold text-gray-text-3">
          <TableCell
            colSpan={columns.length}
            className="font-bold text-sm h-24 text-center"
          >
            Loading...
          </TableCell>
        </TableRow>
      );
    }
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No data
          </TableCell>
        </TableRow>
      );
    }
    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        onClick={() => onEditPermision(row.original?._id)}
        className="text-sm font-light text-gray-text-3"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className="rounded-md">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={onGoBack}
            className="p-0"
            variant="secondary"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-[20px] font-bold capitalize">{userRole.replaceAll("_", " ")}</h2>
        </div>
      </div>
      <div className="rounded-md border-none border-0">
        <Table className="border-0">
          <TableHeader className="bg-sidebar-gray">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-none">
            {renderContent()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SpecificUserTable;