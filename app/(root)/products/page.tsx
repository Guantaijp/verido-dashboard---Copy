import React from "react";
import ProductPage from "./ProductPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products - Verido",
  description: "Manage your Products in Verido",
};

const page = () => {
  return <ProductPage />;
};

export default page;
