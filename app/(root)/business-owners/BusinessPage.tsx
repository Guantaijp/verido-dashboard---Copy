"use client";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import React, { useState } from "react";
import { NewBusinessOwnersTable } from "@/components/newBusinessOwners/NewBusinessOwnersTable";
import { columnsNewBusiness } from "@/components/newBusinessOwners/column";
import { useBusinessOwners } from "@/lib/react-query/query/useBusiness";
import { useAuthenticatedUser } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Business owners - Verido",
  description: "Manage Business owners in Verido",
};

const BusinessPage = () => {
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: businessOwners, isPending: isLoadingMultiBusinessOwners } =
    useBusinessOwners({
      page,
      limit: 30,
      search: search ? search : undefined,
    });
  const { currentUser } = useAuthenticatedUser();

  const isBranchView =
    currentUser?.role === "distributor" ||
    currentUser?.role === "multi_branch_business";

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
        <span className="text-gray-text">
          {isBranchView ? "Branches" : pathname.substring(1)}
        </span>
      </div>
      <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <NewBusinessOwnersTable
          data={businessOwners?.data ?? []}
          columns={columnsNewBusiness}
          isFetching={isLoadingMultiBusinessOwners}
          isBranch={isBranchView}
          pagination={businessOwners}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default BusinessPage;
