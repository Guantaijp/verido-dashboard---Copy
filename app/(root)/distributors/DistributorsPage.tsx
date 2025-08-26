"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Metadata } from "next";
import React from "react";
import { DistributorTable } from "@/components/Distributors/DistributorTable";
import { columnsDistributors } from "@/components/Distributors/column";
import { useDistributors } from "@/lib/react-query/query/useDistributors";
export const metadata: Metadata = {
  title: "Distributors - Verido",
  description: "Manage Distributors in Verido",
};

const DistributorsPage = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const { data: distributors, isPending: isLoadingDistributors } =
    useDistributors({
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
        <DistributorTable
          data={distributors?.data ?? []}
          columns={columnsDistributors}
          isFetching={isLoadingDistributors}
          pagination={distributors}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};
export default DistributorsPage;
