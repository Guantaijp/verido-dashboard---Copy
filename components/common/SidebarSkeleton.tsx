"use client";
import React from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const SidebarSkeleton: React.FC = () => {
  return (
    <>
      <ul className="flex flex-col gap-5 -mt-3 px-2">
        {[...Array(8)].map((_, index) => (
          <li key={index} className="flex items-center relative px-6 py-3">
            <Skeleton className="w-[25px] h-[25px]" />
            <Skeleton className="w-full h-[20px] mx-3" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarSkeleton;
