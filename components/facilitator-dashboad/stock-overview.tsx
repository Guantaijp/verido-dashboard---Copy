import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const stockData = [
    { name: "Product 1", value: 30, color: "#059669" },
    { name: "Product 2", value: 62, color: "#10b981", weight: "20 kgs" },
    { name: "Product 3", value: 8, color: "#34d399" },
]

const chartConfig = {
    value: {
        label: "Stock",
    },
}

export function StockOverview() {
    return (
        <Card className="bg-white shadow-none mt-4 border-[#728E78]">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Stock Overview</h2>
                    <Button variant="link" className="text-sm p-0 h-auto text-gray-600 hover:text-gray-900">
                        See All →
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Select defaultValue="company">
                        <SelectTrigger className="bg-[#FAF9F6]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="company-1">Company 1</SelectItem>
                            <SelectItem value="company-2">Company 2</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="category">
                        <SelectTrigger className="bg-[#FAF9F6]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="feeds">Feeds</SelectItem>
                            <SelectItem value="supplies">Supplies</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="relative h-64 w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stockData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-lg font-semibold">Feeds</div>
                            <div className="text-sm text-gray-500">%</div>
                        </div>
                    </div>

                    {/* Product labels */}
                    <div className="absolute top-4 left-4 space-y-2 pointer-events-none">
                        {stockData.map((product, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }}></div>
                                <span className="text-gray-600">{product.name}</span>
                                {product.weight && <span className="text-gray-500">{product.weight}</span>}
                                {product.name === "Product 2" && <span className="font-semibold">{product.value}%</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
