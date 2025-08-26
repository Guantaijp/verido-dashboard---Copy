import React from "react";
import type { Metadata } from "next";
import CountryAdminPage from "./CountryAdminPage";
export const metadata: Metadata = {
  title: "company - Verido",
  description: "Manage Country admins in Verido",
};

const CompanyComponent = () => {
  return <CountryAdminPage />;
};

export default CompanyComponent;
