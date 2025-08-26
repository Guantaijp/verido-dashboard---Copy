"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthenticatedUser } from "../../context/AuthContext";
import SidebarSkeleton from "./SidebarSkeleton";
import LogoutModal from "../auth/LogoutModal";
import useAuth from "@/lib/react-query/mutations/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight,ChevronUp } from "lucide-react";
import { sidebarItems } from "@/constant";

const SidebarItem = ({ item, isActive }: any) => {
  const { currentUser } = useAuthenticatedUser();
  const isBranchView =
    currentUser?.role === "distributor" ||
    currentUser?.role === "multi_branch_business";
  const label = item.isBranch && isBranchView ? "Branches" : item.label;
  const path = item.isBranch && isBranchView ? "/branches" : item.path;

  return (
    <Link href={path}>
      <div className={`flex items-center relative px-6 py-3 ${isActive(path)}`}>
        <Image src={item.icon} width={25} height={25} alt={label} />
        <span className={`mx-3 font-light font-sm text-sm ${isActive(path)}`}>
          {label}
        </span>
        {isActive(path).includes("bg-active-green") && (
          <div className="absolute w-[2px] h-[70%] bg-verido-green right-0 mr-1"></div>
        )}
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { currentUser, isLoading, hasPermission } = useAuthenticatedUser();
  const pathName = usePathname();
  const { logoutMutation } = useAuth();
  const isLoggingOut = logoutMutation.isPending;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const isBranchView =
    currentUser?.role === "distributor" ||
    currentUser?.role === "multi_branch_business";

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathName === href
        ? "bg-active-green rounded-lg text-verido-green"
        : "text-gray-text";
    }
    return pathName.startsWith(href)
      ? "bg-active-green rounded-lg text-verido-green"
      : "text-gray-text";
  };

  const isAnyChildActive = (children: any[]) => {
    return children.some((child) => pathName.startsWith(child.path));
  };

  const visibleItems = useMemo(() => {
    return sidebarItems.filter((item) =>
      item.permissions.some((perm) => hasPermission(perm))
    );
  }, [hasPermission]);

  return (
    <div className="bg-white border-r-[1px] border-r-[#C2C8C0] overflow-y-auto hidden h-full lg:flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="p-6   bg-[#0B2515] text-white p-6 rounded-tr-[40px]">
          <Image
            src="/assets/icons/verido-logo.svg"
            alt="Verido Logo"
            width={130}
            height={50}
          />
        </div>
        {/*<p className="p-6 text-gray-text text-[12px] font-[500]">MAIN</p>*/}
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          <nav className="flex flex-col gap-1 mt-3 px-2">
            {visibleItems.map((item) => {
              if (item.isCollapsible && item.children) {
                const visibleChildren = item.children.filter((child) =>
                  child.permissions.some((perm) => hasPermission(perm))
                );

                if (visibleChildren.length === 0) return null;

                const hasActiveChild = isAnyChildActive(visibleChildren);

                return (
                  <Collapsible
                    key={item.label}
                    open={expandedItems[item.label]}
                    onOpenChange={() => toggleItem(item.label)}
                  >
                    <CollapsibleTrigger
                      className={`flex items-center justify-between w-full px-6 py-3 cursor-pointer  rounded-lg ${
                        hasActiveChild
                          ? "bg-active-green text-verido-green"
                          : "text-gray-text"
                      }`}
                    >
                      <div className="flex items-center">
                        <Image
                          src={item.icon}
                          width={25}
                          height={25}
                          alt={item.label}
                        />
                        <span className="mx-3 font-light font-sm text-sm">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        width={20}
                        height={20}
                        className={`ml-auto transition-transform ${
                          expandedItems[item.label] ? "rotate-90" : ""
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-3 py-4 bg-verido-white rounded-2xl mt-3">
                      {visibleChildren.map((child) => {
                        const childLabel =
                          child.isBranch && isBranchView
                            ? "Branches"
                            : child.label;
                        return (
                          <SidebarItem
                            key={child.path}
                            item={{ ...child, label: childLabel }}
                            isActive={isActive}
                          />
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              } else {
                return (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    isActive={isActive}
                  />
                );
              }
            })}
          </nav>
        )}
      </div>

      <div className={`flex flex-col p-5 gap-3`}>
        <Link
          href="/settings"
          className={`flex gap-3 px-1 py-3 font-light font-sm text-sm cursor-pointer relative ${isActive(
            "/settings"
          )}`}
        >
          <div className="flex gap-3 font-light font-sm text-sm cursor-pointer">
            <Image
              src="/assets/icons/settings.svg"
              width={20}
              height={20}
              alt="Settings"
            />
            Settings
          </div>
          {pathName === "/settings" && (
            <div className="absolute w-[2px] h-[70%] bg-verido-green right-0 top-2 mr-1"></div>
          )}
        </Link>
        {/*<div className="flex gap-3 font-light font-sm text-sm cursor-pointer">*/}
        {/*  <Image*/}
        {/*    src="/assets/icons/logout.svg"*/}
        {/*    width={20}*/}
        {/*    height={20}*/}
        {/*    alt="Logout"*/}
        {/*  />*/}
        {/*  <LogoutModal isLoggingOut={isLoggingOut} logout={handleLogout} />*/}
        {/*</div>*/}
      </div>
      <div className="p-4 border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-[#FAF9F6] hover:bg-gray-50 transition-colors cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Joanna Doe Rhye</p>
            <p className="text-xs text-gray-500 truncate">joanna@cj.com</p>
          </div>
          <ChevronUp className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
