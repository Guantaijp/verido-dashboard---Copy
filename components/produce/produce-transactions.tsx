import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

const transactions = [
    {
        id: "ABCDEF",
        product: "Cabbages",
        quantity: 123,
        amount: 123,
        agent: {
            name: "Lily-Rose Chedjou",
            role: "Agent Identification",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "ShareCard",
    },
    // Repeat for demonstration
    ...Array(8)
        .fill(null)
        .map((_, i) => ({
            id: "ABCDEF",
            product: "Cabbages",
            quantity: 123,
            amount: 123,
            agent: {
                name: "Lily-Rose Chedjou",
                role: "Agent Identification",
                avatar: "/placeholder.svg?height=32&width=32",
            },
            status: "ShareCard",
        })),
]

export default function ProduceTransactions() {
    return (
        <div className="w-full max-w-9xl mx-auto py-6">
            <Card className="shadow-none border-none">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">All Produce Transactions</CardTitle>
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
                            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#C2C8C0]">
                                <TableHead className="font-medium text-muted-foreground rounded-l-md">
                                    Product
                                </TableHead>
                                <TableHead className="font-medium text-muted-foreground">
                                    Quantity
                                </TableHead>
                                <TableHead className="font-medium text-muted-foreground">
                                    Amount
                                </TableHead>
                                <TableHead className="font-medium text-muted-foreground">
                                    Agent
                                </TableHead>
                                <TableHead className="font-medium text-muted-foreground">
                                    Status
                                </TableHead>
                                <TableHead className="font-medium text-muted-foreground rounded-r-md">
                                    Transaction ID
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {transactions.map((transaction, index) => (
                                <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{transaction.product}</TableCell>
                                    <TableCell>{transaction.quantity}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={transaction.agent.avatar || "/placeholder.svg"}
                                                    alt={transaction.agent.name}
                                                />
                                                <AvatarFallback>LC</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-sm">{transaction.agent.name}</div>
                                                <div className="text-xs text-muted-foreground">{transaction.agent.role}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="rounded-md border px-3 py-2 flex items-center text-gray-700"
                                        >
                                            <div className="w-2 h-2 bg-current rounded-full mr-2 border border-current"></div>
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-muted-foreground">Showing 1-9 of 100+ results</div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                <Button variant="default" size="sm" className="w-8 h-8 p-0">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                                    2
                                </Button>
                                <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
                                    3
                                </Button>
                                <span className="px-2 text-muted-foreground">...</span>
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
                            <Button variant="outline" size="sm">
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
