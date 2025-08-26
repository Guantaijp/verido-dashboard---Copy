import React from "react";
import type { Metadata } from "next";
import BusinessAnalyticsPage from "./BusinessAnalyticsPage";

export const metadata: Metadata = {
  title: "business analytics- Verido",
  description: "Manage your business analytics in Verido",
};

const CompanyComponent = () => {
  return <BusinessAnalyticsPage />;
};

export default CompanyComponent;
