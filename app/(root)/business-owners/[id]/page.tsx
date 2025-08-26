"use client";
import React from "react";
import { usePathname } from "next/navigation";
import IndividualBusinessInfo from "@/components/newBusinessOwners/IndividualBusinessInfo";

const Page = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm  text-verido-green p-2 lg:p-0">
        Home <span>/ </span>{" "}
        <span className="text-gray-text capitalize">
          {""}

          {pathname.substring(1)}
        </span>
      </div>
      <div className=" rounded-lg  h-[43rem]">
        <IndividualBusinessInfo />
      </div>
    </div>
  );
};

export default Page;
