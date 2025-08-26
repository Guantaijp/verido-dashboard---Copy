"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ISubscriptionTrend } from "@/types";

interface ChartProps {
  chartData: ISubscriptionTrend[];
}

const chartConfig = {
  count: {
    label: "Subscription",
    color: "#08A730",
  },
} satisfies ChartConfig;

const SubscriptionTrend = ({ chartData }: ChartProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-sm">Total Subscription</CardTitle>
          <p className="text-sm text-text-gray">
            Showing a trend of the subscription paid by users.
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select>
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
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full p-0" config={chartConfig}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
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

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="#08A730" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex flex-row flex-wrap items-center gap-5 mt-10">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 bg-verido-green rounded-sm"></div>
            <p className="text-[12px]">Total Subscriptions</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default SubscriptionTrend;
