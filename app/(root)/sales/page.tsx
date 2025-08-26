import React from "react";
import type { Metadata } from "next";
import SalesPage from "@/app/(root)/sales/SalesPage";
export const metadata: Metadata = {
    title: "sales - Verido",
    description: "Manage your sales in Verido",
};

const SalesComponent = () => {
    return <SalesPage/>;
};

export default SalesComponent;
