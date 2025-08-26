"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
import { IMoneyInVsLabourVsMaterialTrend } from "@/types";

// Define chart configuration
const chartConfig = {
  money_in: { label: "Money In", color: "#08A730" },
  labour: { label: "Direct Labour", color: "#AF52DE" },
  material: { label: "Direct Material", color: "#FF9500" },
} satisfies ChartConfig;

interface ChartProp {
  chartData?: IMoneyInVsLabourVsMaterialTrend;
}

// Transform nested data into a flat array for Recharts
const transformData = (chartData: IMoneyInVsLabourVsMaterialTrend) => {
  const { money_in, labour, material } = chartData;
  const periods = money_in.data.map((item) => item.period);

  return periods.map((period, index) => ({
    month: period.slice(0, 7), // Format as "YYYY-MM"
    money_in: money_in.data[index].totalAmount,
    labour: labour.data[index].totalAmount,
    material: material.data[index].totalAmount,
  }));
};

export function MoneyInVLabourVMaterial({ chartData }: ChartProp) {
  if (!chartData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Money In vs Labor vs Material
          </CardTitle>
          <p className="text-sm text-gray-500">
            Trend of earnings and expenses
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Loading data...</p>
        </CardContent>
      </Card>
    );
  }
  const data = transformData(chartData);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-sm">
            Money In vs Labor vs Material
          </CardTitle>
          <p className="text-sm text-gray-500">
            Trend of earnings and expenses
          </p>
        </div>
        <Select defaultValue="2025">
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
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleString("en-US", { month: "short" })
                }
              />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                domain={[0, "auto"]}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="money_in"
                type="monotone"
                stroke={chartConfig.money_in.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="labour"
                type="monotone"
                stroke={chartConfig.labour.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="material"
                type="monotone"
                stroke={chartConfig.material.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-row flex-wrap gap-4 mt-6">
          {Object.entries(chartConfig).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              ></div>
              <p className="text-xs">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
