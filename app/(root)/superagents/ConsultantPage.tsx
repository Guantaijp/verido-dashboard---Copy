"use client";

import React, { useState } from "react";
import { ConsultantTable } from "../../../components/consultants/ConsultantTable";
import { columnsConsultant } from "./column";
import { usePathname } from "next/navigation";
import { useConsultants } from "../../../lib/react-query/query/useConsultant";

const ConsultantsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: consultantsData, isLoading } = useConsultants({
    page,
    limit: 30,
    search: search ? search : undefined,
  });
  const pathname = usePathname();
  const consultantData = consultantsData || [];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-sm text-verido-green p-2 lg:p-0">
          Home <span>/</span>{" "}
          <span className="text-gray-text">{pathname.substring(1)}</span>
        </div>

        <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
          <ConsultantTable
            data={consultantData?.data}
            columns={columnsConsultant}
            isFetching={isLoading}
            pagination={consultantData}
            onPageChange={handlePageChange}
            onSearchChange={handleSearch}
          />
        </div>
      </div>
    </>
  );
};

export default ConsultantsPage;
