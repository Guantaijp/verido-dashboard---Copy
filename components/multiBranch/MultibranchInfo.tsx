import React, { useState } from "react";
import { useParams } from "next/navigation";
import { columnsNewBusiness } from "../newBusinessOwners/column";
import MultibranchInfoCard from "./MultibranchInfoCard";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";
import DashboardCard from "../home/DashboardCard";
import { NewBusinessOwnersTable } from "../newBusinessOwners/NewBusinessOwnersTable";
import {
  useMultibranchBusinessById,
  useMultibrancBusinessBranches,
} from "@/lib/react-query/query/useMultiBranchBusiness";

const MultibranchInfo = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: selectedMultibranch, isLoading } =
    useMultibranchBusinessById(id);
  const { data: multibranchBusiness, isPending: isMultibranchBusinessPending } =
    useMultibrancBusinessBranches({
      id: selectedMultibranch?.id,
      params: {
        page,
        search: search ? search : undefined,
      },
    });
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (searchValue: string) => setSearch(searchValue);

  if (isLoading) {
    return <PartnerInfoCardSkeleton />;
  }
  return (
    <div className="w-full h-full p-2 lg:p-0">
      {selectedMultibranch && (
        <div className="flex flex-col p-2 gap-2">
          <MultibranchInfoCard multibranch={selectedMultibranch} />

          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <NewBusinessOwnersTable
              isFetching={isMultibranchBusinessPending}
              data={multibranchBusiness?.data ?? []}
              columns={columnsNewBusiness}
              pagination={multibranchBusiness}
              onSearchChange={handleSearch}
              onPageChange={handlePageChange}
              isBranch
            />
          </div>

          <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden">
              <div className="px-6 py-4 bg-sidebar-gray border-b">
                <p className="font-medium">Revenue</p>
                <p className="text-[12px] font-normal">
                  {`An overview of ${selectedMultibranch?.name} revenue`}
                </p>
              </div>
              <div className="px-6 py-6">
                <div className="flex flex-wrap gap-4">
                  <DashboardCard
                    title="Total Subscription"
                    value={0}
                    background="#E6F6EA"
                    icon="/assets/icons/green-trend.svg"
                  />
                  <DashboardCard
                    title="Direct Labour"
                    value={0}
                    background="#E6F2FF"
                    icon="/assets/icons/blue-trend.svg"
                  />
                  <DashboardCard
                    title="Direct Material"
                    value={0}
                    background="#F1EEFB"
                    icon="/assets/icons/purple-trend.svg"
                  />
                  <DashboardCard
                    title="Overhead"
                    value={0}
                    background="#FFF4E6"
                    icon="/assets/icons/orange-trend.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultibranchInfo;
