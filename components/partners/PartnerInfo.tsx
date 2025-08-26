import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { usePartnerById } from "../../lib/react-query/query/usePartners";
import PartnerInfoCard from "./PartnerInfoCard";
import PartnerInfoCardSkeleton from "./PartnerInfoCardSkeleton";
import { CompanyTable } from "../company/ComapanyTable";
import { columnsCompany } from "../company/column";
import { useUserMetrics } from "@/lib/react-query/query/useStats";
import DashboardCard from "../home/DashboardCard";
import { useCompany } from "@/lib/react-query/query/useCompany";

const PartnerInfo = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { data: partnerDetails, isLoading } = usePartnerById(id);
  const { data: uniqueUser, isPending: isUniqueUserPending } = useUserMetrics(
    partnerDetails?._id
  );
  const { data: uniqueCompany, isFetching: isUniqueComapnyPending } =
    useCompany({
      page,
      parentId: partnerDetails?._id,
      search: search ? search : undefined,
    });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };
  const companyData = uniqueCompany || [];

  if (isLoading || isUniqueUserPending) {
    return <PartnerInfoCardSkeleton />;
  }

  return (
    <div className="w-full h-full p-2 lg:p-0">
      {partnerDetails && (
        <div className="flex flex-col p-2 gap-2">
          <PartnerInfoCard partners={partnerDetails} />
          <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden">
              <div className="px-6 py-4 bg-sidebar-gray border-b">
                <p className="font-medium">Users</p>
                <p className="text-[12px] font-normal">
                  An overview of all users registered under{" "}
                  {partnerDetails?.name}
                </p>
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DashboardCard
                    title="Total Users"
                    value={uniqueUser?.totalUsers || 0}
                    background="#E6F6EA"
                    icon="/assets/icons/green-trend.svg"
                  />
                  <DashboardCard
                    title="Companies"
                    value={uniqueUser?.companiesCount || 0}
                    background="#E6F2F2"
                    icon="/assets/icons/blue-trend.svg"
                  />
                  <DashboardCard
                    title="Super Agents"
                    value={uniqueUser?.superAgentsCount || 0}
                    background="#F1EEFB"
                    icon="/assets/icons/purple-trend.svg"
                  />
                  <DashboardCard
                    title="Sub Agents"
                    value={uniqueUser?.subAgentsCount || 0}
                    background="#FFF4E6"
                    icon="/assets/icons/orange-trend.svg"
                  />
                </div>

                <div className="w-full border rounded-[16px] overflow-hidden mt-6">
                  {/* <div className="flex justify-between items-center px-6 py-4 border-b">
                    <div>
                      <p className="font-medium">Number of Users</p>
                      <p className="text-[12px] font-normal">
                        Showing a trend of the number of users over time
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
                      src="/assets/icons/numOfUserGraph.svg"
                      alt="graph"
                      width={100}
                      height={100}
                    />

                    <div className="flex items-center gap-4 mt-6">
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-blue-2 rounded-sm"></span>
                        <span className="text-[12px]">Partners</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-purple rounded-sm"></span>
                        <span className="text-[12px]">Companies</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-orange-2 rounded-sm"></span>
                        <span className="text-[12px]">Super agents</span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="w-[12px] h-[12px] bg-verido-green-2 rounded-sm"></span>
                        <span className="text-[12px]">Sub agents</span>
                      </p>
                    </div>
                  </div> */}
                  {/* <StaticNumberOfUsers/> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <CompanyTable
              isFetching={isUniqueComapnyPending}
              data={companyData?.data}
              columns={columnsCompany}
              pagination={companyData}
              onPageChange={handlePageChange}
              onSearchChange={handleSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerInfo;
