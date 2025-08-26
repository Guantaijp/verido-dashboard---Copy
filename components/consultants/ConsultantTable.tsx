import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { MoreVertical, MoveLeft, MoveRight } from "lucide-react";
import SuperAgentForm from "../AllUsers/SuperAgentForm";
import AddSuperAgentForm from "./AddSuperAgentForm";
import { Dialog, DialogContent } from "../ui/dialog";
import { useAuthenticatedUser } from "@/context/AuthContext";
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
import useDebounce from "@/lib/hooks/useDebounce";

import { Consultant, IPagination } from "@/types";
import useCustomToast from "@/lib/hooks/useCustomToast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching: boolean;
  pagination?: IPagination;
  onPageChange: (page: number) => void;
  onSearchChange: (searchValue: string) => void;
}

export function ConsultantTable<TData extends Consultant, TValue>({
  columns,
  data,
  isFetching,
  onPageChange,
  pagination,
  onSearchChange,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const showToast = useCustomToast();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { hasPermission, currentUser } = useAuthenticatedUser();
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

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
            {/* <DropdownMenuItem
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
            </DropdownMenuItem> */}
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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  const handleCreateSuperAgent = () => {
    if (hasPermission("superagents.create")) {
      setOpenCreateModal(true);
    } else {
      showToast(
        "Access Denied",
        "You do not have permission to access this resource, contact Verido",
        "error"
      );
    }
  };

  const handleAddSuperAgent = () => {
    if (hasPermission("superagents.create")) {
      setOpenAddModal(true);
    } else {
      showToast(
        "Access Denied",
        "You do not have permission to access this resource, contact Verido",
        "error"
      );
    }
  };

  const renderContent = () => {
    if (isFetching) {
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

    if (data.length === 0) {
      return (
        <TableRow className="text-sm font-bold text-gray-text">
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No Super Agents found.
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        className="text-sm font-light text-gray-text"
        onClick={() => {
          const data = row.original;
          if (hasPermission("superagents.getSingle")) {
            router.push(`/superagents/${data._id}`);
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
          <h2 className="text-[24px] font-bold">Super Agents</h2>
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

          <Button
            className={`bg-verido-green text-verido-white ${
              !hasPermission("superagents.create") && "opacity-50"
            }`}
            onClick={handleCreateSuperAgent}
          >
            Create Super Agent
          </Button>

          {currentUser?.role === "companies" && (
            <Button
              variant={"outline"}
              className={` text-verido-black border-2 border-verido-green`}
              onClick={handleAddSuperAgent}
            >
              Add Super Agent
            </Button>
          )}

          {openCreateModal && (
            <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
              <DialogContent
                className={`flex flex-col w-full h-[100dvh] lg:h-[80dvh] sm:w-[425px] sm:h-auto transition-all duration-300  overflow-y-auto overflow-x-hidden`}
              >
                <SuperAgentForm closeModal={() => setOpenCreateModal(false)} />
              </DialogContent>
            </Dialog>
          )}

          {openAddModal && (
            <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
              <DialogContent
                className={`flex flex-col w-full h-[100dvh] lg:h-fit sm:w-[425px] sm:h-auto transition-all duration-300  overflow-y-auto overflow-x-hidden`}
              >
                <AddSuperAgentForm closeModal={() => setOpenAddModal(false)} />
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
      {!isFetching && table.getRowModel().rows?.length > 0 && (
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
