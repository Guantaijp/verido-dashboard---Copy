import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { MoreVertical, MoveRight, MoveLeft } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

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
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { Partner, IPagination } from "../../types/index";
import CountryAdminForm from "../AllUsers/CountryAdminForm";
import { Dialog, DialogContent } from "../ui/dialog";
import useCustomToast from "@/lib/hooks/useCustomToast";
import useDebounce from "@/lib/hooks/useDebounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
  pagination?: IPagination;
  onPageChange: (page: number) => void;
  onSearchChange: (searchValue: string) => void;
}

export function CountryAdminTable<TData extends Partner, TValue>({
  columns,
  data,
  isPending,
  pagination,
  onPageChange,
  onSearchChange,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const showToast = useCustomToast();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { hasPermission } = useAuthenticatedUser();
  const actionColumn: ColumnDef<TData, TValue> = {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-4 w-4 outline-none border-none" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[12rem] p-2" align="end">
            <DropdownMenuItem
              className="flex gap-2 items-center text-sm cursor-not-allowed text-light-gray opacity-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/assets/icons/eye-on.svg"
                alt="eye"
                width={20}
                height={20}
              />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center text-sm cursor-not-allowed text-danger opacity-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/assets/icons/delete.svg"
                alt="eye"
                width={20}
                height={20}
              />
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const allColumns = [...columns, actionColumn];

  const table = useReactTable({
    data,
    columns: allColumns,
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
  const handleSortChange = (sortOrder: "asc" | "desc") => {
    setSorting([{ id: "name", desc: sortOrder === "desc" }]);
  };

  const handleAddCountryAdmin = () => {
    if (hasPermission("countryadmin.create")) {
      setOpenFormModal(true);
    } else {
      showToast(
        "Access Denied",
        "You do not have permission to access this resource, contact Verido",
        "error"
      );
    }
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <TableRow className="text-sm font-bold text-gray-text">
          {columns.map((_, index) => (
            <TableCell
              key={index}
              className="h-24 text-center font-bold text-sm"
            >
              <Skeleton className="h-4 w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      );
    }

    if (table.getRowModel().rows?.length === 0) {
      return (
        <TableRow className="text-sm font-bold text-gray-text">
          <TableCell colSpan={columns.length + 1} className="h-24 text-center">
            No Country Admin found.
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        className="text-sm font-light text-gray-text cursor-pointer hover:bg-gray-50"
        onClick={() => {
          const data = row.original;
          if (hasPermission("countryadmin.getSingle")) {
            router.push(`/country-admin/${data._id}`);
          } else {
            showToast(
              "Access Denied",
              "You do not have permission to access this resource, contact Verido",
              "error"
            );
          }
        }}
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
      <div className="flex flex-col md:flex-row  gap-3 md:gap-0 justify-between mb-6">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-[24px] font-bold">Country Admin</h2>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center p-2 justify-between border border-text-gray rounded-lg h-[2.5rem]">
            <Image
              className="object-contain"
              src="/assets/icons/person.svg"
              alt="search icon"
              width={15}
              height={15}
            />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm h-full outline-none"
            />
          </div>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[100px] text-light-gray">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="desc">
                Descending
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="asc">
                Ascending
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            className={`bg-verido-green text-verido-white ${
              !hasPermission("countryadmin.create") && "opacity-50"
            }`}
            onClick={handleAddCountryAdmin}
          >
            Create Country Admin
          </Button>
          {openFormModal && (
            <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
              <DialogContent
                className={`flex flex-col w-full h-[100dvh] lg:h-[80dvh] sm:w-[425px] sm:h-auto transition-all duration-300  overflow-y-auto overflow-x-hidden`}
              >
                <CountryAdminForm closeModal={() => setOpenFormModal(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Table className="border-0">
        <TableHeader className="bg-gray-table">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="h-[44px] rounded-sm" key={header.id}>
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
        <TableBody className="border-none">{renderContent()}</TableBody>
      </Table>
      {!isPending && table.getRowModel().rows?.length > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(pagination?.prevPage ?? 1)}
            disabled={!pagination?.hasPrevPage}
            className="border border-verido-green disabled:border-gray-text text-gray-text"
          >
            <MoveLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-xs text-gray-text font-bold">
            Page {pagination?.page} of {pagination?.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(pagination?.nextPage ?? 1)}
            disabled={!pagination?.hasNextPage}
            className="border border-verido-green disabled:border-gray-text text-gray-text"
          >
            Next
            <MoveRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
