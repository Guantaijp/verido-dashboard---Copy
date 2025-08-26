import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardHeader() {
    return (
        <div className="flex items-center justify-between py-4  bg-white">
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-medium text-gray-900">Facilitator Dashboard</h1>

                <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    Climate Smart Jobs
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Currency</span>

                    <div className="flex items-center gap-2">
                        <div className="flex flex-col w-6 h-6 border border-gray-300 rounded-full overflow-hidden">
                            <div className="h-1/3 bg-black"></div>
                            <div className="h-1/3 bg-red-600"></div>
                            <div className="h-1/3 bg-green-600"></div>
                        </div>

                        <Select defaultValue="kes">
                            <SelectTrigger className="w-16 h-8 bg-white border-gray-300 text-sm font-medium">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kes">KES</SelectItem>
                                <SelectItem value="usd">USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}
