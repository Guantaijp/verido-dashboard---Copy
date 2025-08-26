import React, { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableOptions,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ChevronDown, ChevronDownIcon } from "lucide-react";

type Prop = {
  isPaginated?: boolean;
  pageSize?: number;
  pageIndex?: number;
  rowCount?: number;
  manualPagination?: boolean;
  data: any[];
  columns: any[];
  autoResetPageIndex?: boolean;
  globalFilter?: any;
  setGlobalFilter?: (value: string) => void;
  onPageChange?: (pageIndex: number) => void;
  onRowClick?: (row: any) => void;
  sorting?: SortingState;
  paginationProps?: { className?: string; style?: React.CSSProperties };
  isLoading?: boolean;
  tableId?: string;
};

type MetaType = {
  headerProps: { className?: string; style?: React.CSSProperties };
  cellProps: { className?: string; style?: React.CSSProperties };
  footerProps: { className?: string; style?: React.CSSProperties };
};

const Table: React.FC<Prop> = ({
  manualPagination,
  isPaginated,
  data,
  columns,
  tableId,
  pageSize = 20,
  pageIndex = 0,
  rowCount = 100000,
  autoResetPageIndex = false,
  setGlobalFilter,
  globalFilter = "",
  onPageChange = () => {},
  onRowClick,
  sorting,
  paginationProps,
  isLoading,
}) => {
  const [pagination, setPagination] = useState({ pageIndex, pageSize });
  const tableOptions = useMemo(() => {
    const options: TableOptions<any> = {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      debugTable: true,
      state: { globalFilter, sorting },
      onGlobalFilterChange: setGlobalFilter,
    };

    if (isPaginated) {
      options.getPaginationRowModel = getPaginationRowModel();
      options.autoResetPageIndex = autoResetPageIndex;
      options.state = {
        ...options.state,
        pagination: {
          pageSize,
          pageIndex,
        },
      };
      if (manualPagination) {
        options.manualPagination = true;
        options.rowCount = rowCount;
        options.onPaginationChange = (updaterOrValue) => {
          if (typeof updaterOrValue === "function") {
            onPageChange(updaterOrValue({ pageIndex, pageSize }).pageIndex);
          } else {
            onPageChange(updaterOrValue.pageIndex);
          }
        };
        options.state = {
          ...options.state,
          pagination: {
            pageSize,
            pageIndex,
          },
        };
      } else {
        options.onPaginationChange = setPagination;
        options.state = {
          ...options.state,
          pagination,
        };
      }
    }

    return options;
  }, [manualPagination, isPaginated, columns, data, globalFilter, pagination]);

  const table = useReactTable({
    ...tableOptions,
  });

  const hasFooter =
    table
      ?.getFooterGroups()
      .map((group) =>
        group.headers.map((header) => header.column.columnDef.footer)
      )
      .flat()
      .filter(Boolean).length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="h-full overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap" id={tableId}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      {...(header.column.columnDef?.meta as MetaType)
                        ?.headerProps}
                      className={clsx(
                        (header.column.columnDef?.meta as MetaType)?.headerProps
                          ?.className,
                        "min-w-20 border-b border-content2 py-3 text-start text-xs text-white/80 md:text-sm"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  {columns.map((_, index) => (
                    <td key={index} className="px-1.5 py-3">
                      <Skeleton className="h-4 w-full rounded-md" />
                    </td>
                  ))}
                </tr>
              ) : null}
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={clsx({
                    "cursor-pointer hover:bg-background": !!onRowClick,
                  })}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      {...(cell.column.columnDef?.meta as MetaType)?.cellProps}
                      className={clsx(
                        (cell.column.columnDef?.meta as MetaType)?.cellProps
                          ?.className,
                        "py-3 text-xs"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {hasFooter ? (
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        {...(header.column.columnDef?.meta as MetaType)
                          ?.footerProps}
                        className={clsx(
                          (header.column.columnDef?.meta as MetaType)
                            ?.footerProps?.className,
                          ""
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            ) : null}
          </table>
        </div>
        {isPaginated ? (
          <div
            className={clsx(
              "mt-3 flex flex-wrap items-center justify-between border-content2 py-1.5",
              paginationProps?.className
            )}
          >
            <small className="text-sm">
              {table.getState().pagination.pageIndex * pageSize + 1}-
              {Math.min(
                table.getState().pagination.pageIndex * pageSize +
                  1 +
                  pageSize -
                  1,
                table.getRowCount()
              )}{" "}
              of {table.getRowCount()}
            </small>
            <div className="flex items-center gap-2.5">
              <Button
                className="grid h-[23px] min-h-0 w-[26px] min-w-0 place-content-center rounded-md px-0"
                disabled={!table.getCanPreviousPage()}
                variant="outline"
                onClick={() => {
                  table.previousPage();
                }}
              >
                <ChevronDown className="rotate-90" size={13} />
              </Button>
              <span className="text-xs">
                {table.getState().pagination.pageIndex + 1}/
                {table.getPageCount()}
              </span>
              <Button
                className="grid h-[23px] min-h-0 w-[26px] min-w-0 place-content-center rounded-md px-0"
                disabled={!table.getCanNextPage()}
                variant="outline"
                onClick={() => {
                  table.nextPage();
                }}
              >
                <ChevronDownIcon className="-rotate-90" size={13} />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Table;
