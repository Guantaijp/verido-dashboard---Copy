import React from "react";
import MultibranchesPage from "./MultibranchesPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Multi Branches - Verido",
  description: "Manage Multi Branches in Verido",
};

const page = () => {
  return <MultibranchesPage />;
};

export default page