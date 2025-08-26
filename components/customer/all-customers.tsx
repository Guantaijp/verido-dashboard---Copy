import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

const customerData = [
    {
        id: 1,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        idSource: "ShareCard",
    },
    {
        id: 2,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        idSource: "Verido",
    },
    {
        id: 3,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        idSource: "ShareCard",
    },
]

const agentData = [
    {
        id: 1,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        transactionType: "Purchase",
        idSource: "ShareCard",
    },
    {
        id: 2,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        transactionType: "Sale",
        idSource: "Verido",
    },
    {
        id: 3,
        name: "Lily-Rose Chedjou",
        code: "ABCDEF",
        avatar: "/diverse-woman-portrait.png",
        transactionType: "Purchase",
        idSource: "ShareCard",
    },
]

export default function AllCustomers() {
    return (
        <div className="w-full mx-auto  space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-[#003418]">All Customers</h1>
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
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-[#FAF9F6]">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customers Section */}
                <div className="bg-white rounded-lg border-none">
                    {/* Customer Header */}
                    <div className="bg-[#C2C8C0] px-6 py-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="font-medium text-gray-700">Customer</div>
                            <div className="font-medium text-gray-700">ID Source</div>
                        </div>
                    </div>

                    {/* Customer Rows */}
                    <div className="divide-y divide-gray-100">
                        {customerData.map((customer) => (
                            <div key={customer.id} className="py-3 hover:bg-[#FAF9F6]">
                                <div className="grid grid-cols-2 gap-4 items-center">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                                            <AvatarFallback>LC</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-gray-900">{customer.name}</div>
                                            <div className="text-sm text-gray-500">{customer.code}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge
                                            variant="outline"
                                            className={`${
                                                customer.idSource === "ShareCard"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : "bg-green-50 text-green-700 border-green-200"
                                            }`}
                                        >
                                            {customer.idSource}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Customer Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" disabled className="text-gray-400">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="bg-gray-900 text-white">
                                    1
                                </Button>
                                <Button variant="ghost" size="sm">
                                    2
                                </Button>
                                <Button variant="ghost" size="sm">
                                    3
                                </Button>
                                <span className="text-gray-400">...</span>
                                <Button variant="ghost" size="sm">
                                    8
                                </Button>
                                <Button variant="ghost" size="sm">
                                    9
                                </Button>
                                <Button variant="ghost" size="sm">
                                    10
                                </Button>
                            </div>
                            <Button variant="outline" size="sm">
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Agents Section */}
                <div className="bg-[#FAF9F6] rounded-lg border p-3">
                    {/* Agent Header */}
                    <div className="bg-[#C2C8C0] px-6 py-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="font-medium text-gray-700">Agent</div>
                            <div className="font-medium text-gray-700">Transaction Type</div>
                            <div className="font-medium text-gray-700">ID Source</div>
                        </div>
                    </div>

                    {/* Agent Rows */}
                    <div className="divide-y divide-gray-100">
                        {agentData.map((agent) => (
                            <div key={agent.id} className="py-3">
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                                            <AvatarFallback>LC</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-gray-900">{agent.name}</div>
                                            <div className="text-sm text-gray-500">{agent.code}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge
                                            variant="outline"
                                            className={`${
                                                agent.transactionType === "Purchase"
                                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                                    : "bg-orange-50 text-orange-700 border-orange-200"
                                            }`}
                                        >
                                            {agent.transactionType}
                                        </Badge>
                                    </div>
                                    <div>
                                        <Badge
                                            variant="outline"
                                            className={`${
                                                agent.idSource === "ShareCard"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : "bg-green-50 text-green-700 border-green-200"
                                            }`}
                                        >
                                            {agent.idSource}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Agent Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" disabled className="text-gray-400">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="bg-gray-900 text-white">
                                    1
                                </Button>
                                <Button variant="ghost" size="sm">
                                    2
                                </Button>
                                <span className="text-gray-400">...</span>
                                <Button variant="ghost" size="sm">
                                    9
                                </Button>
                                <Button variant="ghost" size="sm">
                                    10
                                </Button>
                            </div>
                            <Button variant="outline" size="sm">
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
