import React from "react";
import type { Metadata } from "next";
import BranchesPage from "./BranchesPage";

export const metadata: Metadata = {
  title: "Branches - Verido",
  description: "Manage your branches in Verido",
};

const BranchesComponent = () => {
  return <BranchesPage />;
};

export default BranchesComponent;
