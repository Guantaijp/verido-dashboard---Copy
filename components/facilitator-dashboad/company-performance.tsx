"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const performanceData = [
    { day: "M", value: 200 },
    { day: "T", value: 150 },
    { day: "W", value: 300 },
    { day: "Th", value: 250 },
    { day: "F", value: 280 },
    { day: "S", value: 80 },
]

const chartConfig = {
    value: {
        label: "Performance",
        color: "#059669",
    },
}

export function CompanyPerformance() {
    return (
        <div className="shadow-none">
            <div className="py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Company Performance</h2>
                    <Button variant="link" className="text-sm p-0 h-auto ">
                        See All →
                    </Button>
                </div>
                <Card className="bg-[#728E78] border p-0 m-0 shadow-none">
                    <CardContent className="py-6">
                <div className=' rounded-lg'>
                <div className="mb-6">
                    <Select defaultValue="select-company">
                        <SelectTrigger className="w-full bg-[#FAF9F6] text-gray-900">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select-company">Select Company</SelectItem>
                            <SelectItem value="company-1">Company 1</SelectItem>
                            <SelectItem value="company-2">Company 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-48 w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "white" }} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "white" }}
                                    domain={[0, 300]}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="value" fill="#047857" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                </div>
            </CardContent>
        </Card>
            </div>
        </div>
    )
}
