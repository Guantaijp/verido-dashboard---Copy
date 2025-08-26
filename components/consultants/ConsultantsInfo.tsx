import React, { useState } from "react";
import { useConsultantById } from "../../lib/react-query/query/useConsultant";
import { useParams } from "next/navigation";
import ConsultantInfoCard from "./ConsultantInfoCard";
import { BusinessOwnerTable } from "../businessOwners/BusinessOwnersTable";
import { columnsBusiness } from "../../app/(root)/sub-agents/column";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";
import DashboardCard from "../home/DashboardCard";
import { useBusiness } from "@/lib/react-query/query/useBusiness";

const ConsultantsInfo = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { data: selectedConsultant, isLoading } = useConsultantById(id);
  const { data: uniqueSubAgent, isPending: isUniqueSubAgentPending } =
    useBusiness({
      page,
      search: search ? search : undefined,
      parentId: selectedConsultant?.superAgent?._id,
    });
  const businessData = uniqueSubAgent || [];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  if (isLoading) {
    return <PartnerInfoCardSkeleton />;
  }
  return (
    <div className="w-full h-full p-2 lg:p-0">
      {selectedConsultant && (
        <div className="flex flex-col p-2 gap-2">
          <ConsultantInfoCard consultant={selectedConsultant?.superAgent} />

          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <BusinessOwnerTable
              isFetching={isUniqueSubAgentPending}
              data={businessData?.data}
              columns={columnsBusiness}
              pagination={businessData}
              onSearchChange={handleSearch}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden">
              <div className="px-6 py-4 bg-sidebar-gray border-b">
                <p className="font-medium">Revenue</p>
                <p className="text-[12px] font-normal">
                  {`An overview of ${selectedConsultant?.superAgent?.name} revenue`}
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

export default ConsultantsInfo;

{
  /* <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden mt-6">
              <div className="flex justify-between items-center px-6 py-4 border-b bg-sidebar-gray">
                <div>
                  <p className="font-medium">Number of Users</p>
                  <p className="text-[20px] font-medium">10</p>
                </div>
                <Button
                  size={"sm"}
                  className="flex gap-2 items-center bg-white text-gray-text px-3 py-2 text-[13px] border rounded-md"
                >
                  Year
                  <Image
                    src="/assets/icons/dropdown.svg"
                    alt="edit"
                    width={14}
                    height={14}
                  />
                </Button>
              </div>
              <div className="px-6 py-6">
                <Image
                  className="object-contain"
                  src="/assets/icons/numOfUserGraph2.svg"
                  alt="graph"
                  width={1000}
                  height={1000}
                />
                <div className="flex items-center gap-4 mt-6">
                  <p className="flex gap-1 items-center">
                    <span className="w-[12px] h-[12px] bg-verido-blue-2 rounded-sm"></span>
                    <span className="text-[12px]">Sub agents</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */
  {
    /* <div className="w-full border rounded-[16px] overflow-hidden mt-6">
                  <div className="flex justify-between items-center px-6 py-4 border-b">
                    <div>
                      <p className="font-medium">
                        Money In Vs Labour Vs Material
                      </p>
                      <p className="text-[12px] font-normal">
                        Showing a trend and breakdown of earnings and expenses.
                      </p>
                    </div>
                    <Button
                      size={"sm"}
                      className="flex gap-2 items-center bg-transparent text-gray-text px-3 py-2 text-[13px] border rounded-md"
                    >
                      Year
                      <Image
                        src="/assets/icons/dropdown.svg"
                        alt="edit"
                        width={14}
                        height={14}
                      />
                    </Button>
                  </div>
                  <div className="px-6 py-6">
                    <Image
                      className="object-contain w-full"
                      src="/assets/icons/numOfUserGraph3.svg"
                      alt="graph"
                      width={100}
                      height={100}
                    />

                    <div className="flex items-center gap-4 mt-6">
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-green-2 rounded-sm"></span>
                        <span className="text-[12px]">Money In</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-blue-2 rounded-sm"></span>
                        <span className="text-[12px]">Direct Labour</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-purple rounded-sm"></span>
                        <span className="text-[12px]">Direct Material</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full border rounded-[16px] overflow-hidden mt-6">
                  <div className="flex justify-between items-center px-6 py-4 border-b">
                    <div>
                      <p className="font-medium">Total Money In Vs Money Out</p>
                      <p className="text-[12px] font-normal">
                        Showing a trend of the total money in vs total money out
                        over time.
                      </p>
                    </div>
                    <Button
                      size={"sm"}
                      className="flex gap-2 items-center bg-transparent text-gray-text px-3 py-2 text-[13px] border rounded-md"
                    >
                      <Image
                        src="/assets/icons/filter.svg"
                        alt="edit"
                        width={14}
                        height={14}
                      />
                      Filter
                      <Image
                        src="/assets/icons/dropdown.svg"
                        alt="edit"
                        width={14}
                        height={14}
                      />
                    </Button>
                  </div>
                  <div className="px-6 py-6">
                    <Image
                      className="object-contain w-full"
                      src="/assets/icons/moneyInOutGraph.svg"
                      alt="graph"
                      width={100}
                      height={100}
                    />

                    <div className="flex items-center gap-4 mt-6">
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-green rounded-sm"></span>
                        <span className="text-[12px]">Money In</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-error rounded-sm"></span>
                        <span className="text-[12px]">Money Out</span>
                      </p>
                    </div>
                  </div>
                </div> */
  }
}
