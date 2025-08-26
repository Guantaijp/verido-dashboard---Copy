import React from "react";
import type { Metadata } from "next";
import PartnersPage from "./PartnersPage";
export const metadata: Metadata = {
  title: "Partners - Verido",
  description: "Manage your consultants in Verido",
};

const PartnersComponent = () => {
  return <PartnersPage />;
};

export default PartnersComponent;
