import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useBusinessById } from "../../lib/react-query/query/useBusiness";
import BranchInfoCard from "./BranchInfoCard";
import { AdminBusinessFullResponse } from "@/types";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";

const BranchInfo = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading } = useBusinessById(id);
  const businessData = data as AdminBusinessFullResponse;

  if (isLoading) {
    return <PartnerInfoCardSkeleton />;
  }

  return (
    <div className="w-full h-full p-2 lg:p-0">
      {businessData && (
        <div className="flex flex-col p-2 gap-2">
          <BranchInfoCard branch={businessData.response} />

          <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden">
              <div className="px-6 py-4 bg-sidebar-gray border-b">
                <p className="font-medium">Revenue</p>
                <p className="text-[12px] font-normal">
                  An overview of {businessData?.response?.first_name}{" "}
                  {businessData?.response?.last_name} revenue
                </p>
              </div>
              <div className="px-6 py-6">
                <div className="flex flex-wrap gap-4">
                  <div className="bg-active-green rounded-lg flex flex-1 justify-between items-center p-3">
                    <div>
                      <p className="font-medium text-gray-700 text-[13px] mb-3">
                        Total Subscription
                      </p>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="text-[16px] font-bold">0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-gray-500 text-[9px]">Last month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        className="object-contain"
                        src="/assets/icons/green-trend.svg"
                        alt="trend"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>

                  <div className="bg-verido-card-blue rounded-lg flex flex-1 justify-between items-center p-3">
                    <div>
                      <p className="font-medium text-gray-700 text-[13px] mb-3">
                        Direct Labour
                      </p>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="text-[16px] font-bold">0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-gray-500 text-[9px]">Last month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        className="object-contain"
                        src="/assets/icons/blue-trend.svg"
                        alt="trend"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>

                  <div className="bg-verido-card-purple rounded-lg flex flex-1 justify-between items-center p-3">
                    <div>
                      <p className="font-medium text-gray-700 text-[13px] mb-3">
                        Direct Material
                      </p>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="text-[16px] font-bold">0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-gray-500 text-[9px]">Last month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        className="object-contain"
                        src="/assets/icons/purple-trend.svg"
                        alt="trend"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>

                  <div className="bg-verido-card-orange rounded-lg flex flex-1 justify-between items-center p-3">
                    <div>
                      <p className="font-medium text-gray-700 text-[13px] mb-3">
                        Overhead
                      </p>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="text-[16px] font-bold">0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-gray-500 text-[9px]">Last month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        className="object-contain"
                        src="/assets/icons/orange-trend.svg"
                        alt="trend"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchInfo;
