import React from "react";
import { Skeleton } from "../ui/skeleton";

const PartnerInfoCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      {/* Header Section */}
      <div className="flex  justify-between items-center">
        <div className="flex  items-center gap-4">
          <Skeleton className="rounded-full bg-light-green p-3 h-[40px] w-[40px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-[28px] w-[120px]" />
            <Skeleton className="h-[18px] w-[180px] mt-2" />
            <Skeleton className="h-[20px] w-[100px] mt-1" />
          </div>
        </div>
        <div className="flex  items-center gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[40px] w-[100px] rounded-md" />
          ))}
        </div>
      </div>

      {/* Basic Information Section */}
      <div className=" rounded-[16px] overflow-hidden">
        <Skeleton className="h-[50px] w-full bg-sidebar-gray" />
        <div className="flex px-6 py-6">
          {/* Left Column */}
          <div className="w-1/2 flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[18px] w-[180px]" />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[18px] w-[180px]" />
            ))}
          </div>
        </div>
      </div>
      <div className=" rounded-[16px] overflow-hidden">
        <Skeleton className="h-[50px] w-full bg-sidebar-gray" />
        <div className="flex px-6 py-6">
          {/* Left Column */}
          <div className="w-full flex justify-between  gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[180px] w-[280px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfoCardSkeleton;
