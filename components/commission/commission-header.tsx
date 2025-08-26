"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

export default function CommissionHeader() {
    const [aiInsights, setAiInsights] = useState(true)

    return (
        <div className="mb-8">
            {/* Row 1: Title and Actions */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                   Welcome,Joanna
                </h1>

                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-3">

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
                        <span className="text-sm font-medium text-gray-700">
                            AI Insights
                        </span>
                    </div>
                </div>
            </div>

            {/* Row 2: Sales Activity and Commission Rate */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg text-semibold text-[#003418]">Product Performance</h2>


            </div>
        </div>
    )
}