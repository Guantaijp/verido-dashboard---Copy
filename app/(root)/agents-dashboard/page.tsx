import React from "react";
import type { Metadata } from "next";
import AgentsDashboard from "@/app/(root)/agents-dashboard/AgentsDashboard";

export const metadata: Metadata = {
    title: "agentsdashboard - Verido",
    description: "Manage your home in Verido",
};

const AgentsDashboardComponent = () => {
    return <AgentsDashboard/>;
};

export default AgentsDashboardComponent;
