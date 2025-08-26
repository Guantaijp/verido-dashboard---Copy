"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useCurrentUser } from "../../lib/react-query/query/useUser";
import useAuth from "../../lib/react-query/mutations/useAuth";
import { useAuthenticatedUser } from "../../context/AuthContext";
import { Permission } from "@/types";
import Notification from "./Notification";
import { sidebarItems } from "@/constant";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";

interface NavItem {
  path?: string;
  label: string;
  icon: string;
  isCollapsible?: boolean;
  isBranch?: boolean;
  children?: {
    path: string;
    label: string;
    icon: string;
    permissions: Permission[];
    isBranch?: boolean;
  }[];
  permissions: Permission[];
}

type NavItemChild = NonNullable<NavItem["children"]>[number];

const MobileNavItem = ({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: (path: string) => string;
}) => {
  const { currentUser } = useAuthenticatedUser();
  const isBranchView =
    currentUser?.role === "distributor" ||
    currentUser?.role === "multi_branch_business";
  const label = item.isBranch && isBranchView ? "Branches" : item.label;
  const path = item.isBranch && isBranchView ? "/branches" : item.path || "";

  return (
    <SheetClose asChild>
      <Link href={path}>
        <div
          className={`flex items-center relative px-6 py-3 ${isActive(path)}`}
        >
          <Image src={item.icon} width={25} height={25} alt={label} />
          <span className={`mx-3 font-light font-sm text-sm ${isActive(path)}`}>
            {label}
          </span>
          {isActive(path).includes("bg-active-green") && (
            <div className="absolute w-[2px] h-[70%] bg-verido-green right-0 mr-1"></div>
          )}
        </div>
      </Link>
    </SheetClose>
  );
};

const MobileNav = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: currentUser } = useCurrentUser();
  const { currentUser: authenticatedUser, hasPermission } =
    useAuthenticatedUser();
  const { logoutMutation } = useAuth();
  const islogginOut = logoutMutation.isPending;
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
    return sidebarItems.filter((item: NavItem) =>
      item.permissions.some((perm: Permission) => hasPermission(perm))
    );
  }, [hasPermission]);

  return (
    <header className="bg-white rounded-lg flex lg:hidden items-center justify-between p-3">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={25}
            height={25}
          />
        </SheetTrigger>
        <SheetContent className="overflow-y-auto" side={"left"}>
          <div className="p-6">
            <Image
              src="/assets/icons/verido_logo.svg"
              alt="Verido Logo"
              width={130}
              height={50}
            />
          </div>
          <p className="p-6 text-gray-text text-[12px] font-[500]">MAIN</p>
          <div className="flex flex-col mt-2 justify-between gap-2">
            {visibleItems.map((item) => {
              if (item.isCollapsible && item.children) {
                const visibleChildren =
                  item.children?.filter((child: NavItemChild) =>
                    child.permissions.some((perm: Permission) =>
                      hasPermission(perm)
                    )
                  ) || [];

                if (visibleChildren.length === 0) return null;

                const hasActiveChild = isAnyChildActive(visibleChildren);

                return (
                  <Collapsible
                    key={item.label}
                    open={expandedItems[item.label]}
                    onOpenChange={() => toggleItem(item.label)}
                  >
                    <CollapsibleTrigger
                      className={`flex items-center justify-between w-full px-6 py-3 cursor-pointer rounded-lg ${
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
                      {visibleChildren.map((child: NavItemChild) => {
                        const childLabel =
                          child.isBranch && isBranchView
                            ? "Branches"
                            : child.label;
                        return (
                          <MobileNavItem
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
                  <>
                    <MobileNavItem
                      key={item.path}
                      item={item}
                      isActive={isActive}
                    />
                  </>
                );
              }
            })}

            <div className={`flex flex-col pt-4 px-6 gap-3`}>
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
              <Button onClick={handleLogout} className="w-full bg-verido-green">
                {islogginOut ? <LoadingSpinner /> : "Logout"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Image
        src="/assets/icons/verido_logo.svg"
        width={80}
        height={80}
        alt="search"
        className="object-contain -ml-10"
      />

      <div className="flex justify-center items-center gap-8">
        <Notification />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Image
          src={currentUser?.photoUrl || "/assets/icons/Avatar.svg"}
          width={100}
          height={100}
          alt="user avatar"
          className="rounded-full object-cover w-10 h-10"
        />

        <p>{authenticatedUser?.name || authenticatedUser?.username}</p>
      </div>
    </header>
  );
};

export default MobileNav;
