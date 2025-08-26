import React from "react";
import BusinessPage from "./BusinessPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business Owners - Verido",
  description: "Manage Business Owners in Verido",
};

const page = () => {
  return <BusinessPage />;
};

export default page;