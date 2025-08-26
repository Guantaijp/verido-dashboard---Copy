import React, { useState } from "react";
import { useConsultantById } from "../../lib/react-query/query/useConsultant";
import { useParams } from "next/navigation";
import DistributorInfoCard from "./DistributorInfoCard";
import { columnsNewBusiness } from "../newBusinessOwners/column";
import { NewBusinessOwnersTable } from "../newBusinessOwners/NewBusinessOwnersTable";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";
import DashboardCard from "../home/DashboardCard";
import { useDistributorsById } from "@/lib/react-query/query/useDistributors";
import { useDistributorsBranches } from "@/lib/react-query/query/useDistributors";

const DistributorInfo = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: selectedDistributor, isLoading } = useDistributorsById(id);
  const { data: distributorBranches, isPending: isdistributorBranchPending } =
    useDistributorsBranches({
      id: selectedDistributor?.id,
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
      {selectedDistributor && (
        <div className="flex flex-col p-2 gap-2">
          <DistributorInfoCard distributor={selectedDistributor} />

          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <NewBusinessOwnersTable
              isFetching={isdistributorBranchPending}
              data={distributorBranches?.data}
              pagination={distributorBranches}
              columns={columnsNewBusiness}
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
                  {`An overview of ${selectedDistributor?.name} revenue`}
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

export default DistributorInfo;
