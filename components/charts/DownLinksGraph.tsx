"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  quaterly: {
    label: "Quarterly",
    color: "#7d65dc",
    
  },
  monthly: {
    label: "Monthly",
    color: "#FF8CB1",
    
  },
  yearly: {
    label: "Yearly",
    color: "#FFB854",
  },
} satisfies ChartConfig;

export function DownLinksGraph() {
  const chartData = [
    {
      subscriptionPackage: "Quarterly",
      subscriptionValue: 0,
      fill: chartConfig.quaterly.color,
    },
    {
      subscriptionPackage: "Monthly",
      subscriptionValue: 0,
      fill: chartConfig.monthly.color,
    },
    {
      subscriptionPackage: "Yearly",
      subscriptionValue: 0,
      fill: chartConfig.yearly.color,
    },
  ];

  const totalSubscription = chartData.reduce(
    (acc, curr) => acc + curr.subscriptionValue,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="">
        <CardTitle className="text-[15px]">Subscription by Type</CardTitle>

        <CardDescription>Percentage of subscribers by type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
         {totalSubscription === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 mt-20">
            <h4 className="font-bold text-sm">No Subscription data available.</h4>
            <p className="text-center">Start using the app to begin analysing your subscriptions</p>
          </div>
         ) : (
           <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="subscriptionValue"
              nameKey="subscriptionPackage"
              innerRadius={70}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + -24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSubscription.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
         )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm">
        <div className="flex justify-center gap-5 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-[#7d65dc] mr-2"></div>
            <span className="text-[12px]">Monthly</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-[#FF8CB1] mr-2"></div>
            <span className="text-[12px]">Quarterly</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-[#FFB854] mr-2"></div>
            <span className="text-[12px]">Year</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
