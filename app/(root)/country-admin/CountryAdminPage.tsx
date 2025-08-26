"use client";

import { CountryAdminTable } from "@/components/countryAdmin/CountryAdminTable";
import { columnsCountryAdmin } from "@/components/countryAdmin/column";
import React, { useState } from "react";

import { usePathname } from "next/navigation";
import { useCountryAdmin } from "@/lib/react-query/query/useCountryAdmin";

const CountryAdminPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: countryAdminData, isPending } = useCountryAdmin({
    page,
    limit: 30,
    search: search ? search : undefined,
  });
  const countryAdmin = countryAdminData?.data || [];
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
        <CountryAdminTable
          data={countryAdmin}
          columns={columnsCountryAdmin}
          isPending={isPending}
          pagination={countryAdminData}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default CountryAdminPage;
