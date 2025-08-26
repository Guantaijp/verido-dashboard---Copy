"use client";
import { columnsBusiness } from "./column";
import React, { useState } from "react";
import { useBusiness } from "../../../lib/react-query/query/useBusiness";
import { usePathname } from "next/navigation";
import { BusinessOwnerTable } from "../../../components/businessOwners/BusinessOwnersTable";

const BusinessOwnersPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: businessData, isPending } = useBusiness({
    page,
    limit: 30,
    search: search ? search : undefined,
  });

  const adminBusiness = businessData || [];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-verido-green p-2 lg:p-0">
        Home <span>/</span>{" "}
        <span className="text-gray-text">{pathname.substring(1)}</span>
      </div>
      <div className="bg-verido-white p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <BusinessOwnerTable
          data={adminBusiness?.data}
          columns={columnsBusiness}
          isFetching={isPending}
          pagination={adminBusiness}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default BusinessOwnersPage;
