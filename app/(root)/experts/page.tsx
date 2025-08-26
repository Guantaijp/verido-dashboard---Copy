"use client";
import { columns } from "./column";
import React from "react";
import { useBusiness } from "../../../lib/react-query/query/useBusiness";
import { usePathname } from "next/navigation";
import { AdminBusinessResponse } from "../../../types/index";
import { ExpertsTable } from "../../../components/experts/ExpertTable";
const extractExperts = (data: AdminBusinessResponse[]): any[] => {
  return data.flatMap((business) => business.customer || []);
};

const Experts = () => {
  const { data: businessData } = useBusiness();
  const pathname = usePathname();

  // const experts = businessData ? extractExperts(businessData) : [];


  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-verido-green p-2 lg:p-0">
        Home <span>/</span>{" "}
        <span className="text-gray-text">{pathname.substring(1)}</span>
      </div>
      <div className="bg-verido-white p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        {/* <ExpertsTable data={experts} columns={columns} /> */}
      </div>
    </div>
  );
};

export default Experts;
