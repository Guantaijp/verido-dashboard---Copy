"use client";

import React, { useState } from "react";
import { CompanyTable } from "@/components/company/ComapanyTable";
import { columnsCompany } from "@/components/company/column";

import { usePathname } from "next/navigation";
import { useCompany } from "@/lib/react-query/query/useCompany";

const CompanyPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: companyData, isPending } = useCompany({
    page,
    limit: 30,
    search: search ? search : undefined,
  });
  const companies = companyData || [];
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
      <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <CompanyTable
          data={companies?.data}
          columns={columnsCompany}
          isFetching={isPending}
          pagination={companies}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default CompanyPage;
