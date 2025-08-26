"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

export default function SalesHeader() {
    const [aiInsights, setAiInsights] = useState(true)

    return (
        <div className="mb-8">
            {/* Row 1: Title and Actions */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Sales and Stock
                </h1>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-transparent"
                    >
                        <Download className="h-4 w-4" />
                        Export Reports
                    </Button>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                            AI Insights
                        </span>
                        <button
                            onClick={() => setAiInsights(!aiInsights)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                aiInsights ? "bg-green-600" : "bg-gray-300"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    aiInsights ? "translate-x-6" : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Row 2: Sales Activity and Commission Rate */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg text-semibold text-[#003418]">Sales Activity</h2>

                <div className="inline-flex items-center px-3 py-1 rounded-lg bg-[#8D4F00] text-white text-sm font-medium whitespace-nowrap">
                    Agent Commission Rate - 75%
                </div>
            </div>
        </div>
    )
}