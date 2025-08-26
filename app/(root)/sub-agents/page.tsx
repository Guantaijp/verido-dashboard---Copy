import React from "react";
import BusinessOwnersPage from "./BusinessOwnersPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business - Verido",
  description: "Manage your businesses in Verido",
};

const BusinessOwners = () => {
  return <BusinessOwnersPage />;
};

export default BusinessOwners;
