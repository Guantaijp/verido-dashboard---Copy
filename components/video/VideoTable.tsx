"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreVertical, MoveLeft, MoveRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuthenticatedUser } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import CreateVideo from "./CreateVideo";
import { IVideo, IPagination } from "../../types/index";
import { Button } from "../ui/button";
import EditVideo from "./EditVideo";
import Image from "next/image";
import { DeleteAlertDialog } from "../common/DeleteAlertDialog";
import { useDisclosure } from "@chakra-ui/react";
import { Skeleton } from "../ui/skeleton";
import useVideos from "@/lib/react-query/mutations/useVideo";
import useCustomToast from "@/lib/hooks/useCustomToast";
import useDebounce from "@/lib/hooks/useDebounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
  addVideo: boolean;
  pagination?: IPagination;
  onPageChange?: (page: number) => void;
  onSearchChange?: (search: string) => void;
}

export function VideoTable<TData extends IVideo, TValue>({
  columns,
  data,
  isPending,
  addVideo,
  onPageChange,
  onSearchChange,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const showToast = useCustomToast();
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const { deleteVideoMutation } = useVideos();
  const {
    isOpen: isOpenForDelete,
    onOpen: onOpenForDelete,
    onClose: onCloseForDelete,
  } = useDisclosure();
  const { hasPermission } = useAuthenticatedUser();
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange]);

  const handleEditClick = (video: IVideo) => {
    if (!hasPermission("video.update")) {
      showToast(
        "Access Denied",
        "You do not have permission to edit videos",
        "error"
      );
      return;
    }
    setSelectedVideo(video);
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    if (videoToDelete !== null) {
      if (!hasPermission("video.delete")) {
        showToast(
          "Access Denied",
          "You do not have permission to delete videos",
          "error"
        );
        return;
      }

      deleteVideoMutation.mutate(videoToDelete, {
        onSuccess: () => {
          onCloseForDelete();
        },
      });
    }
  };

  const confirmDelete = (id: string) => {
    setVideoToDelete(id);
    onOpenForDelete();
  };

  const cancelDelete = () => {
    onCloseForDelete();
  };

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
            {hasPermission("video.update") && (
              <DropdownMenuItem
                className="flex gap-2 items-center text-sm text-light-gray cursor-pointer"
                onClick={() => handleEditClick(data)}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="eye"
                  width={20}
                  height={20}
                />
                Edit Video
              </DropdownMenuItem>
            )}

            {hasPermission("video.delete") && (
              <DropdownMenuItem
                className="flex gap-2 items-center text-sm text-danger cursor-pointer"
                onClick={() => confirmDelete(data._id)}
              >
                <Image
                  src="/assets/icons/delete.svg"
                  alt="eye"
                  width={20}
                  height={20}
                />
                Delete Video
              </DropdownMenuItem>
            )}
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
    if (table.getRowModel().rows?.length) {
      return table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
          className="text-sm font-light text-gray-text"
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ));
    } else {
      return (
        <TableRow className="text-sm font-bold text-gray-text">
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No Videos Found.
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="rounded-md ">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-[28px] font-bold">Videos</h2>
        </div>
        {addVideo && (
          <div className="flex items-center gap-2 justify-between">
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

            <div className="flex gap-2">
              <div className="">
                <CreateVideo />
              </div>
            </div>
          </div>
        )}
      </div>
      <Table className="">
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
      {!isPending && table.getRowModel().rows?.length > 5 && (
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
      <EditVideo
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        video={selectedVideo}
      />
      <DeleteAlertDialog
        isLoading={deleteVideoMutation.isPending}
        isOpen={isOpenForDelete}
        onClose={cancelDelete}
        onDelete={handleDelete}
        headerText="Delete Video"
        bodyText="Are you sure? You can't undo this action afterwards."
      />
    </div>
  );
}
