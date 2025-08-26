"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePicker } from "../common/DatePicker";

interface ChartData {
  month: string;
  moneyIn: number;
  directLabour: number;
  directMaterial: number;
}
interface ChartProps {
  chartData: ChartData[];
}

const chartConfig = {
  moneyIn: {
    label: "Money In",
    color: "#08A730",
  },
  directLabour: {
    label: "Direct Labour",
    color: "#AF52DE",
  },
  directMaterial: {
    label: "Direct Material",
    color: "#FF9500",
  },
} satisfies ChartConfig;

export function MultipleLineChart({ chartData }: ChartProps) {
  const hasData = chartData && chartData.length > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-sm">Money In vs labour vs material vs overhead</CardTitle>
        <DatePicker />
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer className="h-[300px] w-full" config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  dataKey="moneyIn"
                  type="monotone"
                  stroke={chartConfig.moneyIn.color}
                  strokeWidth={2}
                />
                <Line
                  dataKey="directLabour"
                  type="monotone"
                  stroke={chartConfig.directLabour.color}
                  strokeWidth={2}
                />
                <Line
                  dataKey="directMaterial"
                  type="monotone"
                  stroke={chartConfig.directMaterial.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500">No data yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
