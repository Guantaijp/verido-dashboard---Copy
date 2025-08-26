import React from "react";
import type { Metadata } from "next";
import CompaniesPage from "@/components/companies/companies";
export const metadata: Metadata = {
    title: "Company - Verido",
    description: "Manage your companies in Verido",
};

const CompanyPage = () => {
    return <CompaniesPage/>;
};

export default CompanyPage;
