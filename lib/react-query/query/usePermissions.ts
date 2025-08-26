import { useQuery } from "@tanstack/react-query";
import {
  getUserPermissionMetrics,
  getAllPermissions,
  getPermissionByRole,
  getSpecifiedUserPermission
} from "@/lib/api/permission.api";

export const useUserPermissionMetrics = () => {
  return useQuery({
    queryKey: ["user-permission-metrics"],
    queryFn: async () => {
      const response = await getUserPermissionMetrics();
      return response;
    },
  });
};

export const useAllPermissions = () => {
  return useQuery({
    queryKey: ["all-permissions"],
    queryFn: async () => {
      const response = await getAllPermissions();
      return response;
    },
  });
};

export const usePermissionByRole = (role: string) => {
  return useQuery({
    queryKey: ["permission-by-role", role],
    queryFn: async () => {
      const response = await getPermissionByRole(role);
      return response;
    },
    enabled: !!role,
  });

};

export const useGetSpecifiedUserPermission = (userId: string) => {
  return useQuery({
    queryKey: ["specified-user-permission", userId],
    queryFn: async () => {
      const response = await getSpecifiedUserPermission(userId);
      return response;
    },
    enabled: !!userId,
  });
};
