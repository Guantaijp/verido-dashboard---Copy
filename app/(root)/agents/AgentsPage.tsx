import type { Metadata } from "next";
import { DashboardHeader } from "@/components/facilitator-dashboad/header";
import ProduceHeader from "@/components/produce/produce-header";
import AgentsHeader from "@/components/agents/agents-header";
import AgentsPerformance from "@/components/agents/agents-performance";


export const metadata: Metadata = {
    title: "Agents - Verido",
    description: "Manage your agents in Verido",
};

export default function AgentsPage() {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-8xl mx-auto">
                <DashboardHeader />
                <AgentsHeader/>
                <AgentsPerformance/>

            </div>
        </div>
    );
}
