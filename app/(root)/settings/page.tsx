import React from "react";
import type { Metadata } from "next";
import SettingsPage from "./SettingsPage";
export const metadata: Metadata = {
  title: "Settings - Verido",
  description: "Manage your metrics in Verido",
};

const SettingsComponent = () => {
  return <SettingsPage />;
};

export default SettingsComponent;
