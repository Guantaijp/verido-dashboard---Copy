import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

export default function AgentsPerformance() {
    const agents = Array(8).fill({
        name: "Lily-Rose Chedjou",
        identification: "Agent Identification",
        avatar: "/placeholder.svg?height=40&width=40",
        companies: 123,
        sales: 123,
        amountTransacted: 123,
        totalCommission: 123,
    })

    return (
        <div className="w-full max-w-8xl mx-auto py-6 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-[#003418]">All Agents Performance</h1>

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
                        <Filter className="w-4 h-4 mr-1" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white  overflow-hidden">
                <table className="w-full border-collapse overflow-hidden rounded-lg">
                    <thead className="bg-[#C2C8C0]">
                    <tr className='rounded-lg'>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 rounded-tl-lg">
                            Agent
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                            No. Companies
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                            No. Sales
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                            Amount Transacted
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 rounded-tr-lg">
                            Total Commission
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {agents.map((agent, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                                        <AvatarFallback>LC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-gray-900">{agent.name}</div>
                                        <div className="text-sm text-gray-500">{agent.identification}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{agent.companies}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{agent.sales}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{agent.amountTransacted}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{agent.totalCommission}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <Button variant="outline" size="sm" className="text-sm bg-transparent">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </Button>

                <div className="flex items-center gap-1">
                    {[1, 2, 3].map((page) => (
                        <Button key={page} variant={page === 1 ? "default" : "outline"} size="sm" className="w-8 h-8 p-0 text-sm">
                            {page}
                        </Button>
                    ))}
                    <span className="px-2 text-sm text-gray-500">...</span>
                    {[8, 9, 10].map((page) => (
                        <Button key={page} variant="outline" size="sm" className="w-8 h-8 p-0 text-sm bg-transparent">
                            {page}
                        </Button>
                    ))}
                </div>

                <Button variant="outline" size="sm" className="text-sm bg-transparent">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
