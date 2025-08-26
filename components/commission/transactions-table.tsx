"use client"

import { Button } from "@/components/ui/button"
import { Filter, ChevronRight } from "lucide-react"

const transactionsData = [
    {
        id: 1,
        product: "Feeds",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "123",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 2,
        product: "Fertiliser",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "N/A",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 3,
        product: "Feeds",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "123",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 4,
        product: "Fertiliser",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "N/A",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 5,
        product: "Feeds",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "123",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 6,
        product: "Fertiliser",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "N/A",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 7,
        product: "Feeds",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "123",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 8,
        product: "Fertiliser",
        rrp: "KES 2,000",
        quantity: "123",
        amount: "N/A",
        commission: "123",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
    {
        id: 9,
        product: "Feeds",
        rrp: "KES 2,000",
        quantity: "---",
        amount: "---",
        commission: "---",
        agent: {
            company: "Company ABC",
            location: "Kitui, Kenya",
        },
    },
]

export function TransactionsTable() {
    return (
        <div className="w-full mx-auto bg-white rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between py-6  text-left ">
                <h1 className="text-xl font-semibold text-[#003418] text-left ">All Transactions</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-gray-100 text-gray-700 border-gray-300">
                        12 months
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                        30 days
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                        7 days
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                        24 hours
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-[#FAF9F6]">
                        <Filter className="w-4 h-4 mr-1" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#C2C8C0] rounded-lg overflow-hidden">
                    <tr>
                        <th className="text-left p-4 font-medium text-gray-700 first:rounded-l-lg last:rounded-r-lg">Product</th>
                        <th className="text-left p-4 font-medium text-gray-700">Quantity</th>
                        <th className="text-left p-4 font-medium text-gray-700">Amount</th>
                        <th className="text-left p-4 font-medium text-gray-700">Commission</th>
                        <th className="text-left p-4 font-medium text-gray-700 first:rounded-l-lg last:rounded-r-lg">Agent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionsData.map((transaction, index) => (
                        <tr key={transaction.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="p-4">
                                <div>
                                    <div className="font-medium text-gray-900">{transaction.product}</div>
                                    <div className="text-sm text-gray-500">RRP {transaction.rrp}</div>
                                </div>
                            </td>
                            <td className="p-4 text-gray-900">{transaction.quantity}</td>
                            <td className="p-4 text-gray-900">{transaction.amount}</td>
                            <td className="p-4 text-gray-900">{transaction.commission}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                        <Filter className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{transaction.agent.company}</div>
                                        <div className="text-sm text-gray-500">{transaction.agent.location}</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 p-6 border-t">
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    1
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    2
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    3
                </Button>
                <span className="text-gray-500">...</span>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    8
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    9
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                    10
                </Button>
                <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
