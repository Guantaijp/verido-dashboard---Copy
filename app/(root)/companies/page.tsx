import React from "react";
import type { Metadata } from "next";
import CompanyPage from "./CompanyPage";
export const metadata: Metadata = {
  title: "company - Verido",
  description: "Manage your Company in Verido",
};

const CompanyComponent = () => {
  return <CompanyPage />;
};

export default CompanyComponent;
