"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Metadata } from "next";
import React from "react";
import { MultibranchTable } from "@/components/multiBranch/MultibranchTable";
import { columnsMultibranch } from "@/components/multiBranch/column";
import { useMultibranchBusiness } from "@/lib/react-query/query/useMultiBranchBusiness";
export const metadata: Metadata = {
  title: "Multibranches - Verido",
  description: "Manage Multibranches in Verido",
};

const MultibranchesPage = () => {
  const pathname = usePathname();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: multiBranchBusiness, isPending: isLoadingMultiBranchBusiness } =
    useMultibranchBusiness({
      page,
      limit: 30,
      search: search ? search : undefined,
    });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-verido-green p-2 lg:p-0">
        Home <span>/</span>{" "}
        <span className="text-gray-text">{pathname.substring(1)}</span>
      </div>
      <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <MultibranchTable
          data={multiBranchBusiness?.data ?? []}
          columns={columnsMultibranch}
          isFetching={isLoadingMultiBranchBusiness}
          pagination={multiBranchBusiness}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};
export default MultibranchesPage;
