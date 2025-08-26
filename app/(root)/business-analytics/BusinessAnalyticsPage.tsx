"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StatisticsCard from "@/components/common/StatisticsCard";
import { MoneyInVLabourVMaterial } from "@/components/charts/MoneyInVLabourVMaterial";
import MoneyInMoneyOutChart from "@/components/charts/MoneyInMoneyOutChart";
import { IChartFilter, ISubscriptionTrend } from "@/types";
import DashboardCard from "@/components/home/DashboardCard";
import {
  useSubscriptionStats,
  useAdminRevenue,
  useAdminSubscriptionTrend,
  useAdminMoneyInMoneyOut,
  useAdminMoneyInVsLabour,
} from "@/lib/react-query/query/useBusinessAnalytics";
import SubscriptionTrend from "@/components/charts/SubscriptionTrend";
import NoDataGraph from "@/components/charts/NoDataGraph";
import BusinessAnalyticsSkeleton from "@/components/business-analytics/BusinessAnalyticsSkeleton";

const BusinessAnalyticsPage = () => {
  const [searchParams, setSearchParmas] = useState<IChartFilter>({
    reportCycle: "month",
    endDate: undefined,
    startDate: undefined,
  });

  const { data: subscriptionStat, isPending: isSubscriptionStatLoading } =
    useSubscriptionStats();
  const { data: adminRevenue, isPending: isAdminRevenuePending } =
    useAdminRevenue();
  const { data: subscriptionTrend, isPending: isSubscriptionTrendPending } =
    useAdminSubscriptionTrend(searchParams);
  const { data: moneyInMoneyOut } = useAdminMoneyInMoneyOut(searchParams);
  const { data: moneyInVLabourVMaterial } =
    useAdminMoneyInVsLabour(searchParams);

  if (isSubscriptionStatLoading || isAdminRevenuePending) {
    return <BusinessAnalyticsSkeleton />;
  }

  return (
    <div className="w-full flex flex-col flex-1 p-3  space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold">Business Analytics</h1>
          <p className="text-gray-text text-[12px] font-light">
            Monitor your business analytics
          </p>
        </div>
        <div className="flex gap-3 items-center justify-between">
          <Select>
            <SelectTrigger className="w-[100px]  text-light-gray">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="30">
                last 30 days
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="60">
                last 60 days
              </SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-verido-green">Export</Button>
        </div>
      </div>
      <div className=" h-full flex flex-[2.5] flex-col gap-8">
        <h1 className="font-medium text-[20px]">User Metrics</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
          <DashboardCard
            icon={"/assets/icons/green-trend.svg"}
            title={"Total Users"}
            background={"#E6F6EA"}
            value={subscriptionStat?.totalUsersCount!}
          />
          <DashboardCard
            icon={"/assets/icons/orange-trend.svg"}
            title={"Suscribed Users"}
            background={"#E6F2F2"}
            value={subscriptionStat?.subscribedUsersCount!}
          />
          <DashboardCard
            icon={"/assets/icons/teal-trend.svg"}
            title={"Unsubscribed Users"}
            background={"#E6F2FF"}
            value={subscriptionStat?.unsubscribedUsersCount!}
          />
        </div>

        <div>
          {/* <Image
            className="object-contain w-full"
            src="/assets/icons/NOU.svg"
            width={100}
            height={100}
            alt="number-of-users-chart"
          /> */}
          <NoDataGraph
            title="Number of Users"
            label="Showing a trend of users overtime."
            filterPlaceholder="Last 12 Months"
            labelOne="Total Users"
            labelTwo="Subscribed Users"
            labelThree="Unsubscribed User"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-medium text-[20px]">Revenue</h1>
          <div className="flex w-full justify-between  flex-wrap lg:flex-nowrap gap-1 lg:gap-2 items-center">
            <StatisticsCard
              value={adminRevenue?.totalSubscription!}
              bgColor="#E6F2FF"
              label="Total Subscription"
            />
            <StatisticsCard
              value={adminRevenue?.totalDireactLabour!}
              bgColor="#FFF4E6"
              label="Direct Labour"
            />
            <StatisticsCard
              value={adminRevenue?.totalDirectMaterial!}
              label="Direct Material"
              bgColor="#E6F6EA"
            />
            <StatisticsCard
              bgColor="#FFE8E5"
              value={adminRevenue?.totalOverhead!}
              label="Overhead"
            />
          </div>
        </div>
        <div>
          {/* <Image
            className="object-contain w-full"
            src="/assets/icons/TotalSubAnalytics.svg"
            width={100}
            height={100}
            alt="total-sub-chart"
          /> */}
          {/* <SubscriptionTrend chartData={subscriptionTrend ?? []} /> */}
          <NoDataGraph
            title="Total Subscription"
            label="Showing a trend of the total subscription paid by users."
            filterPlaceholder="Last 12 Months"
            labelOne="Total Subscription"
          />
        </div>
        <div>
          {/* <Image
            className="object-contain w-full"
            src="/assets/icons/MIVLVM.svg"
            width={100}
            height={100}
            alt="moneyIn-Vs-labor-chart"
          /> */}
          {/* <MoneyInVLabourVMaterial chartData={moneyInVLabourVMaterial!} /> */}
          <NoDataGraph
            title="Money In Vs Labour Vs Material "
            label="Showing a trend and breakdown of earnings and expenses."
            filterPlaceholder="Last 12 Months"
            labelOne="Money In"
            labelTwo="Direct labor"
            labelThree="Direct Material"
          />
        </div>
        <div>
          {/* <Image
            className="object-contain w-full"
            src="/assets/icons/TMIVTMO.svg"
            width={100}
            height={100}
            alt="total-moneyIn-Vs-total-orders-chart"
          /> */}
          {/* <MoneyInMoneyOutChart /> */}
          <NoDataGraph
            title="Total Money In Vs Money Out"
            label="Showing a trend of the total money in vs total money out over time."
            filterPlaceholder="Last 12 Months"
            labelOne="Money in"
            labelTwo="Money Out"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalyticsPage;
