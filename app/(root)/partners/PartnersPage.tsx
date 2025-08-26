"use client";

import { PartnersTable } from "../../../components/partners/PartnersTable";
import { columnsPartner } from "./column";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { usePartners } from "../../../lib/react-query/query/usePartners";

const PartnersPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: partnerData, isPending } = usePartners({
    page,
    limit: 30,
    search: search ? search : undefined,
  });
  const partners = partnerData || [];

  const pathname = usePathname();
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
        <PartnersTable
          data={partners?.data}
          columns={columnsPartner}
          isFetching={isPending}
          pagination={partners}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default PartnersPage;
