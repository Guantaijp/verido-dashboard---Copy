"use client";
import React from "react";
import type { Metadata } from "next";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DigitalEntrepreneurTable } from "@/components/DigitalEntrepreneurs/DigitalEntrepreneurTable";
import { columnsDigitalEntrepreneur } from "@/components/DigitalEntrepreneurs/column";
import { useDigitalEntrepreneurs } from "@/lib/react-query/query/useDigitalEntrepreneurs";
export const metadata: Metadata = {
  title: "Digital Enterpreneur - Verido",
  description: "Manage Digital Enterpreneur in Verido",
};

const DigitalEntrepreneurPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: digitalEntrepreneur, isPending: isLoadingDigitalEntrepreneur } =
    useDigitalEntrepreneurs({
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
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-verido-green p-2 lg:p-0">
        Home <span>/</span>{" "}
        <span className="text-gray-text">{pathname.substring(1)}</span>
      </div>
      <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <DigitalEntrepreneurTable
          data={digitalEntrepreneur?.data ?? []}
          columns={columnsDigitalEntrepreneur}
          isFetching={isLoadingDigitalEntrepreneur}
          pagination={digitalEntrepreneur}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default DigitalEntrepreneurPage;
