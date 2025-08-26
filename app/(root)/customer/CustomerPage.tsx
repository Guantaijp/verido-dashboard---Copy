"use client"

import { useState } from "react"

import {DashboardHeader} from "@/components/facilitator-dashboad/header";
import CustomerHeader from "@/components/customer/customer-header";
import AllCustomers from "@/components/customer/all-customers";

export default function CustomerPage() {
    const [activeTab, setActiveTab] = useState("transactions")

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-8xl mx-auto">
                <DashboardHeader />
                <CustomerHeader />
                <AllCustomers/>

                {/* Content area - placeholder for future components */}

            </div>
        </div>
    )
}
