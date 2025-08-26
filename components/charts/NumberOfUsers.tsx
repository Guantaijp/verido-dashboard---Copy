"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Button } from "../ui/button";
import { Ban } from "lucide-react";
import { useAuthenticatedUser } from "@/context/AuthContext";

interface ChartData {
  period: string;
  count: {
    "Sub agent": number;
    "Multi branch business": number;
    Distributor: number;
    "Digital entrepreneur": number;
    "Super agent": number;
    Companies: number;
    Partner: number;
    "Country admin": number;
  };
}

interface ChartProps {
  chartData: ChartData[];
  year: string;
  month: string;
  isLoading: boolean;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

const chartConfig = {
  "Country admin": {
    label: "Country Admins",
    color: "#7D65DC",
  },
  Partner: {
    label: "Partners",
    color: "#FF9500",
  },
  Companies: {
    label: "Companies",
    color: "#FF6F61",
  },
  "Super agent": {
    label: "Super Agents",
    color: "#007AFF",
  },
  "Sub agent": {
    label: "Sub Agents",
    color: "#008080",
  },
  "Multi branch business": {
    label: "Multi Branch Business",
    color: "#9B59B6",
  },
  Distributor: {
    label: "Distributors",
    color: "#E67E22",
  },
  "Digital entrepreneur": {
    label: "Digital Entrepreneurs",
    color: "#27AE60",
  },
  Branches: {
    label: "Branches",
    color: "#27AE61",
  },
  "Business owners": {
    label: "Business Owners",
    color: "#27AE61",
  },
} satisfies ChartConfig;

export function NumberOfUsers({
  chartData,
  year,
  month,
  isLoading,
  onYearChange,
  onMonthChange,
}: ChartProps) {
  const hasData = chartData && chartData.length > 0;

  const handleYearChange = (value: string) => {
    onYearChange(value);
  };

  const handleMonthChange = (value: string) => {
    onMonthChange(value);
  };
  const { currentUser } = useAuthenticatedUser();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based

  const filteredChartData = chartData?.filter((item) => {
    const itemDate = new Date(item.period);
    const itemMonth = itemDate.getMonth();
    const itemYear = itemDate.getFullYear().toString();

    return itemYear === year && (!month ? itemMonth <= currentMonth : true);
  });
  const availableRoles = Object.keys(chartConfig).filter((roleKey) =>
    filteredChartData?.some(
      (item) => item.count[roleKey as keyof ChartData["count"]] > 0
    )
  );
  const CustomLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap gap-4 pt-4">
        {payload
          ?.filter((entry: any) =>
            availableRoles.includes(entry.dataKey.replace("count.", ""))
          )
          .map((entry: any, index: number) => {
            const key = entry.dataKey.replace(
              "count.",
              ""
            ) as keyof typeof chartConfig;
            return (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key]?.label}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 border border-verido-gray-2 rounded-md bg-verido-white h-[400px] p-4">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[10rem] h-4 rounded-md" />
            <Skeleton className="w-[16rem] h-2 rounded-md" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="w-[8rem] h-10 rounded-md" />
            <Skeleton className="w-[8rem] h-10 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col gap-2 h-[calc(100%-40px)]">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-sm">Number of Users</CardTitle>
          <p className="text-sm text-text-gray">
            Showing a trend of the number of users over time
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Select value={month} onValueChange={handleMonthChange}>
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
            {month && (
              <Button
                onClick={() => onMonthChange("")}
                className="flex items-center gap-1 text-gray-500 text-[10px] font-semibold bg-verido-card-red"
              >
                <Ban size={16} />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <>
            <ChartContainer
              className="h-[400px] w-full p-0"
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      if (month) {
                        const day = parseInt(value.split("-")[2]);
                        return day.toString();
                      } else {
                        return date.toLocaleString("default", {
                          month: "short",
                        });
                      }
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => value.toString()}
                    domain={[0, "dataMax + 1"]}
                    allowDataOverflow={true}
                  />
                  <Tooltip
                    cursor={false}
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;

                      return (
                        <div className="rounded-lg border bg-white p-2 shadow-sm">
                          <div className="grid gap-2">
                            {payload.map((entry: any, index: number) => {
                              const key = entry.dataKey.replace("count.", "");
                              return (
                                <div
                                  key={`item-${index}`}
                                  className="flex items-center justify-between gap-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-2 w-2 rounded-full"
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-sm font-medium">
                                      {
                                        chartConfig[
                                          key as keyof typeof chartConfig
                                        ]?.label
                                      }
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {entry.value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend content={CustomLegend} />
                  <Line
                    dataKey="count.Country admin"
                    type="monotone"
                    stroke={chartConfig["Country admin"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Partner"
                    type="monotone"
                    stroke={chartConfig["Partner"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Companies"
                    label="Company"
                    type="monotone"
                    stroke={chartConfig["Companies"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Super agent"
                    type="monotone"
                    stroke={chartConfig["Super agent"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Sub agent"
                    type="monotone"
                    stroke={chartConfig["Sub agent"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Multi branch business"
                    type="monotone"
                    stroke={chartConfig["Multi branch business"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Distributor"
                    type="monotone"
                    stroke={chartConfig["Distributor"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Digital entrepreneur"
                    type="monotone"
                    stroke={chartConfig["Digital entrepreneur"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Branches"
                    type="monotone"
                    stroke={chartConfig["Branches"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    dataKey="count.Business Owners"
                    type="monotone"
                    stroke={chartConfig["Business owners"].color}
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-row flex-wrap items-center gap-5 mt-10">
              {/* <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-chart-purple rounded-sm"></div>
                <p className="text-[12px]">Country Admins</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-verido-orange rounded-sm"></div>
                <p className="text-[12px]">Partners</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-verido-orange-2 rounded-sm"></div>
                <p className="text-[12px]">Companies</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-2 bg-verido-blue-2 rounded-sm"></div>
                <p className="text-[12px]">Super Agents</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-verido-green-2 rounded-sm"></div>
                <p className="text-[12px]">Sub Agents</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-[#9B59B6] rounded-sm"></div>
                <p className="text-[12px]">Multi Branch Business</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-[#E67E22] rounded-sm"></div>
                <p className="text-[12px]">Distributors</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-3 h-3 bg-[#27AE60] rounded-sm"></div>
                <p className="text-[12px]">Digital Entrepreneurs</p>
              </div> */}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500">No data found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
