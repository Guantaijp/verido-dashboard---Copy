import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChevronDown, Plus, Minus } from "lucide-react"

const salesData = [
    { product: "PRODUCT A", sales: 180, stock: 0, line: 50 },
    { product: "PRODUCT B", sales: 280, stock: 0, line: 80 },
    { product: "PRODUCT C", sales: 150, stock: 0, line: 140 },
    { product: "PRODUCT D", sales: 220, stock: 0, line: 120 },
    { product: "PRODUCT E", sales: 260, stock: 0, line: 80 },
    { product: "PRODUCT F", sales: 80, stock: 0, line: 60 },
    { product: "PRODUCT G", sales: 100, stock: 0, line: 140 },
    { product: "PRODUCT H", sales: 120, stock: 0, line: 120 },
    { product: "PRODUCT I", sales: 110, stock: 0, line: 100 },
]

const chartConfig = {
    sales: {
        label: "Sales",
        color: "#2d4a32",
    },
    stock: {
        label: "Stock",
        color: "#f97316",
    },
    line: {
        label: "Line",
        color: "#f97316",
    },
}

export function SalesActivityChart() {
    return (
        <div className="w-full">
            <Card className="border-none rounded-xl bg-[#728E78] text-white overflow-hidden">
                <CardContent className="p-6">
                    {/* Top controls row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-4 py-2 text-sm"
                            >
                                Select Company
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-4 py-2 text-sm"
                            >
                                Select Category
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-3 py-1.5 text-xs"
                            >
                                12 months
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-3 py-1.5 text-xs"
                            >
                                30 days
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-3 py-1.5 text-xs"
                            >
                                7 days
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-3 py-1.5 text-xs"
                            >
                                24 hours
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FAF9F6] text-gray-700 border-gray-300 rounded-md px-3 py-1.5 text-xs"
                            >
                                Filters ☰
                            </Button>
                        </div>
                    </div>

                    {/* Legend and zoom controls */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                                <span className="text-sm text-white">Sales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-sm text-white">Stock</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Button size="sm" className="bg-white text-gray-700 w-8 h-8 p-0 rounded">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-white text-gray-700 w-8 h-8 p-0 rounded">
                                <Minus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-80 w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={true}
                                        vertical={false}
                                        stroke="rgba(255,255,255,0.2)"
                                    />
                                    <XAxis
                                        dataKey="product"
                                        axisLine={false}
                                        tickLine={false}
                                        className="text-xs text-white"
                                        tick={{ fontSize: 11, fill: "white" }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        className="text-xs text-white"
                                        tick={{ fontSize: 11, fill: "white" }}
                                        domain={[0, 300]}
                                        ticks={[0, 100, 200, 300]}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="sales" fill="#2d4a32" radius={[2, 2, 0, 0]} maxBarSize={40} />
                                    <Line
                                        type="monotone"
                                        dataKey="line"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#f97316" }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
