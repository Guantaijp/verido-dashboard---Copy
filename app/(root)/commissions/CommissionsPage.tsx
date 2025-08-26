"use client"

import type { Metadata } from "next";
import {DashboardHeader} from "@/components/facilitator-dashboad/header";

import {useState} from "react";

import CommissionHeader from "@/components/commission/commission-header";
import {SalesActivityChart} from "@/components/commission/sales-activity-chart";
import {TransactionsTable} from "@/components/commission/transactions-table";
import {ProductsGrid} from "@/components/commission/products-grid";
export const metadata: Metadata = {
    title: "sales and commissions - Verido",
    description: "Manage your Sales and Commissions in Verido",
};

const CommissionsPage = () => {
    const [activeTab, setActiveTab] = useState("transactions")

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-8xl mx-auto">

                <CommissionHeader />

                {/* Content area - placeholder for future components */}
                <div className="bg-white">
                    <SalesActivityChart/>

                    <TransactionsTable/>

                    <ProductsGrid/>
                </div>
            </div>
        </div>
    )
}

export default CommissionsPage;