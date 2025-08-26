import React from "react";
import type { Metadata } from "next";
import HomePage from "./HomePage";
import FacilitatorDashboard from "./HomePage";
export const metadata: Metadata = {
    title: "home - Verido",
    description: "Manage your home in Verido",
};

const HomeComponent = () => {
    return <FacilitatorDashboard/>;
};

export default HomeComponent;
