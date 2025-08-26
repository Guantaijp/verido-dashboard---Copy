// contexts/AuthenticatedUserContext.tsx
"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "../lib/react-query/query/useUser";
import { CurrentUserProfile, Permission } from "@/types";

interface AuthenticatedUserContextType {
  currentUser: CurrentUserProfile | null;
  isLoading: boolean;
  isError: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasPermissions: (permissions: Permission[], requireAll?: boolean) => boolean;
}

const AuthenticatedUserContext = createContext<
  AuthenticatedUserContextType | undefined
>(undefined);

export function AuthenticatedUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data, isLoading, isError } = useCurrentUser();
  const currentUser: CurrentUserProfile | null = data ?? null;

  const hasPermission = (permission: Permission): boolean => {
    return currentUser?.permissions.includes(permission) ?? false;
  };

  const hasPermissions = (
    requiredPermissions: Permission[],
    requireAll: boolean = true
  ): boolean => {
    if (!currentUser?.permissions) return false;
    if (requireAll) {
      return requiredPermissions.every((perm) =>
        currentUser.permissions.includes(perm)
      );
    }
    return requiredPermissions.some((perm) =>
      currentUser.permissions.includes(perm)
    );
  };

  return (
    <AuthenticatedUserContext.Provider
      value={{ currentUser, isLoading, isError, hasPermission, hasPermissions }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

export function useAuthenticatedUser() {
  const context = useContext(AuthenticatedUserContext);
  if (context === undefined) {
    throw new Error(
      "useAuthenticatedUser must be used within an AuthenticatedUserProvider"
    );
  }
  return context;
}
