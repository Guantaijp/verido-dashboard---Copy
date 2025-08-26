"use client";
import ConsultantsInfo from "../../../../components/consultants/ConsultantsInfo";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


const Page = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="text-sm  text-verido-green">
        Home <span>/ </span>{" "}
        <span className="text-gray-text capitalize">
          {""}

          {pathname.substring(1)}
        </span>
      </div>
      <div className=" rounded-lg ">
        <ConsultantsInfo />
      </div>
    </div>
  );
};

export default Page;
