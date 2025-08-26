import React from "react";
import type { Metadata } from "next";
import HomePage from "./HomePage";
import FacilitatorDashboard from "./HomePage";
import CompanyPage from "@/app/(root)/company/CompanyPage";
export const metadata: Metadata = {
    title: "company - Verido",
    description: "Manage your home in Verido",
};

const CompanyComponent = () => {
    return <CompanyPage />;
};

export default CompanyComponent;
