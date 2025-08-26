"use client"

import { useState } from "react"

import {SalesActivityChart} from "@/components/sales/sales-activity-chart";
import {DashboardHeader} from "@/components/facilitator-dashboad/header";
import {WelcomeSection} from "@/components/facilitator-dashboad/welcome-section";
import {MapCard} from "@/components/facilitator-dashboad/map-card";
import {AllTransactions} from "@/components/agents-dashboard/all-transactions";
import {ActivityCard} from "@/components/agents-dashboard/activity-card";

export default function AgentsDashboard() {
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



            {/* Bottom Row - Performance Metrics */}
            <div className="">

                <AllTransactions/>
            </div>

        </div>
    )
}
