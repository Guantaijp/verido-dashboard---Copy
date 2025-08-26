import React from "react";
import DistributorsPage from "./DistributorsPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Distributors - Verido",
  description: "Manage Distributors in Verido",
};

const page = () => {
  return <DistributorsPage />;
};

export default page