"use client";
import React from "react";
import Image from "next/image";
import ProfileSettings from "@/components/settings/ProfileSettings";
import GeneralSettings from "@/components/settings/GeneralSettings";
import PermissionsSettings from "@/components/settings/PermissionsSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import NotificationsSettings from "@/components/settings/NotificationsSettings";
import Cookies from "js-cookie";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { Permission } from "@/types";

const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] =
    React.useState<string>("Profile");
  const { hasPermission } = useAuthenticatedUser();
  const userRole = Cookies.get("user_role") ?? "";
  const settingItems = [
    {
      name: "Profile",
      icon: "/assets/icons/user-circle.svg",
      permissions: ["admin.getCurrent"] as Permission[],
    },
    // {
    //   name: "General",
    //   icon: "/assets/icons/user-circle.svg",
    //   permissions: ["admin.getCurrent"] as Permission[],
    // },
    {
      name: "Notifications",
      icon: "/assets/icons/notification.svg",
      permissions: ["admin.getCurrent"] as Permission[],
    },
    {
      name: "Permissions",
      icon: "/assets/icons/userSettings.svg",
      permissions: ["admin.updatePermission"] as Permission[],
    },
    // {
    //   name: "Security",
    //   icon: "/assets/icons/security-lock.svg",
    //   permissions: ["admin.getCurrent"] as Permission[],
    // },
  ];

  return (
    <section className="flex overflow-hidden flex-col md:flex-row gap-4 min-h-screen">
      <div className="w-full md:w-[20%] border-b-[1px] md:border-r-[1px] border-button-disabled p-3">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex overflow-x-auto  flex-row md:flex-col gap-4 mt-5">
          {settingItems
            .filter((item) =>
              item.permissions.some((perm) => hasPermission(perm))
            )
            .map((item, index) => (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => setSelectedSetting(item.name)}
              >
                <div
                  className={`flex gap-2 items-center p-2 rounded-md ${
                    selectedSetting === item.name && "bg-gray-table"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                  <span className="text-gray-text-3 text-sm">{item.name}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full md:w-4/5">
        {selectedSetting === "Profile" && <ProfileSettings />}
        {selectedSetting === "General" && <GeneralSettings />}
        {selectedSetting === "Notifications" && <NotificationsSettings />}
        {selectedSetting === "Permissions" && <PermissionsSettings />}
        {selectedSetting === "Security" && <SecuritySettings />}
      </div>
    </section>
  );
};

export default SettingsPage;
