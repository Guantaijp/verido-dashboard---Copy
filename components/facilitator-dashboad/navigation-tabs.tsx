"use client"

import { Button } from "@/components/ui/button"

interface NavigationTabsProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
    const tabs = [
        { id: "transactions", label: "Transactions" },
        { id: "growth-trends", label: "Growth Trends" },
        { id: "regions", label: "Regions" },
        { id: "agent-activity", label: "Agent Activity" },
        { id: "products", label: "Products" },
    ]

    return (
        <div className="bg-[#0B2515] rounded-lg p-1 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                                activeTab === tab.id ? " text-white" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-white">
                    +
                </Button>
            </div>
        </div>
    )
}
