import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const agentData = [
    { id: 1, name: "Lily-Rose Chedjou", type: "Sale", date: "21/08/2025", time: "7:03 AM" },
    { id: 2, name: "Lily-Rose Chedjou", type: "Purchase", date: "21/08/2025", time: "7:08 AM" },
    { id: 3, name: "Lily-Rose Chedjou", type: "Sale", date: "21/08/2025", time: "7:04 AM" },
    { id: 4, name: "Lily-Rose Chedjou", type: "Purchase", date: "21/08/2025", time: "7:03 AM" },
    { id: 5, name: "Lily-Rose Chedjou", type: "Purchase", date: "21/08/2025", time: "7:03 AM" },
    { id: 6, name: "Lily-Rose Chedjou", type: "Sale", date: "21/08/2025", time: "7:03 AM" },
    { id: 7, name: "Lily-Rose Chedjou", type: "Purchase", date: "21/08/2025", time: "7:04 AM" },
    { id: 8, name: "Lily-Rose Chedjou", type: "Purchase", date: "21/08/2025", time: "7:04 AM" },
    { id: 9, name: "Lily-Rose Chedjou", type: "Sale", date: "21/08/2025", time: "7:04 AM" },
    { id: 10, name: "Lily-Rose Chedjou", type: "Sale", date: "21/08/2025", time: "7:04 AM" },
]

export function AgentActivity() {
    return (
        <Card className="bg-white shadow-none border-none">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Agent Activity</h2>
                    <Button variant="link" className="text-sm p-0 h-auto text-gray-600 hover:text-gray-900">
                        See All →
                    </Button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 gap-4 p-3 bg-[#C2C8C0] rounded-lg mb-4 text-sm font-medium text-gray-600">
                    <div>Agent</div>
                    <div>Transaction</div>
                    <div>Time</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-3 mb-6">
                    {agentData.map((agent) => (
                        <div key={agent.id} className="grid grid-cols-3 gap-4 items-center py-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                    <AvatarFallback>LC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-sm">{agent.name}</div>
                                    <div className="text-xs text-gray-500">Agent identification</div>
                                </div>
                            </div>
                            <div>
                                <Badge
                                    variant={agent.type === "Sale" ? "default" : "secondary"}
                                    className={
                                        agent.type === "Sale"
                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                    }
                                >
                                    {agent.type}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <div>{agent.date}</div>
                                    <div className="text-gray-500">{agent.time}</div>
                                </div>
                                <Button variant="ghost" size="sm" className="p-1 h-auto">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-400" disabled>
                        ← Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                            <Button
                                key={index}
                                variant={page === 1 ? "default" : "ghost"}
                                size="sm"
                                className={`w-8 h-8 p-0 ${page === 1 ? "bg-gray-900 text-white" : "text-gray-600"}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                        Next →
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
