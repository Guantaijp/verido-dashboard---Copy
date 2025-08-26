import React from "react";
import type { Metadata } from "next";
import AgentsPage from "@/app/(root)/agents/AgentsPage";
export const metadata: Metadata = {
    title: "sales - Verido",
    description: "Manage your sales in Verido",
};

const AgentsComponent = () => {
    return <AgentsPage/>;
};

export default AgentsComponent;
