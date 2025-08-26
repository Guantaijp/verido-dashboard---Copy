"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {useState} from "react";

export default function ProduceHeader() {
    const [aiInsights, setAiInsights] = useState(true)
    return (
        <div className="flex items-start justify-between mb-8">
            <div>
                <h1 className="text-2xl font-semibold text-[#003418] mb-2">Produce</h1>
                {/*<h2 className="text-lg text-gray-700">Sales Activity</h2>*/}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Export Reports
                </Button>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">AI Insights</span>
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
    )
}
