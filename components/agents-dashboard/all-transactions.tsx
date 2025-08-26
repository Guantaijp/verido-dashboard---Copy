"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const transactionData = [
    { product: "Fertiliser", quantity: 123, amount: 123, commission: 123 },
    { product: "Cabbages", quantity: 123, amount: "N/A", commission: 123 },
    { product: "Fertiliser", quantity: 123, amount: 123, commission: 123 },
    { product: "Cabbages", quantity: 123, amount: "N/A", commission: 123 },
    { product: "Fertiliser", quantity: 123, amount: 123, commission: 123 },
    { product: "Cabbages", quantity: 123, amount: "N/A", commission: 123 },
    { product: "Fertiliser", quantity: 123, amount: 123, commission: 123 },
    { product: "Cabbages", quantity: 123, amount: "N/A", commission: 123 },
    { product: "Fertiliser", quantity: 123, amount: 123, commission: 123 },
]

export function AllTransactions() {
    return (
        <div className="bg-white  border-none py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#003418]">All Transactions</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-sm bg-transparent">
                        12 months
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm bg-transparent">
                        30 days
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm bg-transparent">
                        7 days
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm bg-transparent">
                        24 hours
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm bg-[#FAF9F6]">
                        Filters ☰
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden border-none border-gray-200 rounded-lg">
                <table className="w-full">
                    <thead className="bg-[#C2C8C0]">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 rounded-tl-lg rounded-bl-lg">
                            Product
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                            Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                            Commission
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 rounded-tr-lg rounded-br-lg">
                            Agent
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {transactionData.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{transaction.product}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{transaction.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{transaction.amount}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{transaction.commission}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/diverse-woman-portrait.png"
                                        alt="Lily-Rose Chedjou"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Lily-Rose Chedjou
                                        </div>
                                        <div className="text-xs text-gray-500">Agent Identification</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">← Previous</div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        1
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        2
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        3
                    </Button>
                    <span className="text-sm text-gray-500">...</span>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        8
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        9
                    </Button>
                    <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                        10
                    </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
