"use client"

import { useState } from "react"
import SalesHeader from "@/components/sales/sales-header"
import {SalesActivityChart} from "@/components/sales/sales-activity-chart";
import AllSalesTransactions from "@/components/sales/all-sales-transactions";
import StockAlert from "@/components/sales/stock-alert";
import {DashboardHeader} from "@/components/facilitator-dashboad/header";

export default function SalesPage() {
    const [activeTab, setActiveTab] = useState("transactions")

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-8xl mx-auto">
                <DashboardHeader />
                <SalesHeader />

                {/* Content area - placeholder for future components */}
                <div className="bg-white">
                    <SalesActivityChart/>

                    <AllSalesTransactions/>

                    <StockAlert/>
                </div>
            </div>
        </div>
    )
}
