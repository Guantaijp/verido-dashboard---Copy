"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/facilitator-dashboad/header"
import { WelcomeSection } from "@/components/facilitator-dashboad/welcome-section"
import { ActivityCard } from "@/components/facilitator-dashboad/activity-card"
import { MapCard } from "@/components/facilitator-dashboad/map-card"
import { NavigationTabs } from "@/components/facilitator-dashboad/navigation-tabs"
import { SalesActivityChart } from "@/components/facilitator-dashboad/sales-activity-chart"
import { AgentActivity } from "@/components/facilitator-dashboad/agent-activity"
import { CompanyPerformance } from "@/components/facilitator-dashboad/company-performance"
import { StockOverview } from "@/components/facilitator-dashboad/stock-overview"

export default function FacilitatorDashboard() {
    const [activeTab, setActiveTab] = useState("transactions")

    return (
        <div className="min-h-screen bg-white p-4">
            <DashboardHeader />
            <WelcomeSection />

            {/* First Row - Activity and Map Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="order-1">
                    <ActivityCard />
                </div>
                <div className="order-2">
                    <MapCard />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6">
                <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Sales Activity Chart - Full Width */}
            <div className="mb-8">
                <div className="bg-white overflow-hidden">
                    <SalesActivityChart />
                </div>
            </div>

            {/* Bottom Row - Performance Metrics */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                {/* Company Performance */}
                <div className="xl:col-span-1">
                    <CompanyPerformance />
                    <StockOverview />
                </div>

                {/* Agent Activity - Takes more space */}
                <div className="xl:col-span-2">
                    <AgentActivity />
                </div>
            </div>

        </div>
    )
}
