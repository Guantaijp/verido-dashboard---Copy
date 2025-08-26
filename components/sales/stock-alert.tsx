"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Filter } from "lucide-react"
import Image from "next/image"
import produce from "../../public/assets/images/produce.png"

const stockItems = [
    {
        id: 1,
        name: "Feeds",
        image: produce,
        rrp: "KES 2,000",
        available: 2,
        status: "Low Stock",
    },
    {
        id: 2,
        name: "Fertiliser",
        image: produce,
        rrp: "KES 2,000",
        available: 2,
        status: "Low Stock",
    },
    {
        id: 3,
        name: "Feeds",
        image: produce,
        rrp: "KES 2,000",
        available: 2,
        status: "Low Stock",
    },
    {
        id: 4,
        name: "Feeds",
        image: produce,
        rrp: "KES 2,000",
        available: 2,
        status: "Low Stock",
    },
]

export default function StockAlert() {
    const [sortOrder, setSortOrder] = useState<"lowest" | "highest">("lowest")

    return (
        <div className="w-full mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Stock Alert</h2>

                <div className="flex items-center gap-2">
                    <Button
                        variant={sortOrder === "lowest" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("lowest")}
                        className="text-sm"
                    >
                        Lowest to Highest
                    </Button>
                    <Button
                        variant={sortOrder === "highest" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder("highest")}
                        className="text-sm"
                    >
                        Highest to Lowest
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm bg-transparent">
                        <Filter className="w-4 h-4 mr-1" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Stock Items */}
            <div className="flex items-center gap-4">
                <div className="flex gap-4 flex-1">
                    {stockItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg border border-[#728E78] p-4 flex-1 max-w-[350px] shadow-[8%]">
                            {/* Product Image */}
                            <div className="flex justify-center mb-4">

                                <div className="w-[120px] h-[80px] relative">
                                    <Image
                                        src={item.image || produce}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">RRP</div>
                                        <div className="font-medium text-gray-900">{item.rrp}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">{item.available} available</span>
                                        <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">{item.status}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                                        Record Sale
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrow */}
                <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
