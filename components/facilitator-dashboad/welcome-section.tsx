import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function WelcomeSection() {
    const [aiInsightsEnabled, setAiInsightsEnabled] = useState(false)
    const [aiInsights, setAiInsights] = useState(true)
    const handleSwitchChange = (checked) => {
        setAiInsightsEnabled(checked)
        // You can add additional logic here, such as:
        // - Making an API call to save the preference
        // - Updating a global state/context
        // - Triggering other UI changes
        console.log('AI Insights:', checked ? 'enabled' : 'disabled')
    }

    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome, Joanna</h1>
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
    )
}