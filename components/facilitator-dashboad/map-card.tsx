import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MapCard() {
    return (
        <Card className="bg-white">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Agent Coverage</h2>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-gray-100">
                            Kenya
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100">
                            Africa
                        </Badge>
                    </div>
                </div>

                <div className="relative h-48 bg-green-50 rounded-lg overflow-hidden">
                    {/* Simplified map representation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white rounded-lg p-3 shadow-lg">
                                <div className="text-sm font-medium">Kiambu County KE</div>
                                <div className="text-xs text-gray-500">46 agents</div>
                            </div>
                        </div>
                        {/* Map markers */}
                        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
