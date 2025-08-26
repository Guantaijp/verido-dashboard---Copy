"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"

const transactionData = [
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "ShareCard",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "ShareCard",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "ShareCard",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
    {
        id: "ABCDEF",
        product: "2-in-one Water Bottle",
        remaining: "2 Remaining",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "Vendo",
    },
]

export default function AllSalesTransactions() {
    const [activeTimeFilter, setActiveTimeFilter] = useState("12 months")
    const [currentPage, setCurrentPage] = useState(1)

    const timeFilters = ["12 months", "30 days", "7 days", "24 hours"]

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "ShareCard":
                return "default"
            case "Vendo":
                return "secondary"
            default:
                return "default"
        }
    }

    return (
        <div className="bg-white pt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Sales Transactions</h2>

                <div className="flex items-center gap-3">
                    {/* Time Filter Buttons */}
                    <div className="flex items-center gap-2">
                        {timeFilters.map((filter) => (
                            <Button
                                key={filter}
                                variant={activeTimeFilter === filter ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveTimeFilter(filter)}
                                className="text-sm"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>

                    {/* Filters Button */}
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-[#FAF9F6]">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full rounded">
                    <thead className="bg-[#FAF9F6] rounded-md">
                    <tr className="bg-[#C2C8C0] border-b border-gray-200 rounded-md">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Agent</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionData.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                        <div className="w-3 h-3 border-l-2 border-b-2 border-white transform rotate-45"></div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{transaction.product}</div>
                                        <div className="text-sm text-gray-500">{transaction.remaining}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-900">{transaction.quantity}</td>
                            <td className="py-4 px-4 text-gray-900">{transaction.amount}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={transaction.agent.avatar || "/placeholder.svg"} alt={transaction.agent.name} />
                                        <AvatarFallback>
                                            {transaction.agent.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-gray-900">{transaction.agent.name}</div>
                                        <div className="text-sm text-gray-500">{transaction.agent.role}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <Badge
                                    variant="outline"
                                    className="rounded-md border px-3 py-2 flex items-center text-gray-700"
                                >
                                    <div className="w-2 h-2 bg-current rounded-full mr-2 border border-current"></div>
                                    {transaction.status}
                                </Badge>
                            </td>
                            <td className="py-4 px-4 text-gray-900 font-mono">{transaction.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            disabled={page === "..."}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
