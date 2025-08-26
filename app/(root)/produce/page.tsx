import React from "react";
import type { Metadata } from "next";

import ProducePage from "@/app/(root)/produce/ProducePage";
export const metadata: Metadata = {
    title: "produce - Verido",
    description: "Manage your produce in Verido",
};

const ProduceComponent = () => {
    return <ProducePage />;
};

export default ProduceComponent;
