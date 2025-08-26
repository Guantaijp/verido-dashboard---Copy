import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const staticChartConfig = {
  companies: {
    label: "Companies",
    color: "#FF6F61",
  },
  superAgents: {
    label: "Super Agents",
    color: "#007AFF",
  },
  subAgents: {
    label: "Sub Agents",
    color: "#008080",
  },
} satisfies ChartConfig;

const staticChartData = [
  {
    date: "2024-07-01",
    companies: 0,
    superAgents: 0,
    subAgents: 0,
  },
  {
    date: "2024-08-01",
    companies: 0,
    superAgents: 0,
    subAgents: 0,
  },
  {
    date: "2024-09-01",
    companies: 0,
    superAgents: 0,
    subAgents: 0,
  },
  {
    date: "2024-10-01",
    companies: 1,
    superAgents: 0,
    subAgents: 0,
  },
];

export function StaticNumberOfUsers() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = Cookies.get("user_role");
    setUserRole(role || "guest"); 
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-sm">Number of Users</CardTitle>
          <p className="text-sm text-text-gray">
            Showing a trend of the number of users over time
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={staticChartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={staticChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString("default", { month: "short" });
                }}
              />
              <YAxis
                tickFormatter={(value) => value.toString()}
                domain={[0, "dataMax + 1"]}
                allowDataOverflow={true}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {userRole !== "companies" && (
                <Line
                  dataKey="companies"
                  type="monotone"
                  stroke={staticChartConfig.companies.color}
                  strokeWidth={2}
                  dot={false}
                />
              )}

              <Line
                dataKey="superAgents"
                type="monotone"
                stroke={staticChartConfig.superAgents.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="subAgents"
                type="monotone"
                stroke={staticChartConfig.subAgents.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-row items-center space-x-5 mt-10">
          {userRole !== "companies" && (
            <div className="flex flex-row gap-2 items-center">
              <div className="w-3 h-3 bg-verido-orange-2 rounded-sm"></div>
              <p className="text-[12px]">Companies</p>
            </div>
          )}
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-2 bg-verido-blue-2 rounded-sm"></div>
            <p className="text-[12px]">Super Agents</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 bg-verido-green-2 rounded-sm"></div>
            <p className="text-[12px]">Sub Agents</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
