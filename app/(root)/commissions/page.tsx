import React from "react";
import type { Metadata } from "next";;
import CommissionsPage from "@/app/(root)/commissions/CommissionsPage";
export const metadata: Metadata = {
    title: "sales and commissions - Verido",
    description: "Manage your Sales and Commissions in Verido",
};

const CommissionsComponent = () => {
    return <CommissionsPage />;
};

export default CommissionsComponent;
