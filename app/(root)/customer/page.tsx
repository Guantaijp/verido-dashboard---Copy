import React from "react";
import type { Metadata } from "next";
import CustomerPage from "@/app/(root)/customer/CustomerPage";
export const metadata: Metadata = {
    title: "customer.tsx - Verido",
    description: "Manage your sales in Verido",
};

const CustomerComponent = () => {
    return <CustomerPage/>;
};

export default CustomerComponent;
