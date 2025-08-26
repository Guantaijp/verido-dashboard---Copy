"use client";
import React, { useState } from "react";
import { columnsVideo } from "../../components/video/column";
import { VideoTable } from "../../components/video/VideoTable";
import { useVideos } from "../../lib/react-query/query/useVideo";
import { cardData, countryData } from "../../constant/index";
import { useAuthenticatedUser } from "../../context/AuthContext";
import {
  useGetNumberOfUsersLineGraph,
  useUserHierarchyCount,
  useUserMetrics,
} from "@/lib/react-query/query/useStats";
import NoRevenueCard from "./NoRevenueCard";

import StatisticsCard from "@/components/common/StatisticsCard";
import AddUser from "@/components/AllUsers/AddUser";
import DashboardCard from "./DashboardCard";
import { DownLinksGraph } from "../charts/DownLinksGraph";
import DashboardSkeleton from "./DashboardSkeleton";
import { NumberOfUsers } from "@/components/charts/NumberOfUsers";
import NoDataGraph from "../charts/NoDataGraph";
import ProductList from "../products/ProductList";

const DashboardHome = () => {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("");

  const { currentUser, isLoading, hasPermissions } = useAuthenticatedUser();
  const { data: videData, isPending: isVideoPending } = useVideos({
    limit: 5,
  });
  const { data: uniqueUsers, isLoading: isUniqueUsersPending } =
    useUserMetrics();

  const { data: userHierarchyCount, isPending: isUserHierarchyCountPending } =
    useUserHierarchyCount({
      reportCycle: "month",
    });

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
  };

  if (isLoading || isUniqueUsersPending) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      {currentUser && (
        <div className="w-full flex flex-col flex-1 p-3  space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-0">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-text text-[12px] font-light">
                Find your company&apos;s key metrics and activities here
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {/* <div className="items-center hidden lg:flex p-2 justify-between border border-text-gray rounded-lg h-[2.5rem]">
                <Image
                  className="object-contain"
                  src="/assets/icons/person.svg"
                  alt="search icon"
                  width={15}
                  height={15}
                />
                <Input
                  placeholder="Search"
                  className="max-w-sm h-full outline-none"
                />
              </div> */}
              {/* <Select>
                <SelectTrigger className="w-[100px]  text-light-gray">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="text-sm text-light-gray" value="desc">
                    Descending
                  </SelectItem>
                  <SelectItem className="text-sm text-light-gray" value="asc">
                    Asecending
                  </SelectItem>
                </SelectContent>
              </Select> */}

              {hasPermissions(
                ["superagents.create", "company.create"],
                false
              ) && <AddUser />}
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between gap-7">
            <div className="w-full lg:flex-row flex flex-col gap-10">
              <div className=" h-full flex flex-[2.5] flex-col gap-8">
                <h1 className="font-medium text-[20px]">
                  Performance Overview
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
                  {cardData
                    .filter((card) => card.roles.includes(currentUser.role))
                    .map((card: any, index) => {
                      let value = card.value;
                      if (uniqueUsers) {
                        switch (card.title) {
                          case "Country Admin":
                            value = uniqueUsers?.countryAdmin;
                            break;
                          case "Partners":
                            value = uniqueUsers?.partnersCount;
                            break;
                          case "Super Agents":
                            value = uniqueUsers.superAgentsCount;
                            break;
                          case "Sub Agents":
                            value =
                              uniqueUsers.subAgentsCount ||
                              uniqueUsers?.subagentCount;
                            break;
                          case "Total Users":
                            value = uniqueUsers?.totalUsers;
                            break;
                          case "Companies":
                            value =
                              uniqueUsers?.company ||
                              uniqueUsers?.companiesCount;
                            break;
                          case "Digital Entrepreneurs":
                            value = uniqueUsers?.digitalEntrepreneurCount;
                            break;
                          case "Distributors":
                            value = uniqueUsers?.distributorCount;
                            break;
                          case "Multibranch Businesses":
                            value = uniqueUsers?.multibranchBusinessCount;
                            break;
                          case "Branches":
                            value = uniqueUsers.branchCount;

                            break;
                          case "Business Owners":
                            value = uniqueUsers.businessOwnerCount;
                            break;
                        }
                      }
                      return (
                        <DashboardCard
                          key={index}
                          title={card.title}
                          value={value}
                          background={card.background}
                          icon={card.icon}
                        />
                      );
                    })}
                </div>

                <div className="border-[1.5px] w-full rounded-[20px] p-5">
                  <ProductList isWidget />
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
                  {currentUser?.role === "partner" ? (
                    <>
                      <DashboardCard
                        title="Total Users"
                        value={1}
                        background="#E6F6EA"
                        icon="/assets/icons/green-trend.svg"
                      />
                      <DashboardCard
                        title="Companies"
                        value={1}
                        background="#FFF4E6"
                        icon="/assets/icons/purple-trend.svg"
                      />
                      <DashboardCard
                        title="Super Agents"
                        value={0}
                        background="#E6F2F2"
                        icon="/assets/icons/orange-trend.svg"
                      />
                      <DashboardCard
                        title="SubAgents"
                        value={0}
                        background="#F1EEFB"
                        icon="/assets/icons/red-trend.svg"
                      />
                    </>
                  ) : (
                    cardData
                      .filter((card) => card.roles.includes(currentUser.role))
                      .map((card: any, index) => {
                        let value = card.value;
                        if (numberOfUsers) {
                          switch (card.title) {
                            case "Country Admin":
                              value = numberOfUsers.countryAdmin;
                              break;
                            case "Partners":
                              value = numberOfUsers.partnerCount;
                              break;
                            case "Super Agents":
                              value = numberOfUsers.consultantCount;
                              break;
                            case "Sub Agents":
                              value = numberOfUsers.businessCount;
                              break;
                            case "Total Users":
                              value = numberOfUsers.totalUsers;
                              break;
                            case "Companies":
                              value = numberOfUsers.company;
                              break;
                          }
                        }
                        return (
                          <DashboardCard
                            key={index}
                            title={card.title}
                            value={value}
                            background={card.background}
                            icon={card.icon}
                          />
                        );
                      })
                  )}
                </div> */}
                {/* {currentUser?.role === "partner" ||
                currentUser?.role === "companies" ? (
                  <StaticNumberOfUsers />
                ) : ( */}
                <NumberOfUsers
                  chartData={userHierarchyCount}
                  year={year}
                  month={month}
                  onYearChange={handleYearChange}
                  onMonthChange={handleMonthChange}
                  isLoading={isUserHierarchyCountPending}
                />
                {/* )} */}

                <div className="flex flex-col gap-5">
                  <h1 className="font-medium text-[20px]">Revenue</h1>
                  <div className="flex w-full justify-between  flex-wrap lg:flex-nowrap gap-1 lg:gap-2 items-center">
                    <StatisticsCard
                      value={`$0`}
                      bgColor="#E6F2FF"
                      label="Total"
                    />
                    <StatisticsCard
                      value={`$0`}
                      bgColor="#FFF4E6"
                      label="Subscription"
                    />
                    <StatisticsCard
                      value={`$0`}
                      label="Adverts"
                      bgColor="#E6F6EA"
                    />
                    <StatisticsCard
                      bgColor="#FFE8E5"
                      value={`$0`}
                      label="Partnerships"
                    />
                  </div>
                </div>

                <NoDataGraph
                  title="Revenue"
                  label="Showing a trend of the number of users over time"
                  filterPlaceholder="Filter"
                  labelOne="Subscription"
                  labelTwo="Adverts"
                  labelThree="Partnerships"
                />

                <div className="flex flex-col gap-5">
                  <h1 className="font-medium text-[20px]">
                    Money In Vs Money Out
                  </h1>
                  <div className="flex w-full justify-between  flex-wrap lg:flex-nowrap gap-2 items-center">
                    <StatisticsCard
                      value={`$0`}
                      bgColor="#FFE8E5"
                      label="Total"
                    />
                    <StatisticsCard
                      value={`$0`}
                      bgColor="#FFF4E6"
                      label="Payment Due"
                    />
                    <StatisticsCard
                      value={`$0`}
                      label="Paid"
                      bgColor="#E6F2FF"
                    />
                    <StatisticsCard
                      bgColor="#E6F6EA"
                      value={`$0`}
                      label="Outstanding Payments"
                    />
                  </div>
                </div>

                <NoDataGraph
                  title="Total Revenue Vs Payment Due"
                  label="Showing a trend of the total revenue vs the payment due for a specific period."
                  filterPlaceholder="Last 12 Months"
                  labelOne="Total Revenue"
                  labelTwo="Payment Due"
                />
                <NoDataGraph
                  title="Paid Vs Outstanding Payments"
                  label="Showing a trend revenue paid and outstanding payments."
                  filterPlaceholder="Last 12 Months"
                  labelOne="Total Revenue"
                  labelTwo="Payment Due"
                />

                {currentUser?.role === "master_admin" && (
                  <div className="flex justify-between flex-col rounded-md max-h-[30rem] overflow-y-auto">
                    <VideoTable
                      isPending={isVideoPending}
                      addVideo={false}
                      columns={columnsVideo}
                      data={videData?.data ?? []}
                    />
                  </div>
                )}
              </div>
              <div className="h-full flex flex-col flex-1 gap-6">
                <DownLinksGraph />
                {currentUser?.role === "master_admin" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    <NoRevenueCard title="Top 5 Revenue: Country" />
                    <NoRevenueCard title="Top 5 Revenue: Partners" />
                    <NoRevenueCard title="Top 5 Revenue: Company" />
                    <NoRevenueCard title="Top 5 Revenue: SuperAgents" />
                    <NoRevenueCard title="Top 5 Revenue: SubAgents" />
                    {/* <RevenueCard
                      title="Top 5 Revenue: Country"
                      items={countryRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: Partner"
                      items={partnerRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: Company"
                      items={companyRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: SuperAgents"
                      items={superAgentsRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: SubAgents"
                      items={subAgentsRevenueData}
                    /> */}
                  </div>
                )}
                {currentUser?.role === "country_admin" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    <NoRevenueCard title="Top 5 Revenue: Partners" />
                    <NoRevenueCard title="Top 5 Revenue: Company" />
                    <NoRevenueCard title="Top 5 Revenue: SuperAgents" />
                    <NoRevenueCard title="Top 5 Revenue: SubAgents" />
                    {/* <RevenueCard
                      title="Top 5 Revenue: Partner"
                      items={partnerRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: Company"
                      items={companyRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: SuperAgents"
                      items={superAgentsRevenueData}
                    />
                    <RevenueCard
                      title="Top 5 Revenue: SubAgents"
                      items={subAgentsRevenueData}
                    /> */}
                  </div>
                )}
                {currentUser?.role === "partner" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    <NoRevenueCard title="Top 5 Revenue: Company" />
                    <NoRevenueCard title="Top 5 Revenue: SuperAgents" />
                    <NoRevenueCard title="Top 5 Revenue: SubAgents" />
                  </div>
                )}
                {currentUser?.role === "companies" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    <NoRevenueCard title="Top 5 Revenue: SuperAgents" />
                    <NoRevenueCard title="Top 5 Revenue: SubAgents" />
                  </div>
                )}
                {currentUser?.role === "super_agent" && (
                  <NoRevenueCard title="Top 5 Revenue: SubAgents" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHome;
