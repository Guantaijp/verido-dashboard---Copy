import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCompanyById } from "../../lib/react-query/query/useCompany";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";
import CompanyInfoCard from "./CompanyInfoCard";
import { useConsultants } from "@/lib/react-query/query/useConsultant";
import { useUserMetrics } from "@/lib/react-query/query/useStats";
import { ConsultantTable } from "../consultants/ConsultantTable";
import { columnsConsultant } from "@/app/(root)/superagents/column";
import DashboardCard from "../home/DashboardCard";

const CompanyInfo = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { id } = useParams() as { id: string };

  const { data: companyDetails, isFetching, isLoading } = useCompanyById(id);
  const { data: uniqueUser, isPending: isUniqueUserPending } = useUserMetrics(
    companyDetails?._id
  );
  const { data: uniqueSuperAgent, isFetching: isUniqueSuperAgentPending } =
    useConsultants({
      page,
      search: search ? search : undefined,
      parentId: companyDetails?._id,
    });
  const superAgentData = uniqueSuperAgent || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  if (isLoading || isUniqueUserPending) {
    return <PartnerInfoCardSkeleton />;
  }

  return (
    <div className="w-full h-full p-2 lg:p-0">
      {companyDetails && (
        <div className="flex flex-col p-2 gap-2">
          <CompanyInfoCard company={companyDetails} />
          <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <div className="w-full border rounded-[16px] overflow-hidden">
              <div className="px-6 py-4 bg-sidebar-gray border-b">
                <p className="font-medium">Users</p>
                <p className="text-[12px] font-normal">
                  An overview of all users registered under{" "}
                  {companyDetails?.name || companyDetails?.companyName}
                </p>
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5">
                  <DashboardCard
                    title="Total Users"
                    value={uniqueUser?.totalUsers || 0}
                    background="#E6F6EA"
                    icon="/assets/icons/green-trend.svg"
                  />
                  <DashboardCard
                    title="Super agents"
                    value={uniqueUser?.superAgentsCount || 0}
                    background="#E6F2F2"
                    icon="/assets/icons/orange-trend.svg"
                  />
                  <DashboardCard
                    title="Sub agents"
                    value={uniqueUser?.subAgentsCount || 0}
                    background="#F1EEFB"
                    icon="/assets/icons/green-trend.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <ConsultantTable
              data={superAgentData?.data}
              columns={columnsConsultant}
              isFetching={isUniqueSuperAgentPending}
              pagination={superAgentData}
              onPageChange={handlePageChange}
              onSearchChange={handleSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;

/* <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
            <StatisticsCard
              value={`$ ${ 0} `}
              bgColor="verido-card-green"
              label="Total Subscriotion"
              percentage={2.5}
              trend="up"
            />
            <StatisticsCard
              value={`$ ${ 0}`}
              bgColor="verido-card-purple"
              label="Direct Labour"
              percentage={2.5}
              trend="up"
            />
            <StatisticsCard
              value={`$ ${ 0}`}
              label="Direct Materials"
              bgColor="verido-card-red"
              percentage={2.5}
              trend="down"
            />
            <StatisticsCard
              bgColor="verido-card-orange"
              value={`$40,000`}
              label="Overhead"
              percentage={2.5}
              trend="up"
            />
          </div>
          <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
            <ConsultantTable
              data={consultantsData}
              columns={columnsConsultant}
              isFetching
            />
          </div>

          */
