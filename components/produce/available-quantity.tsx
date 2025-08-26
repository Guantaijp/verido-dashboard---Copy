"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

const produceItems = [
    {
        id: 1,
        name: "Cabbage",
        image: "/placeholder.svg?height=120&width=120",
        available: 280,
    },
    {
        id: 2,
        name: "Rice",
        image: "/placeholder.svg?height=120&width=120",
        available: 280,
    },
    {
        id: 3,
        name: "Beans",
        image: "/placeholder.svg?height=120&width=120",
        available: 280,
    },
    {
        id: 4,
        name: "Beans",
        image: "/placeholder.svg?height=120&width=120",
        available: 280,
    },
]

export default function AvailableQuantity() {
    const [sortFilter, setSortFilter] = useState("Most")
    const [categoryFilter, setCategoryFilter] = useState("Category")

    return (
        <div className="w-full py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#003418]">Available Quantity</h2>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-sm bg-white border-gray-300 bg-[#FAF9F6]"
                        onClick={() => setSortFilter(sortFilter === "Most" ? "Least" : "Most")}
                    >
                        {sortFilter}
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-sm bg-white border-gray-300 bg-[#FAF9F6]"
                        onClick={() => setCategoryFilter("Category")}
                    >
                        {categoryFilter}
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Produce Items */}
            <div className="flex items-center gap-6">
                <div className="flex gap-6 flex-1">
                    {produceItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg border border-[#728E78] p-6 flex-1 max-w-[280px] shadow-sm"
                        >
                            {/* Product Image */}
                            <div className="flex justify-center mb-6">
                                <div className="w-[120px] h-[120px] relative">
                                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{item.available} available</span>
                                </div>

                                <div className="pt-2">
                                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Record Sale
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrow */}
                <Button variant="outline" size="sm" className="flex-shrink-0 bg-white border-gray-300">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
