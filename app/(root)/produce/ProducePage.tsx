import type { Metadata } from "next";
import { DashboardHeader } from "@/components/facilitator-dashboad/header";
import ProduceHeader from "@/components/produce/produce-header";
import AvailableQuantity from "@/components/produce/available-quantity";
import ProduceTransactions from "@/components/produce/produce-transactions";

export const metadata: Metadata = {
    title: "Produce - Verido",
    description: "Manage your produce in Verido",
};

export default function ProducePage() {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-8xl mx-auto">
                <DashboardHeader />
                <ProduceHeader/>

                {/*/!* Client-side component with state *!/*/}
                <AvailableQuantity />
                <ProduceTransactions/>
            </div>
        </div>
    );
}
