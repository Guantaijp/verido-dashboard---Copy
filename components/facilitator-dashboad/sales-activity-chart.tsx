import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const salesData = [
    { month: "JAN", transactionValue: 30, commission: 45, forecasted: 60 },
    { month: "FEB", transactionValue: 25, commission: 35, forecasted: 45 },
    { month: "MAR", transactionValue: 65, commission: 75, forecasted: 85 },
    { month: "APR", transactionValue: 75, commission: 85, forecasted: 95 },
    { month: "MAY", transactionValue: 55, commission: 65, forecasted: 75 },
    { month: "JUN", transactionValue: 65, commission: 75, forecasted: 85 },
    { month: "JUL", transactionValue: 50, commission: 60, forecasted: 70 },
    { month: "AUG", transactionValue: 75, commission: 85, forecasted: 95 },
    { month: "SEP", transactionValue: 65, commission: 75, forecasted: 85 },
    { month: "OCT", transactionValue: 80, commission: 90, forecasted: 100 },
    { month: "NOV", transactionValue: 70, commission: 80, forecasted: 90 },
    { month: "DEC", transactionValue: 85, commission: 95, forecasted: 105 },
]

const chartConfig = {
    transactionValue: {
        label: "Transaction Value",
        color: "#f97316",
    },
    commission: {
        label: "Commission",
        color: "#10b981",
    },
    forecasted: {
        label: "Forecasted",
        color: "#dc2626",
    },
}

export function SalesActivityChart() {
    return (
        <div className="w-full border-none">
            <div className="flex items-center  mb-4">
                <h2 className="text-lg font-semibold text-[#003418]">Sales Activity</h2>
                <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900 p-0 h-auto ml-4">
                    See All →
                </Button>
            </div>

            <Card className="border border-[#728E78] rounded-xl bg-white">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">€ 102.5M</div>
                            <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-8 bg-white border-gray-200">
                                    12 months
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-8 bg-white border-gray-200">
                                    30 days
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-8 bg-white border-gray-200">
                                    7 days
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-8 bg-white border-gray-200">
                                    24 hours
                                </Button>
                            </div>

                            <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-8 bg-[#FAF9F6] border-gray-200">
                                Filters ☰
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center  mb-4  justify-end">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">Transaction Value</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">Commission</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">Forecasted</span>
                            </div>
                        </div>

                        <div className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium ml-4">AI Insights</div>
                    </div>

                    <div className="h-64 w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        className="text-xs text-gray-400"
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        className="text-xs text-gray-400"
                                        tick={{ fontSize: 12 }}
                                        domain={[0, 120]}
                                        tickFormatter={(value) => `${value}M`}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="transactionValue"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#f97316" }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="commission"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#10b981" }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="forecasted"
                                        stroke="#dc2626"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#dc2626" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
