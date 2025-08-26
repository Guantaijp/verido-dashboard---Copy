import React from "react";
import type { Metadata } from "next";
import ConsultantsPage from "./ConsultantPage";

export const metadata: Metadata = {
  title: "Consultants - Verido",
  description: "Manage your consultants in Verido",
};

const Consultants = () => {
  return (
    <>
      <ConsultantsPage />
    </>
  );
};

export default Consultants;
